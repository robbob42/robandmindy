import { Component, OnInit } from '@angular/core';
import { fade } from './animations';
import { AnimationEvent } from '@angular/animations';

@Component({
  selector: 'app-wobertidle',
  templateUrl: './wobertidle.component.html',
  styleUrls: ['./wobertidle.component.scss'],
  animations: [
    fade
  ]
})
export class WobertidleComponent implements OnInit {
  public animState = 'beginAnim';
  public rawActivities = [
    {
      name: 'Mining',
      active: false,
      color: '#555555',
      produces: 'Rocks',
      actionTime: '1000ms',
      decrements: null
    },
    {
      name: 'Chopping',
      active: false,
      color: '#425f0b',
      produces: 'Trees',
      actionTime: '2000ms',
      decrements: null
    },
    {
      name: 'Fishing',
      active: true,
      color: '#84b0f1',
      produces: 'Fish',
      actionTime: '5000ms',
      decrements: null
    }
  ];
  public inventory = [
    {
      item: 'Rocks',
      amount: 0
    },
    {
      item: 'Trees',
      amount: 0
    },
    {
      item: 'Fish',
      amount: 0
    },
    {
      item: 'Cakes',
      amount: 0
    },
    {
      item: 'Poops',
      amount: 0
    }
  ];

  constructor() { }

  ngOnInit() {
  }

  onAnimationEvent(event: AnimationEvent, activity) {
    let invenItem;
    this.inventory.forEach(inventoryItem => {
      if (inventoryItem.item === activity.produces) {
        invenItem = inventoryItem;
      }
    });
    if (event.toState === 'endAnim' && event.fromState === 'beginAnim') {
      invenItem.amount++;
    }

    let nextState: string;
    switch (event.toState) {
      case 'endAnim':
        nextState = 'beginAnim';
        break;
      case 'beginAnim':
        nextState = 'endAnim';
        break;
      case 'void':
        invenItem.amount--;
        nextState = 'beginAnim';
        break;
      default:
        break;
    }
    this.animState = nextState;
  }

  startActivity(startActivity) {
    this.rawActivities.forEach(activity => {
      if (activity.name === startActivity.name) {
        activity.active = true;
      } else {
        activity.active = false;
      }
    });
  }
  stopActivity(stopActivity) {
    this.rawActivities.forEach(activity => {
      if (activity.name === stopActivity.name) {
        activity.active = false;
      }
    });
  }}
