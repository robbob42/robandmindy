import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { Activitybasic } from '../models/activitybasic';
import { Activityadvanced } from '../models/activityadvanced';
import { Improvementbasic } from '../models/improvementbasic';
import basicActivitySetup from '../assets/basicactivities';
import advancedActivitySetup from '../assets/advancedactivities';
import basicImprovementSetup from '../assets/basicimprovements';
import { ItemService } from './item.service';

@Injectable({
  providedIn: 'root'
})
export class ActivityService {
  private subBasic = new Subject<Activitybasic[]>();
  private basicActivities: Activitybasic[] = [];

  private subAdvanced = new Subject<Activityadvanced[]>();
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
    const activities = type === 'basic' ? this.basicActivities : this.advancedActivities;
    const sub = type === 'basic' ? this.subBasic : this.subAdvanced;
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

  getBasicActivities() {
    basicActivitySetup.forEach(activity => {
      this.basicActivities.push(new Activitybasic(activity));
    });
    this.subBasic.next(this.basicActivities);
  }

  getAdvancedActivities() {
    advancedActivitySetup.forEach(activity => {
      this.advancedActivities.push(new Activityadvanced(activity));
    });
    this.subAdvanced.next(this.advancedActivities);
  }

  toggleVisible(visible: boolean, activityId: number, type: string) {
    const activities = type === 'basic' ? this.basicActivities : this.advancedActivities;
    const sub = type === 'basic' ? this.subBasic : this.subAdvanced;

    activities.find(activity => activity.id === activityId).visible = visible;
    sub.next(activities);
  }

  getBasicImprovements() {
    basicImprovementSetup.forEach(improvement => {
      this.basicImprovements.push(new Improvementbasic(improvement));
    });
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
      const activities = type === 'basic' ? this.basicActivities : this.advancedActivities;
      const activity = activities.find(act => act.id === improvement.activityId);
      const sub = type === 'basic' ? this.subBasic : this.subAdvanced;
      activity[improvement.improves] = (activity[improvement.improves] * improvement.improvesBy).toFixed(0);

      improvement.itemsCost.forEach(impCostItem => {
        this.itemService.incrementItem(impCostItem.itemId, -impCostItem.itemAmount);
        impCostItem.itemAmount = impCostItem.itemAmount * improvement.costMultiplyer;
      });

      impSub.next(improvements);
      sub.next(activities);
    }
  }
}
