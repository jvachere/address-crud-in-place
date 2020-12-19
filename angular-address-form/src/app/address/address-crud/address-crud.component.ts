import { AddressService } from '../address.service';
import { BaseComponent } from 'src/app/base.component';
import { Component, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Subject } from 'rxjs';
import { Address } from '../address';

@Component({
  selector: 'app-address-crud',
  templateUrl: './address-crud.component.html',
  styleUrls: ['./address-crud.component.css']
})
export class AddressCrudComponent extends BaseComponent implements OnInit {
  @Input() address: Address;
  addressForm = this.fb.group({
    name: ['', Validators.required],
    street: ['', Validators.required],
    unitNumber: [''],
    city: ['', Validators.required],
    stateProvince: ['', Validators.required],
    postalCode: ['', Validators.required],
    country: ['', Validators.required]
  });
  @Output() createCompleteEvent = new Subject();
  @Output() deleteEvent = new Subject();
  isEditing = false;

  constructor(
    private fb: FormBuilder,
    private addressService: AddressService
  ) {
    super();
  }

  ngOnInit(): void {
    if (this.address.id) {
      this.setFormValues(this.address);
    }
    else {
      this.isEditing = true;
    }
  }

  cancel(): void {
    if (!this.address.id) {
      this.createCompleteEvent.next();
    }
    else {
      this.setFormValues(this.address);
      this.isEditing = false;
    }
  }

  createAddress(): void {
    this.baseSubscribe(this.addressService.createAddress(this.addressForm.value), (address) => {
      this.address = address;
      this.createCompleteEvent.next();
      this.isEditing = false;
    });
  }

  delete(): void {
    this.baseSubscribe(this.addressService.deleteAddress(this.address.id), () => this.deleteEvent.next());
  }

  setFormValues(address: Address): void {
    for (const key of Object.keys(address)) {
      this.addressForm.controls[key]?.setValue(address[key]);
    }
  }

  submit(): void {
    if (!this.address.id) {
      this.createAddress();
    }
    else {
      this.updateAddress();
    }
  }

  toggleEdit(): void {
    this.isEditing = !this.isEditing;

  }

  updateAddress(): void {
    let updatedAddress = this.addressForm.value;
    updatedAddress.id = this.address.id;
    this.baseSubscribe(this.addressService.updateAddress(this.addressForm.value), (address) => this.address = address);
    this.isEditing = false;
  }
}
