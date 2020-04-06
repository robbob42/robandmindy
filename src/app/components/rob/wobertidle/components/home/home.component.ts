import { Component, OnInit } from '@angular/core';
import { ItemService } from '../../services/item.service';
import { Item } from '../../models/item';
import { Activitybasic } from '../../models/activitybasic';
import { ActivityService } from '../../services/activity.service';
import { Activityadvanced } from '../../models/activityadvanced';
import { MessageService } from '../../services/message.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  public inventory: Item[] = [];
  public basicActivities: Activitybasic[] = [];
  public advancedActivities: Activityadvanced[] = [];
  public numOfWorkers = 1;
  public obtainRawVisible = false;
  public refineVisible = false;
  public activityObtainVisible = false;
  public activityRefineVisible = false;
  public inventoryVisible = false;
  public advanceStorylineVisible = true;

  constructor(
    itemService: ItemService,
    activityService: ActivityService,
    private messageService: MessageService) {
    itemService.subscriber().subscribe((items) => {
      this.inventoryVisible = false;
      items.forEach(item => {
        if (item.visible) {
          this.inventoryVisible = true;
        }
      });
      this.inventory = items;
    });
    itemService.getItemInventory();

    activityService.subscribeBasic().subscribe((activities) => {
      this.obtainRawVisible = false;
      this.activityObtainVisible = false;
      activities.forEach(activity => {
        if (activity.visible) {
          this.obtainRawVisible = true;
          this.activityObtainVisible = true;
        }
      });

      this.basicActivities = activities;
    });
    activityService.getBasicActivities();

    activityService.subscribeAdvanced().subscribe((activities) => {
      this.refineVisible = false;
      this.activityRefineVisible = false;
      activities.forEach(activity => {
        if (activity.visible) {
          this.refineVisible = true;
          this.activityRefineVisible = true;
        }
      });

      this.advancedActivities = activities;
    });
    activityService.getAdvancedActivities();

    messageService.subscribeAdvance().subscribe((subscribedAdvanceVis) => {
      this.advanceStorylineVisible = subscribedAdvanceVis;
    });
    messageService.getAdvanceVisible();
  }

  ngOnInit() {
  }

  setNumOfWorkers() {
    console.log(this.numOfWorkers);
  }

  advanceStoryline() {
    this.messageService.advanceStoryline();
  }
}
