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
  public numOfWorkers = 0;
  public obtainRawVisible = false;
  public refineVisible = false;
  public activityObtainVisible = false;
  public activityRefineVisible = false;
  public inventoryVisible = false;
  public powersVisible = false;
  public advanceStorylineVisible = true;
  public mcProficiency = 0;
  public mcpItem = {
    icon: '',
    color: ''
  };

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
        if (item.id === 900) {
          this.mcpItem = item;
          this.mcProficiency = item.amount;
        }
      });
      this.inventory = items;

      this.basicActivities.forEach(activity => {
        if (this.mcProficiency === activity.mcpTriggerAmount && activity.trigger && !activity.triggered) {
          activity.triggered = true;
          this.messageService.processTrigger(activity.trigger);
        }
        if (this.mcProficiency >= activity.mcpDiscoverAmount && !activity.discovered) {
          activity.discovered = true;
          this.inventory.find(item => item.name === activity.produces).visible = true;
        }
        if (this.mcProficiency < activity.mcpDiscoverAmount && activity.discovered) {
          activity.discovered = false;
          this.inventory.find(item => item.name === activity.produces).visible = false;
        }
      });
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

    messageService.subscribeMessages().subscribe((message) => {
      const latestMessage = message[0];
      if (latestMessage.triggerId === 1001) {
        this.numOfWorkers = 1;
      }
      if (latestMessage.triggerId === 1000) {
        this.powersVisible = true;
      }
    });
  }

  ngOnInit() {
  }
}
