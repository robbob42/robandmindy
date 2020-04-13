import { Component, OnInit, OnDestroy } from '@angular/core';
import { ItemService } from '../../services/item.service';
import { Item } from '../../models/item';
import { Activitybasic } from '../../models/activitybasic';
import { ActivityService } from '../../services/activity.service';
import { Activityadvanced } from '../../models/activityadvanced';
import { Improvementbasic } from '../../models/improvementbasic';
import { Subscription } from 'rxjs';
import initialItems from '../../assets/items';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit, OnDestroy {
  public inventory: Item[] = [];
  public basicActivities: Activitybasic[];
  public advancedActivities: Activityadvanced[] = [];
  public basicImprovements: Improvementbasic[] = [];

  public subscriptions: Subscription[] = [];

  public obtainRawVisible = false;
  public refineVisible = false;
  public mcpItem: Item;
  public humanItem: Item;

  public initialItems = initialItems;

  constructor(
    private itemService: ItemService,
    private activityService: ActivityService) {

    // Item subscriptions
    this.subscriptions.push(this.itemService.subscriber().subscribe((items) => {
      items.forEach(item => {
        if (item.id === 900) {
          this.mcpItem = item;
        }
        if (item.id === 901) {
          this.humanItem = item;
        }
      });
    }));

    // Activity subscriptions
    this.subscriptions.push(this.activityService.subscribeBasic().subscribe((activities) => {
      this.obtainRawVisible = false;
      activities.forEach(activity => {
        if (activity.visible) {
          this.obtainRawVisible = true;
        }
      });

      this.basicActivities = activities;
    }));

    this.subscriptions.push(activityService.subscribeAdvanced().subscribe((activities) => {
      this.refineVisible = false;
      activities.forEach(activity => {
        if (activity.visible) {
          this.refineVisible = true;
        }
      });

      this.advancedActivities = activities;
    }));
  }

  ngOnInit() {
    this.activityService.getBasicActivities();
    this.activityService.getAdvancedActivities();
    this.itemService.getItemInventory();
  }

  ngOnDestroy() {
    this.subscriptions.forEach(subscription => {
      subscription.unsubscribe();
    });
  }
}
