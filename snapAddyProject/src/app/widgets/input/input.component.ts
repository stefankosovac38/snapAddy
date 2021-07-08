import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-input.component',
  templateUrl: './input.component.html',
  styleUrls: ['./input.component.scss'],
})
export class InputComponent implements OnInit {
  @Input()
  type: 'input' | 'select' = 'input';
  @Input()
  options?: string[] = [];

  constructor() {}

  ngOnInit(): void {}
}
