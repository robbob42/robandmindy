import { Component, OnInit, Input, ChangeDetectionStrategy, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { slide } from './animations';
import { ActivityService } from '../../services/activity.service';
import { Activity } from '../../models/activity';
import initialItems from '../../assets/items';

@Component({
  selector: 'app-activity-button',
  templateUrl: './activity-button.component.html',
  styleUrls: ['./activity-button.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  animations: [
    slide
  ]
})
export class ActivityButtonComponent implements OnInit, OnDestroy {
  @Input() activityId: number;

  public activitySub: Subscription;
  public activity: Activity;

  public initialItems = initialItems;

  constructor(
    public activityService: ActivityService
  ) {
  }

  ngOnInit(): void {
    this.activitySub = this.activityService.activities$.subscribe((activities) => {
      this.activity = activities.find((act => act.id === this.activityId));
    });
  }

  toggleActivity(activityId) {
    this.activityService.toggleActivity(activityId);
  }

  ngOnDestroy() {
    this.activitySub.unsubscribe();
  }
}
