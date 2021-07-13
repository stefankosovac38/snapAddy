import {
  Component,
  EventEmitter,
  Input,
  OnInit,
  Output,
  ViewChild,
} from '@angular/core';

import { Contact } from './contact.model';
import { MatSelectionList } from '@angular/material/list';

@Component({
  selector: 'app-contact-list',
  templateUrl: './contact-list.component.html',
  styleUrls: ['./contact-list.component.scss'],
})
export class ContactListComponent implements OnInit {
  @Input()
  items: Contact[] = [];
  @Output()
  selectedItems: EventEmitter<any[]> = new EventEmitter();
  @ViewChild('list', { static: true }) list!: MatSelectionList;
  constructor() {}

  onClick(event: any) {
    event.stopPropagation();
  }
  setSelectedItems() {
    let selectedItems = [];
    for (let option of this.list.selectedOptions.selected) {
      selectedItems.push(option.value);
    }

    this.selectedItems.emit(selectedItems);
  }

  ngOnInit(): void {
    this.list.selectionChange.subscribe(() => this.setSelectedItems());
  }
}
