import { Injectable } from '@angular/core';
import { Subject, BehaviorSubject } from 'rxjs';
import { Activitybasic } from '../models/activitybasic';
import { Activityadvanced } from '../models/activityadvanced';
import { Improvementbasic } from '../models/improvementbasic';
import basicActivitySetup from '../assets/basicactivities';
import advancedActivitySetup from '../assets/advancedactivities';
import { Activitybase } from '../models/activitybase';

@Injectable({
  providedIn: 'root'
})
export class ActivityService {
  private subBasic = new BehaviorSubject<Activitybasic[]>([new Activitybasic({
    id: 0,
    name: '',
    active: false,
    color: '',
    produces: '',
    produceAmount: 0,
    producesId: 0,
    actionTime: 0,
    mcpTriggerAmount: 0,
    triggered: false,
    mcpDiscoverAmount: 0,
    discovered: false
  })]);

  public basicActivitesData = this.subBasic.asObservable();
  private basicActivities: Activitybasic[] = [];

  private subAdvanced = new BehaviorSubject<Activityadvanced[]>([new Activityadvanced({
    id: 0,
    name: '',
    active: false,
    color: '',
    produces: '',
    produceAmount: 0,
    producesId: 0,
    actionTime: 0,
    mcpTriggerAmount: 0,
    triggered: false,
    mcpDiscoverAmount: 0,
    discovered: false,
    decrementAmount: 0,
    decrements: ''
  })]);
  private advancedActivities: Activityadvanced[] = [];


  constructor() { }

  subscribeBasic() {
    return this.subBasic;
  }

  subscribeAdvanced() {
    return this.subAdvanced;
  }

  toggleActivity(activityId: number, type: string) {
    let active: boolean;
    let activities: Activitybase[];
    let sub: BehaviorSubject<Activitybase[]>;
    if (type === 'basic') {
      activities = this.basicActivities;
      sub = this.subBasic;
    }
    if (type === 'advanced') {
      activities = this.advancedActivities;
      sub = this.subAdvanced;
    }

    activities.forEach(activity => {
      if (activity.id === activityId) {
        active = !activity.active;
      }
      activity.active = false;
    });

    setTimeout(() => {
      activities.find(activity => activity.id === activityId).active = active;
      sub.next(activities);
    }, 1);
  }

  initializeBasicActivities() {
    this.basicActivities = [];
    basicActivitySetup.forEach(activity => {
      this.basicActivities.push(new Activitybasic(activity));
    });
    this.subBasic.next(this.basicActivities);
  }

  getBasicActivities() {
    this.subBasic.next(this.basicActivities);
  }

  initializeAdvancedActivities() {
    advancedActivitySetup.forEach(activity => {
      this.advancedActivities.push(new Activityadvanced(activity));
    });
    this.subAdvanced.next(this.advancedActivities);
  }

  getAdvancedActivities() {
    this.subAdvanced.next(this.advancedActivities);
  }

  toggleVisible(visible: boolean, activityId: number, type: string) {
    let activities: Activitybase[];
    let sub: BehaviorSubject<Activitybase[]>;
    if (type === 'basic') {
      activities = this.basicActivities;
      sub = this.subBasic;
    }
    if (type === 'advanced') {
      activities = this.advancedActivities;
      sub = this.subAdvanced;
    }

    activities.find(activity => activity.id === activityId).visible = visible;
    sub.next(activities);
  }

  triggerActivity(activityId: number, type: string) {
    let activities: Activitybase[];
    let sub: BehaviorSubject<Activitybase[]>;
    if (type === 'basic') {
      activities = this.basicActivities;
      sub = this.subBasic;
    }
    if (type === 'advanced') {
      activities = this.advancedActivities;
      sub = this.subAdvanced;
    }

    activities.find(activity => activity.id === activityId).triggered = true;
    sub.next(activities);
  }

  discoverActivity(activityId: number, type: string) {
    let activities: Activitybase[];
    let sub: BehaviorSubject<Activitybase[]>;
    if (type === 'basic') {
      activities = this.basicActivities;
      sub = this.subBasic;
    }
    if (type === 'advanced') {
      activities = this.advancedActivities;
      sub = this.subAdvanced;
    }

    activities.find(activity => activity.id === activityId).discovered = true;
    sub.next(activities);
  }

  buyActivityImprovement(type: string, improvement: Improvementbasic) {
    let activities: Activitybase[];
    let activity: Activitybase;
    let sub: BehaviorSubject<Activitybase[]>;
    if (type === 'basic') {
      activities = this.basicActivities;
      activity = activities.find(act => act.id === improvement.improveeId);
      sub = this.subBasic;
    }
    if (type === 'advanced') {
      activities = this.advancedActivities;
      activity = activities.find(act => act.id === improvement.improveeId);
      sub = this.subAdvanced;
    }
    activity[improvement.improves] = activity[improvement.improves] * improvement.improvesBy;
    sub.next(activities);
  }
}
