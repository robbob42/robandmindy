import { Component, OnInit } from '@angular/core';
import { loadBasic, loadAdvanced, slide } from './animations';
import { AnimationEvent } from '@angular/animations';
import { ItemService } from '../../services/item.service';
import { Item } from '../../models/item';
import { Activitybasic } from '../../models/activitybasic';
import { ActivityService } from '../../services/activity.service';
import { Activityadvanced } from '../../models/activityadvanced';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
  animations: [
    loadBasic, loadAdvanced, slide
  ]
})
export class HomeComponent implements OnInit {
  public animStateBasic = 'beginAnim';
  public animStateAdvanced = 'beginAnim';
  public inventory: Item[] = [];
  public basicActivities: Activitybasic[] = [];
  public advancedActivities: Activityadvanced[] = [];

  constructor(itemService: ItemService, private activityService: ActivityService) {
    this.inventory = itemService.getItemInventory();

    activityService.subscribeBasic().subscribe((activities) => {
      this.basicActivities = activities;
    });
    activityService.getBasicActivities();

    activityService.subscribeAdvanced().subscribe((activites) => {
      this.advancedActivities = activites;
    });
    activityService.getAdvancedActivities();
  }

  ngOnInit() {
  }

  onAnimationEvent(event: AnimationEvent, activity, type) {
    let invenItem;
    this.inventory.forEach(inventoryItem => {
      if (inventoryItem.name === activity.produces) {
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
    if (type === 'basic') {
      this.animStateBasic = nextState;
    } else {
      this.animStateAdvanced = nextState;
    }
  }

  advancedAnimationStart(event: AnimationEvent, activity: Activityadvanced) {
    if (event.toState === 'endAnim') {
      this.inventory.forEach(item => {
        if (item.name === activity.decrements) {
          if (item.amount < activity.decrementsAmount) {
            activity.active = false;
          } else {
            item.amount -= activity.decrementsAmount;
          }
        }
      });
    }
  }

  toggleBasicActivity(activityId) {
    this.activityService.toggleBasicActivity(activityId);
  }
  toggleAdvancedActivity(activityId) {
    this.activityService.toggleAdvancedActivity(activityId);
  }
}
