import { Injectable } from '@angular/core';
import { Subject, BehaviorSubject } from 'rxjs';
import { Activitybasic } from '../models/activitybasic';
import { Activityadvanced } from '../models/activityadvanced';
import { Improvementbasic } from '../models/improvementbasic';
import basicActivitySetup from '../assets/basicactivities';
import advancedActivitySetup from '../assets/advancedactivities';
import basicImprovementSetup from '../assets/basicimprovements';
import { ItemService } from './item.service';
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

  private subBasicImprovements = new Subject<Improvementbasic[]>();
  private basicImprovements: Improvementbasic[] = [];

  constructor(private itemService: ItemService) { }

  subscribeBasic() {
    return this.subBasic;
  }

  subscribeAdvanced() {
    return this.subAdvanced;
  }

  subscribeBasicImprovement() {
    return this.subBasicImprovements;
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

  initializeBasicImprovements() {
    basicImprovementSetup.forEach(improvement => {
      this.basicImprovements.push(new Improvementbasic(improvement));
    });
    this.subBasicImprovements.next(this.basicImprovements);
  }

  getBasicImprovements() {
    this.subBasicImprovements.next(this.basicImprovements);
  }

  buyImprovement(type: string, improvementId: number) {
    const improvements = type === 'basic' ? this.basicImprovements : this.basicImprovements;
    const improvement = improvements.find(imp => imp.id === improvementId);
    const impSub = type === 'basic' ? this.subBasicImprovements : this.subBasicImprovements;
    let sufficientFunds = true;
    improvement.itemsCost.forEach(impCostItem => {
      if (!this.itemService.sufficientFunds(impCostItem.itemId, impCostItem.itemAmount)) {
        sufficientFunds = false;
      }
    });

    if (sufficientFunds) {
      let activities: Activitybase[];
      let activity: Activitybase;
      let sub: BehaviorSubject<Activitybase[]>;
      if (type === 'basic') {
        activities = this.basicActivities;
        activity = activities.find(act => act.id === improvement.activityId);
        sub = this.subBasic;
      }
      if (type === 'advanced') {
        activities = this.advancedActivities;
        activity = activities.find(act => act.id === improvement.activityId);
        sub = this.subAdvanced;
      }
      activity[improvement.improves] = activity[improvement.improves] * improvement.improvesBy;

      improvement.itemsCost.forEach(impCostItem => {
        this.itemService.incrementItem(impCostItem.itemId, -impCostItem.itemAmount);
        impCostItem.itemAmount = impCostItem.itemAmount * improvement.costMultiplyer;
      });

      impSub.next(improvements);
      sub.next(activities);
    }
  }
}
