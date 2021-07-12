import { Component, Input, OnInit } from '@angular/core';

import { ContactsService } from '../contacts-service';

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.scss'],
})
export class ContactComponent implements OnInit {
  @Input()
  imageUrl?: string = undefined;
  @Input()
  id?: string = undefined;
  @Input()
  firstName?: string = undefined;
  @Input()
  lastName?: string = undefined;
  @Input()
  company?: string = undefined;

  constructor(private contactsService: ContactsService) {}

  onClick() {
    this.contactsService.getContact(this.id!);
  }

  ngOnInit(): void {}
}
