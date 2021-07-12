import { Component, Input, OnDestroy, OnInit } from '@angular/core';

import { Contact } from '../contact-list/contact.model';
import { ContactsService } from '../contacts-service';
import { InputHelpersService } from './../../helpers.ts/input-helpers-service';

@Component({
  selector: 'app-contact-details',
  templateUrl: './contact-details.component.html',
  styleUrls: ['./contact-details.component.scss'],
})
export class ContactDetailsComponent implements OnInit, OnDestroy {
  @Input()
  contactDetails?: Contact;

  constructor(
    private contactsService: ContactsService,
    private inputHelpersService: InputHelpersService
  ) {}

  onValueChanged(event: any) {
    const name = event.name;
    const value = event.value;
    this.contactDetails![name] = value;
    this.contactsService.updateContact(
      this.contactDetails!.id!,
      this.contactDetails!
    );
  }
  get inputHelper() {
    return this.inputHelpersService;
  }
  get objectKeys() {
    return this.contactDetails !== undefined
      ? [
          'title',
          'firstName',
          'lastName',
          'organization',
          'position',
          'phone',
          'mobile',
          'fax',
          'email',
          'website',
          'street',
          'street2',
          'zip',
          'city',
          'country',
          'state',
          'vat',
          'industry',
          'companySize',
          'revenue',
          'xing',
          'linkedin',
          'note',
        ]
      : [];
  }

  ngOnInit(): void {
    this.contactsService.contactDetail$.subscribe(
      (data) => (this.contactDetails = data)
    );
  }
  ngOnDestroy(): void {
    this.contactsService.contactDetail$.unsubscribe();
  }
}
