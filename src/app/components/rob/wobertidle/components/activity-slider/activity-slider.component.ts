import { Component, OnInit, Input } from '@angular/core';
import { AnimationEvent } from '@angular/animations';
import { Activitybasic } from '../../models/activitybasic';
import { Activityadvanced } from '../../models/activityadvanced';
import { activityLoader } from './animations';
import { Item } from '../../models/item';
import { ItemService } from '../../services/item.service';

@Component({
  selector: 'app-activity-slider',
  templateUrl: './activity-slider.component.html',
  styleUrls: ['./activity-slider.component.scss'],
  animations: [
    activityLoader
  ]
})
export class ActivitySliderComponent implements OnInit {
  @Input() activity: Activitybasic | Activityadvanced;
  @Input() inventory: Item[];
  public animState = 'beginAnim';

  constructor(private itemService: ItemService) { }

  ngOnInit(): void {
  }

  onAnimationEvent(event: AnimationEvent, activity: Activitybasic | Activityadvanced) {
    let invenItem: Item;
    this.inventory.forEach(inventoryItem => {
      if (inventoryItem.name === activity.produces) {
        invenItem = inventoryItem;
      }
    });
    if (event.toState === 'endAnim' && event.fromState === 'beginAnim') {
      this.itemService.incrementItem(invenItem.id, 1, activity.mcProficiency);
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
        this.itemService.incrementItem(invenItem.id, -1, -activity.mcProficiency);
        nextState = 'beginAnim';
        break;
      default:
        break;
    }
    this.animState = nextState;
  }

  animationStart(event: AnimationEvent, activity: any) {
    if (event.toState === 'endAnim') {
      this.inventory.forEach(item => {
        if (activity.hasOwnProperty('decrements') && item.name === activity.decrements) {
          if (item.amount < activity.decrementsAmount) {
            activity.active = false;
          } else {
            item.amount -= activity.decrementsAmount;
          }
        }
      });
    }
  }


}
