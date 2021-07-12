import { Component, Input, OnDestroy, OnInit, ViewChild } from '@angular/core';

import { Contact } from './contact-list/contact.model';
import { ContactsService } from './contacts-service';
import { MatSidenav } from '@angular/material/sidenav';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-contacts',
  templateUrl: './contacts.component.html',
  styleUrls: ['./contacts.component.scss'],
})
export class ContactsComponent implements OnInit, OnDestroy {
  @Input()
  contacts: Contact[] = [];
  changedContacts$!: Subscription;
  loaded: boolean = false;
  @Input()
  selectedContact?: Contact;
  @ViewChild('sidenav', { static: false }) sideNav!: MatSidenav;
  constructor(private contactsService: ContactsService) {}

  addNewContact() {
    this.contactsService.addContact();
  }
  deleteContact(contact: Contact) {
    this.contactsService.deleteContact(contact.id!);
  }
  getContacts() {
    this.contactsService.getContacts().subscribe((contacts) => {
      this.contacts = contacts;
      this.loaded = true;
    });
  }

  ngOnInit(): void {
    this.getContacts();
    this.changedContacts$ = this.contactsService.contactsChanged$.subscribe(
      () => this.getContacts()
    );
    this.selectedContact$.subscribe((data) => (this.selectedContact = data));
  }
  ngOnDestroy() {
    this.changedContacts$.unsubscribe();
    this.selectedContact$.unsubscribe();
  }
  get selectedContact$() {
    return this.contactsService.contactDetail$;
  }
}
