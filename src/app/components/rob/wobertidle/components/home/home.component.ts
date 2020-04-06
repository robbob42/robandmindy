import { Component, OnInit } from '@angular/core';
import { ItemService } from '../../services/item.service';
import { Item } from '../../models/item';
import { Activitybasic } from '../../models/activitybasic';
import { ActivityService } from '../../services/activity.service';
import { Activityadvanced } from '../../models/activityadvanced';

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

  setNumOfWorkers() {
    console.log(this.numOfWorkers);
  }
}
