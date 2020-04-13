import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { Item } from '../../models/item';
import { ItemService } from '../../services/item.service';
import { ActivityService } from '../../services/activity.service';
import { Activitybasic } from '../../models/activitybasic';
import { UtilsService } from '../../services/utils.service';

@Component({
  selector: 'app-my-sidenav',
  templateUrl: './my-sidenav.component.html',
  styleUrls: ['./my-sidenav.component.scss']
})
export class MySidenavComponent implements OnInit, OnDestroy {
  public basicActivities: Activitybasic[];
  public inventory: Item[];
  public inventoryOpen = false;
  public statsOpen = false;
  public inventoryVisible = false;
  public improvementsVisible = false;
  public activitiesOpen = true;
  public activitiesDisabled = false;
  public mcpItem: Item;
  public humanItem: Item;
  public coinsItem: Item;

  public subscriptions: Subscription[] = [];

  constructor(
    private itemService: ItemService,
    private activityService: ActivityService,
    private utilsService: UtilsService
  ) {
  }

  ngOnInit(): void {
    this.activityService.getBasicActivities();
    this.activityService.getBasicImprovements();
    setTimeout(() => {
      this.activityService.subscribeBasic().subscribe((activities) => {
        this.basicActivities = activities;
      });
      this.subscriptions.push(this.itemService.subscriber().subscribe((items) => {
        this.inventoryVisible = false;
        items.forEach(item => {
          if (item.visible) {
            this.inventoryVisible = true;
            this.inventoryOpen = true;
            this.activitiesOpen = true;
            this.activitiesDisabled = true;
            this.statsOpen = true;
          }
          if (item.id === 900) {
            this.mcpItem = item;
            if (item.amount > 49) {
              this.improvementsVisible = true;
            }
          }
          if (item.id === 901) {
            this.humanItem = item;
          }
          if (item.id === 902) {
            this.coinsItem = item;
          }
        });
        this.inventory = items;

        if (this.basicActivities) {
          this.basicActivities.forEach(activity => {
            if (this.mcpItem.amount === activity.mcpTriggerAmount && activity.trigger && !activity.triggered) {
              this.activityService.triggerActivity(activity.id, 'basic');
            }
            if (this.mcpItem.amount >= activity.mcpDiscoverAmount && !activity.discovered) {
              this.activityService.discoverActivity(activity.id, 'basic');
              this.inventory.find(item => item.name === activity.produces).visible = true;
            }
          });
        }
      }));
    });
  }

  formatCurrency(amt: number) {
    return this.utilsService.formatCurrency(amt);
  }

  ngOnDestroy() {
    this.subscriptions.forEach(subscription => {
      subscription.unsubscribe();
    });
  }
}
