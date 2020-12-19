import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { Address } from './address';
import { environment } from 'src/environments/environment';
//IMPORTANT: http requests are commented out.
@Injectable({
  providedIn: 'root'
})
export class AddressService {

  constructor(private httpClient: HttpClient) {

  }
  addresses: Address[] = [
    {
      id: 'adfsdf',
      name: 'Jacob Vacheresse',
      street: 'test streeet',
      unitNumber: '1231',
      city: 'Detroit',
      stateProvince: 'MI',
      postalCode: '48124',
      country: 'US'
    } as Address,
    {
      id: 'erwewrvf',
      name: 'Jacob Vacheresse',
      street: 'test streeet',
      unitNumber: '1231',
      city: 'Detroit',
      stateProvince: 'MI',
      postalCode: '48124',
      country: 'US'
    } as Address
  ];

  getAddresses(): Observable<Address[]> {
    return this.httpClient.get(`${environment.apiEndpoint}/addresses`) as Observable<Address[]>;
    return of([...this.addresses]) as Observable<Address[]>;
  }

  createAddress(address: Address): Observable<Address> {
    return this.httpClient.post(`${environment.apiEndpoint}/addresses`, address) as Observable<Address>;
    address.id = Math.random().toString(36).substring(7);
    this.addresses.unshift(address);
    return of(address) as Observable<Address>;
  }

  updateAddress(address: Address): Observable<Address> {
    return this.httpClient.post(`${environment.apiEndpoint}/addresses`, address) as Observable<Address>;
    const index = this.addresses.findIndex(x => x.id === address.id);
    if (index !== -1) {
      this.addresses.splice(index, 1, address);
    }
    return of(address) as Observable<Address>;
  }

  deleteAddress(id: string): Observable<any> {
    return this.httpClient.delete(`${environment.apiEndpoint}/addresses/${id}`) as Observable<any>;
    const index = this.addresses.findIndex(x => x.id === id);
    if (index !== -1) {
      this.addresses.splice(index, 1);
    }
    return of({}) as Observable<any>;
  }
}
