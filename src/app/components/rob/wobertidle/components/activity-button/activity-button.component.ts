import { Component, OnInit, Input, OnDestroy, OnChanges } from '@angular/core';
import { Subscription } from 'rxjs';
import { slide } from './animations';
import { ActivityService } from '../../services/activity.service';
import { Activity } from '../../models/activity';
import initialItems from '../../assets/items';

@Component({
  selector: 'app-activity-button',
  templateUrl: './activity-button.component.html',
  styleUrls: ['./activity-button.component.scss'],
  animations: [
    slide
  ]
})
export class ActivityButtonComponent implements OnInit, OnChanges, OnDestroy {
  @Input() activityId: number;

  public activities: Activity[] = [];

  public subscriptions: Subscription[] = [];

  public activity: Activity = new Activity({
    id: 0,
    name: '',
    color: '',
    produces: '0',
    produceAmount: 0,
    producesId: 0,
    actionTime: 1000,
    mcpTriggerAmount: 0,
    triggered: false,
    mcpDiscoverAmount: 0,
    discovered: false,
    active: false
  });

  public initialItems = initialItems;

  constructor(
    private activityService: ActivityService
  ) {
  }

  ngOnInit(): void {
    this.activityService.getActivities();

    setTimeout(() => {
      this.subscriptions.push(this.activityService.subscriber().subscribe((activities) => {
        this.activities = activities;
        this.activity = activities.find(act => act.id === this.activityId);
      }));
    });
  }

  ngOnChanges() {
    this.activityService.getActivities();
  }

  toggleActivity(activityId) {
    this.activityService.toggleActivity(activityId);
  }

  ngOnDestroy() {
    this.subscriptions.forEach(subscription => {
      subscription.unsubscribe();
    });
  }
}