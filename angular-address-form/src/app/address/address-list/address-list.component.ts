import { AddressService } from './../address.service';
import { Component, OnInit } from '@angular/core';
import { Address } from '../address';
import { BaseComponent } from 'src/app/base.component';

@Component({
  selector: 'app-address-list',
  templateUrl: './address-list.component.html',
  styleUrls: ['./address-list.component.css']
})
export class AddressListComponent extends BaseComponent implements OnInit {
  addresses: Address[] = [];
  isCreating = false;
  constructor(private addressService: AddressService) {
    super();
  }

  ngOnInit(): void {
    this.loadAddresses();
  }

  loadAddresses(): void {
    this.baseSubscribe(this.addressService.getAddresses(), (addresses) => this.addresses = addresses);
  }

  create(): void {
    this.addresses.unshift(new Address());
    this.isCreating = true;
  }

  completeCreate(): void {
    this.loadAddresses();
    this.isCreating = false;
  }
}

