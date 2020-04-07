import { Injectable } from '@angular/core';
import { Activitybasic } from '../models/activitybasic';
import { Subject } from 'rxjs';
import { Activityadvanced } from '../models/activityadvanced';

@Injectable({
  providedIn: 'root'
})
export class ActivityService {
  private subBasic = new Subject<Activitybasic[]>();
  private basicActivities: Activitybasic[] = [];

  private subAdvanced = new Subject<Activityadvanced[]>();
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
    const basicActivitySetup = [
      {
        id: 1,
        name: 'Mining',
        active: false,
        color: '#555555',
        produces: 'Rocks',
        actionTime: '1000ms',
        mcProficiency: 1,
        mcpTriggerAmount: 0,
        triggered: true,
        mcpDiscoverAmount: 0,
        discovered: true,
        visible: false
      },
      {
        id: 2,
        name: 'Chopping',
        active: false,
        color: '#425f0b',
        produces: 'Trees',
        actionTime: '2000ms',
        mcProficiency: 5,
        mcpTriggerAmount: 5,
        triggered: false,
        mcpDiscoverAmount: 10,
        discovered: false,
        visible: false
      },
      {
        id: 3,
        name: 'Fishing',
        active: false,
        color: '#84b0f1',
        produces: 'Fish',
        actionTime: '5000ms',
        mcProficiency: 15,
        mcpTriggerAmount: 30,
        triggered: false,
        mcpDiscoverAmount: 50,
        discovered: false,
        visible: false
      }
    ];

    basicActivitySetup.forEach(activity => {
      this.basicActivities.push(new Activitybasic(activity));
    });
    this.subBasic.next(this.basicActivities);
  }

  getAdvancedActivities() {
    const advancedActivitySetup = [
      {
        id: 1,
        name: 'Refining',
        active: false,
        color: '#AA5555',
        produces: 'Gems',
        produceAmount: 1,
        actionTime: '5000ms',
        mcProficiency: 30,
        mcpTriggerAmount: 2000,
        triggered: false,
        mcpDiscoverAmount: 5000,
        discovered: false,
        decrements: 'Rocks',
        decrementAmount: 5,
        visible: false
      },
      {
        id: 2,
        name: 'Milling',
        active: false,
        color: '#423821',
        produces: 'Boards',
        produceAmount: 1,
        actionTime: '10000ms',
        mcProficiency: 60,
        mcpTriggerAmount: 20000,
        triggered: false,
        mcpDiscoverAmount: 50000,
        discovered: false,
        decrements: 'Trees',
        decrementAmount: 3,
        visible: false
      },
      {
        id: 3,
        name: 'Cooking',
        active: false,
        color: '#be6868',
        produces: 'Cooked Fish',
        produceAmount: 1,
        actionTime: '15000ms',
        mcProficiency: 100,
        mcpTriggerAmount: 200000,
        triggered: false,
        mcpDiscoverAmount: 500000,
        discovered: false,
        decrements: 'Fish',
        decrementAmount: 2,
        visible: false
      }
    ];

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
}
