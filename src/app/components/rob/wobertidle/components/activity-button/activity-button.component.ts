import { Component, OnInit, Input } from '@angular/core';
import { ActivityService } from '../../services/activity.service';
import { Item } from '../../models/item';
import { slide } from './animations';

@Component({
  selector: 'app-activity-button',
  templateUrl: './activity-button.component.html',
  styleUrls: ['./activity-button.component.scss'],
  animations: [
    slide
  ]
})
export class ActivityButtonComponent implements OnInit {
  @Input() activity: any;
  @Input() inventory: Item[];

  constructor(private activityService: ActivityService) { }

  ngOnInit(): void {
  }

  toggleActivity(activityId, type) {
    this.activityService.toggleActivity(activityId, type);
  }
}
