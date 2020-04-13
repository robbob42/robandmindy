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

  public advancedActivities: Activityadvanced[];

  public subscriptions: Subscription[] = [];

  public activity: Activitybasic;

  public actionTime: string;
  public activityWidthNum = 0;
  public activityWidth = this.activityWidthNum.toString() + '%';
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
          this.actionTime = (this.activity.actionTime / 1000).toFixed(3);
        }
        clearInterval(this.activityInterval);
        this.activityInterval = window.setInterval(() => {
          if (this.activity && this.activity.active && !this.itemService.limitReached(this.activity.producesId)) {
            this.activityWidthNum += 1000 / this.activity.actionTime;
            if (this.activityWidthNum >= 100) {
              this.activityWidthNum = 0;
              this.itemService.incrementItem(this.activity.producesId, this.activity.produceAmount, this.activity.mcProficiency);
            }
            this.activityWidth = this.activityWidthNum.toString() + '%';
          }
        }, 10);
      }));
      this.subscriptions.push(this.activityService.subscribeAdvanced().subscribe((activities) => {
        this.advancedActivities = activities;
      }));
    });
  }

  toggleActivity(activityId: number, type: string) {
    this.activityService.toggleActivity(activityId, type);
  }

  ngOnDestroy() {
    this.subscriptions.forEach(subscription => {
      subscription.unsubscribe();
    });
  }
}
