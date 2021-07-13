import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Subject, throwError } from 'rxjs';
import {
  catchError,
  debounceTime,
  distinctUntilChanged,
  map,
} from 'rxjs/operators';

import { Contact } from './contact-list/contact.model';
import { Injectable } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class ContactsService {
  private token: string = 'wAunqVeyG3rvjZU612zZHVaKHnOplIlZuzm9ycKV';
  private defaultContact: Contact = {
    attachments: [],
    id: undefined,
    firstName: undefined,
    lastName: undefined,
    organization: undefined,
    bcChecked: false,
    bcImage: undefined,
    bcImageBackside: undefined,
    bcImageBacksideLocal: undefined,
    bcImageLocal: undefined,
    email: undefined,
    phone: undefined,
    image: undefined,
    note: undefined,
    gender: -1,
    title: undefined,
    position: undefined,
    mobile: undefined,
    fax: undefined,
    website: undefined,
    vat: undefined,
    street: undefined,
    street2: undefined,
    city: undefined,
    zip: undefined,
    poBox: undefined,
    state: undefined,
    country: undefined,
    xing: undefined,
    linkedin: undefined,
    facebook: undefined,
    twitter: undefined,
    industry: undefined,
    revenue: undefined,
    companySize: undefined,
    contactListId: 'l4e5qAja01bDBR1r',
    customFields: {},
    drawing: undefined,
  };
  contactsChanged$ = new Subject<string>();
  contactDetail$ = new Subject<Contact>();
  constructor(private http: HttpClient) {}

  getContacts() {
    return this.http
      .get<{ [key: string]: Contact }>(
        'https://api.snapaddy.com/grabber/v1/contactlist/l4e5qAja01bDBR1r/contactitems',
        {
          headers: new HttpHeaders({
            'X-API-Token': this.token,
          }),
          responseType: 'json',
        }
      )
      .pipe(
        map((responseData) => {
          let i = 0;
          const contactsArray: Contact[] = [];
          for (const key in responseData) {
            if (
              responseData.hasOwnProperty(key) &&
              responseData[key] !== undefined
            ) {
              contactsArray.push(responseData[key]);
            }
          }
          return contactsArray;
        }),
        catchError((errorRes) => {
          return throwError(errorRes);
        })
      );
  }
  getContact(contactId: string) {
    this.http
      .get<Contact>(
        `https://api.snapaddy.com/grabber/v1/contactitem/${contactId}`,
        {
          headers: new HttpHeaders({
            'X-API-Token': this.token,
          }),
          responseType: 'json',
        }
      )
      .pipe(
        debounceTime(1000),
        distinctUntilChanged(),
        map((responseData) => responseData),
        catchError((errorRes) => {
          return throwError(errorRes);
        })
      )
      .subscribe((response) => {
        return this.contactDetail$.next(response);
      });
  }
  addContact() {
    this.http
      .post<Contact>(
        'https://api.snapaddy.com/grabber/v1/contactitem',
        this.defaultContact,
        {
          headers: new HttpHeaders({
            'X-API-Token': this.token,
          }),
          observe: 'response',
          responseType: 'json',
        }
      )
      .pipe(
        catchError((errorRes) => {
          return throwError(errorRes);
        })
      )
      .subscribe(() => this.contactsChanged$.next());
  }
  updateContact(contactId: string, payload: Contact) {
    this.http
      .put<Contact>(
        `https://api.snapaddy.com/grabber/v1/contactitem/${contactId}`,
        payload,
        {
          headers: new HttpHeaders({
            'X-API-Token': this.token,
          }),
          responseType: 'json',
        }
      )
      .pipe(
        map((responseData) => responseData),
        catchError((errorRes) => {
          return throwError(errorRes);
        })
      )
      .subscribe(() => this.contactsChanged$.next());
  }
  deleteContact(contactId: string) {
    this.http
      .delete<Contact>(
        `https://api.snapaddy.com/grabber/v1/contactitem/${contactId}`,
        {
          headers: new HttpHeaders({
            'X-API-Token': this.token,
          }),
          responseType: 'json',
        }
      )
      .pipe(
        map((responseData) => responseData),
        catchError((errorRes) => {
          return throwError(errorRes);
        })
      )
      .subscribe(() => this.contactsChanged$.next());
  }
  deleteMultipleContacts(contacts: Contact[]) {
    for (let contact of contacts) {
      this.deleteContact(contact.id!);
    }
  }
}
