import { Component, Input, OnDestroy, OnInit } from '@angular/core';

import { Contact } from './contact-list/contact.model';
import { ContactsService } from './contactsService';
import { HttpClient } from '@angular/common/http';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-contacts',
  templateUrl: './contacts.component.html',
  styleUrls: ['./contacts.component.scss'],
})
export class ContactsComponent implements OnInit, OnDestroy {
  @Input()
  contacts: Contact[] = [];
  changedContacts!: Subscription;
  constructor(
    private http: HttpClient,
    private contactsService: ContactsService
  ) {}

  addNewContact() {
    this.contactsService.addContact();
  }
  getContacts() {
    this.contactsService
      .getContacts()
      .subscribe((contacts) => (this.contacts = contacts));
  }

  ngOnInit(): void {
    this.getContacts();
    this.changedContacts = this.contactsService.contactsChanged.subscribe(() =>
      this.getContacts()
    );
  }
  ngOnDestroy() {
    this.changedContacts.unsubscribe();
  }
}
