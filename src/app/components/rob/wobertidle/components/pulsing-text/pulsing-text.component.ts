import { Component, OnChanges, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-pulsing-text',
  templateUrl: './pulsing-text.component.html',
  styleUrls: ['./pulsing-text.component.scss']
})
export class PulsingTextComponent implements OnInit, OnChanges {
  @Input() text: string;

  constructor() { }

  pulsingText = {
    pulsing: false
  };

  ngOnInit() {
    this.pulsingText.pulsing = false;
  }

  ngOnChanges(changes) {
    this.pulsingText.pulsing = true;
  }

}
