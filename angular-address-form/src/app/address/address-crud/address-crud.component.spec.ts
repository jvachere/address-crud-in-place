import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Address } from '../address';

import { AddressCrudComponent } from './address-crud.component';

describe('AddressCrudComponent', () => {
  let component: AddressCrudComponent;
  let fixture: ComponentFixture<AddressCrudComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AddressCrudComponent],
      imports: [
        HttpClientTestingModule,
        FormsModule,
        ReactiveFormsModule
      ]
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AddressCrudComponent);
    component = fixture.componentInstance;
    component.address = new Address();
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
