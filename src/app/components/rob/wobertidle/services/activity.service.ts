import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { Activity } from '../models/activity';
import { Improvement } from '../models/improvement';
import activitySetup from '../assets/activities';
import { Globals } from '../assets/globals';

@Injectable({
  providedIn: 'root'
})
export class ActivityService {
  private sub = new BehaviorSubject<Activity[]>([Globals.blankActivity]);
  activities$: Observable<Activity[]> = this.sub.asObservable();

  private activities: Activity[] = [];

  constructor() { }

  toggleActivity(activityId: number) {
    let active: boolean;
    this.activities.forEach(activity => {
      if (activity.id === activityId) {
        active = !activity.active;
      }
      activity.active = false;
    });

    setTimeout(() => {
      this.activities.find(activity => activity.id === activityId).active = active;
      this.sub.next(this.activities);
    }, 1);
  }

  initializeActivities() {
    this.activities = [];
    activitySetup.forEach(activity => {
      this.activities.push(new Activity(activity));
    });
    this.sub.next(this.activities);
  }

  getActivities() {
    this.sub.next(this.activities);
  }

  toggleVisible(visible: boolean, activityId: number) {
    this.activities.find(activity => activity.id === activityId).visible = visible;
    this.sub.next(this.activities);
  }

  triggerActivity(activityId: number) {
    this.activities.find(activity => activity.id === activityId).triggered = true;
    this.sub.next(this.activities);
  }

  discoverActivity(activityId: number) {
    this.activities.find(activity => activity.id === activityId).discovered = true;
    this.sub.next(this.activities);
  }

  buyActivityImprovement(improvement: Improvement) {
    this.activities.find(act => act.id === improvement.improveeId)[improvement.improves] *= improvement.improvesBy;
    this.sub.next(this.activities);
  }
}
