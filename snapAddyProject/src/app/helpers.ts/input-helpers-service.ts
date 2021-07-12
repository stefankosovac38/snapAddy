import { Injectable, Input } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class InputHelpersService {
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
}
