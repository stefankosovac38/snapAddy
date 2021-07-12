import {
  Component,
  ElementRef,
  EventEmitter,
  Input,
  OnInit,
  Output,
  ViewChild,
} from '@angular/core';

import { InputHelpersService } from './../../helpers.ts/input-helpers-service';
import { MatSelect } from '@angular/material/select';

@Component({
  selector: 'app-input',
  templateUrl: './input.component.html',
  styleUrls: ['./input.component.scss'],
})
export class InputComponent implements OnInit {
  @Input()
  type: 'text' | 'number' | 'date' = 'text';
  @Input()
  optionValues = [
    { id: 0, name: '', value: -1 },
    { id: 1, name: 'Mr', value: 0 },
    { id: 2, name: 'Mrs', value: 1 },
  ];

  @Input()
  name!: string;
  @Input()
  label?: string;
  @Input()
  value!: any;
  @Output()
  valueChanged: EventEmitter<any> = new EventEmitter();
  @ViewChild('input', { static: false }) input!: ElementRef;
  @ViewChild('select', { static: false }) select!: MatSelect;
  constructor(private inputHelpersService: InputHelpersService) {}

  get inputLabel() {
    const { label, name, inputHelpersService } = this;
    return label ? label : inputHelpersService.capitalize(name);
  }
  onFocusOut() {
    const { value, name, input } = this;
    input.nativeElement.value !== value
      ? this.valueChanged.emit({
          name: name,
          value: input.nativeElement.value,
        })
      : '';
  }
  onSelectFocusOut(value: any) {
    this.valueChanged.emit({
      name: this.name,
      value: value,
    });
  }

  ngOnInit(): void {}
}
