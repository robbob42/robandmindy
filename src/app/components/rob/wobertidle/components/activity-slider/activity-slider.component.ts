import { Component, OnInit, Input, OnDestroy } from '@angular/core';
import { Activitybasic } from '../../models/activitybasic';
import { Activityadvanced } from '../../models/activityadvanced';
import { Item } from '../../models/item';
import { ItemService } from '../../services/item.service';
import { Subscription } from 'rxjs';
import { ActivityService } from '../../services/activity.service';

@Component({
  selector: 'app-activity-slider',
  templateUrl: './activity-slider.component.html',
  styleUrls: ['./activity-slider.component.scss']
})
export class ActivitySliderComponent implements OnInit, OnDestroy {
  @Input() activityId: number;
  @Input() type: string;

  public inventory: Item[];
  public advancedActivities: Activityadvanced[];

  public subscriptions: Subscription[] = [];

  public activity: Activitybasic;

  public actionTime: number;
  public activityWidthNum = 0;
  public activityWidth = this.activityWidthNum.toString() + '%';
  public invenItem: Item;
  public activityInterval: number;

  constructor(
    private itemService: ItemService,
    private activityService: ActivityService
  ) {
  }

  ngOnInit(): void {
    this.activityService.getBasicActivities();
    setTimeout(() => {
      this.subscriptions.push(this.activityService.subscribeBasic().subscribe((activities) => {
        this.activity = activities.find(act => act.id === this.activityId);
        if (this.activity) {
          this.actionTime = parseInt(this.activity.actionTime, 10) / 1000;
        }
        clearInterval(this.activityInterval);
        this.activityInterval = window.setInterval(() => {
          if (this.activity && this.activity.active) {
            this.activityWidthNum += 1000 / parseInt(this.activity.actionTime, 10);
            if (this.activityWidthNum >= 100) {
              this.activityWidthNum = 0;
              this.itemService.incrementItem(this.invenItem.id, 1, this.activity.mcProficiency);
            }
            this.activityWidth = this.activityWidthNum.toString() + '%';
          }
        }, 10);
      }));
      this.subscriptions.push(this.activityService.subscribeAdvanced().subscribe((activities) => {
        this.advancedActivities = activities;
      }));
      this.subscriptions.push(this.itemService.subscriber().subscribe((items) => {
        this.inventory = items;
        items.forEach(inventoryItem => {
          if (this.activity && inventoryItem.name === this.activity.produces) {
            this.invenItem = inventoryItem;
          }
        });
      }));
    });
  }

  startActivity(activityId: number, type: string) {
    this.activityService.toggleActivity(activityId, type);
  }

  ngOnDestroy() {
    this.subscriptions.forEach(subscription => {
      subscription.unsubscribe();
    });
  }
}
