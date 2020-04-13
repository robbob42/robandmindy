import { Component, OnInit, Input, OnDestroy } from '@angular/core';
import { Activity } from '../../models/activity';
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

  public subscriptions: Subscription[] = [];

  public activity: Activity;

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
    this.activityService.getActivities();
    setTimeout(() => {
      this.subscriptions.push(this.activityService.subscriber().subscribe((activities) => {
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
    });
  }

  toggleActivity(activityId: number, type: string) {
    this.activityService.toggleActivity(activityId);
  }

  ngOnDestroy() {
    this.subscriptions.forEach(subscription => {
      subscription.unsubscribe();
    });
  }
}
