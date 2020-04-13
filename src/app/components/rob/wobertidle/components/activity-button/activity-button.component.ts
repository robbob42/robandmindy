import { Component, OnInit, Input, OnDestroy, OnChanges } from '@angular/core';
import { Subscription } from 'rxjs';
import { slide } from './animations';
import { ActivityService } from '../../services/activity.service';
import { Activitybasic } from '../../models/activitybasic';
import { Activityadvanced } from '../../models/activityadvanced';
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
  @Input() type: string;

  public basicActivities: Activitybasic[] = [];
  public advancedActivities: Activityadvanced[] = [];

  public subscriptions: Subscription[] = [];

  public activity: Activitybasic = new Activitybasic({
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
    this.activityService.getBasicActivities();
    this.activityService.getAdvancedActivities();

    setTimeout(() => {
      this.subscriptions.push(this.activityService.subscribeBasic().subscribe((activities) => {
        this.basicActivities = activities;
        this.activity = activities.find(act => act.id === this.activityId);
      }));
      this.subscriptions.push(this.activityService.subscribeAdvanced().subscribe((activities) => {
        this.advancedActivities = activities;
      }));
    });
  }

  ngOnChanges() {
    this.activityService.getBasicActivities();
    this.activityService.getAdvancedActivities();
  }

  toggleActivity(activityId, type) {
    this.activityService.toggleActivity(activityId, type);
  }

  ngOnDestroy() {
    this.subscriptions.forEach(subscription => {
      subscription.unsubscribe();
    });
  }
}
