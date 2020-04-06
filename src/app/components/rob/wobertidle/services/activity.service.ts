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
      activities.forEach(activity => {
        if (activity.id === activityId) {
          activity.active = active;
          sub.next(activities);
        }
      });
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
        visible: true
      },
      {
        id: 2,
        name: 'Chopping',
        active: false,
        color: '#425f0b',
        produces: 'Trees',
        actionTime: '2000ms',
        visible: false
      },
      {
        id: 3,
        name: 'Fishing',
        active: false,
        color: '#84b0f1',
        produces: 'Fish',
        actionTime: '5000ms',
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
}
