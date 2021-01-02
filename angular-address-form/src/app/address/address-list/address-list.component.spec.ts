import { HttpClientTestingModule } from '@angular/common/http/testing';
import { DebugElement } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { of } from 'rxjs';
import { Address } from '../address';
import { AddressService } from '../address.service';

import { AddressListComponent } from './address-list.component';

describe('AddressListComponent', () => {
  let component: AddressListComponent;
  let fixture: ComponentFixture<AddressListComponent>;
  let addressService: AddressService;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AddressListComponent],
      imports: [
        HttpClientTestingModule
      ],
      providers: [
        AddressService
      ]
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AddressListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    addressService = TestBed.inject(AddressService);
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should query addresses on init', () => {
    const getAddressesSpy = spyOn(addressService, 'getAddresses').and.returnValue(of(addressService.addresses));
    component.ngOnInit();
    expect(getAddressesSpy).toHaveBeenCalledTimes(1);
    expect(component.addresses.length).toBe(addressService.addresses.length);
  });

  it('should add a new address to array on create click',() => {
    const createButton = fixture.debugElement.query(By.css('button'));
    expect(createButton.nativeElement.textContent).toContain('Create');
    createButton.nativeElement.click();
    expect(component.addresses[0]).toEqual(new Address());
  });

  it('should add a new address to array on create',() => {
    component.create();
    expect(component.addresses[0]).toEqual(new Address());
    expect(component.isCreating).toBeTrue();
  });

  it('should disable create button while creating', () => {
    component.isCreating = true;
    fixture.detectChanges();
    const createButton = fixture.debugElement.query(By.css('button'));
    expect(createButton.nativeElement.disabled).toBeTruthy();
  });

  it('should enable create button while not creating', () => {
    component.isCreating = false;
    fixture.detectChanges();
    const createButton = fixture.debugElement.query(By.css('button'));
    expect(createButton.nativeElement.disabled).toBeFalsy();
  });
});
