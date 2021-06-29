import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ComponentFixture, fakeAsync, TestBed, tick } from '@angular/core/testing';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { By } from '@angular/platform-browser';
import { of } from 'rxjs';
import { Address } from '../address';
import { AddressService } from '../address.service';
import { AddressCrudComponent } from './address-crud.component';

describe('AddressCrudComponent', () => {
  let component: AddressCrudComponent;
  let fixture: ComponentFixture<AddressCrudComponent>;
  let addressService: AddressService;
  const fakeAddress: Address = {
    name: 'testname',
    street: 'teststreet',
    unitNumber: 'a',
    city: 'a',
    stateProvince: 'a',
    postalCode: 'a',
    country: 'a',
    id: 'a'
  };
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AddressCrudComponent],
      imports: [
        HttpClientTestingModule,
        FormsModule,
        ReactiveFormsModule
      ],
      providers: [
        AddressService
      ]
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AddressCrudComponent);
    component = fixture.componentInstance;
    component.address = new Address();
    fixture.detectChanges();
    addressService = TestBed.inject(AddressService);
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should have invalid form when blank', () => {
    expect(component.addressForm.valid).toBeFalsy();
  });

  it('should set form values on init with existing address', () => {
    component.address = fakeAddress;
    component.ngOnInit();
    expect(component.addressForm.get('name').value).toBe('testname');
    expect(component.addressForm.valid).toBeTruthy();
  });

  it('should be in edit mode if ID isnt set on init', () => {
    component.ngOnInit();
    expect(component.isEditing).toBeTrue();
  });

  it('should emit create complete event when closed with no id', () => {
    const cancelButton = getButton('Cancel');
    const subscriptionSpy = spyOn(component.createCompleteEvent, 'next');
    cancelButton.nativeElement.click();
    expect(subscriptionSpy).toHaveBeenCalled();
  });

  it('should reset form on cancel when address ID is set', () => {
    component.address.name = 'testName2';
    component.address.id = '1';
    component.ngOnInit();
    component.addressForm.get('name').setValue('fakeName');
    const cancelButton = getButton('Cancel');
    const subscriptionSpy = spyOn(component.createCompleteEvent, 'next');
    cancelButton.nativeElement.click();
    expect(subscriptionSpy).toHaveBeenCalledTimes(0);
    expect(component.addressForm.get('name').value).toBe('testName2');
  });

  it('should create new address on submit with no id', () => {

    component.setFormValues(fakeAddress);
    component.address.id = null;
    const createAddressSpy = spyOn(addressService, 'createAddress').and.callFake((address) => {
      address.id = 'b';
      addressService.addresses.unshift(address);
      return of(address);
    });
    const subscriptionSpy = spyOn(component.createCompleteEvent, 'next');
    component.addressForm.markAsDirty();
    component.addressForm.markAsTouched();
    fixture.detectChanges();
    const saveButton = getButton('Save');
    saveButton.nativeElement.click();
    expect(component.address.id).toBe('b');
    expect(subscriptionSpy).toHaveBeenCalled();
    expect(component.isEditing).toBeFalse();
    expect(addressService.addresses.length).toBe(3);
  });

  it('should update address on submit with id', () => {
    component.address = fakeAddress;
    component.ngOnInit();
    component.addressForm.get('name').setValue('updatedName');
    const createAddressSpy = spyOn(addressService, 'updateAddress').and.callFake((address) => {
      const index = addressService.addresses.findIndex(x => x.id === address.id);
      if (index !== -1) {
        addressService.addresses.splice(index, 1, address);
      }
      return of(address);
    });
    component.addressForm.markAsDirty();
    component.addressForm.markAsTouched();
    fixture.detectChanges();
    const saveButton = getButton('Save');
    saveButton.nativeElement.click();

    expect(component.address.id).toBe(fakeAddress.id);
    expect(component.isEditing).toBeFalse();
    expect(component.address.name).toBe('updatedName');
  });

  it('should toggle editing when edit is clicked', () => {
    component.address = fakeAddress;
    component.isEditing = false;
    component.ngOnInit();
    fixture.detectChanges();
    const editButton = getButton('Edit');
    editButton.nativeElement.click();
    expect(component.isEditing).toBeTrue();
  });

  it('should delete editing when delete is clicked', () => {
    component.address = fakeAddress;
    component.isEditing = false;
    component.ngOnInit();
    fixture.detectChanges();
    const subscriptionSpy = spyOn(component.deleteEvent, 'next');
    const deleteServiceSpy = spyOn(addressService, 'deleteAddress').and.returnValue(of({}));

    const deleteButton = getButton('Delete');
    deleteButton.nativeElement.click();

    expect(subscriptionSpy).toHaveBeenCalled();
    expect(deleteServiceSpy).toHaveBeenCalled();
  });

  const getButton = (name) => {
    return fixture.debugElement.queryAll(By.css('button')).filter(x => x.nativeElement.textContent.trim() === name)[0];
  };
});
