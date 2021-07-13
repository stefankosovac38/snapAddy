import { Component, Input, OnDestroy, OnInit, ViewChild } from '@angular/core';

import { Contact } from './contact-list/contact.model';
import { ContactsService } from './contacts-service';
import { ExportService } from '../helpers.ts/export-service';
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
  selectedContact?: Contact;
  selectedContacts: Contact[] = [];
  constructor(
    private contactsService: ContactsService,
    private exportService: ExportService
  ) {}
  get selectedContact$() {
    return this.contactsService.contactDetail$;
  }

  addNewContact() {
    this.contactsService.addContact();
  }
  deleteContact() {
    console.log('this.selectedContacts', this.selectedContacts);
    this.selectedContacts.length > 0
      ? this.contactsService.deleteMultipleContacts(this.selectedContacts)
      : this.contactsService.deleteContact(this.selectedContact!.id!);
  }
  getContacts() {
    this.contactsService.getContacts().subscribe((contacts) => {
      this.contacts = contacts;
      this.loaded = true;
    });
  }
  getSelectedContacts(contacts: Contact[]) {
    this.selectedContacts = contacts;
  }
  exportContact() {
    this.selectedContacts.length > 0
      ? this.exportService.exportMultipleContacts(this.selectedContacts)
      : this.exportService.exportAsExcelFile(
          [this.selectedContact!],
          'snapAddy'
        );
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
}
