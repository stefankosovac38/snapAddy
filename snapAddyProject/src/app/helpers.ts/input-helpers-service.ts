import { Injectable, Input } from '@angular/core';

export interface Label {
  [key: string]: any;
  gender: 'Salutation';
}
@Injectable({ providedIn: 'root' })
export class InputHelpersService {
  labels: Label = { gender: 'Salutation' };
  calculateType(value: any) {
    if (isNaN(value) && this.isDate(value)) {
      return 'date';
    }
    if (Number.isInteger(value)) {
      return 'number';
    }
    return 'text';
  }
  capitalize(word: string): string {
    return word.charAt(0).toUpperCase() + word.slice(1);
  }
  isDate(value: string) {
    const date = Date.parse(value);
    return !isNaN(date);
  }
  getLabels(value: string) {
    return this.labels[value];
  }
}
