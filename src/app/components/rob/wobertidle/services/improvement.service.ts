import { Injectable } from '@angular/core';
import improvementSetup from '../assets/improvements';
import { Improvement } from '../models/improvement';
import { BehaviorSubject, Observable } from 'rxjs';
import { ItemService } from './item.service';
import { ActivityService } from './activity.service';
import { Globals } from '../assets/globals';

@Injectable({
  providedIn: 'root'
})
export class ImprovementService {
  private sub = new BehaviorSubject<Improvement[]>([Globals.blankImprovement]);
  improvements$: Observable<Improvement[]> = this.sub.asObservable();

  private improvements: Improvement[] = [];

  constructor(
    private itemService: ItemService,
    private activityService: ActivityService
    ) { }

  initialize(dontResetIds = []) {
    const intializeImprovements = [];
    improvementSetup.forEach((improvementItem) => {
      let pushImprovement = JSON.parse(JSON.stringify(improvementItem));
      dontResetIds.forEach((id) => {
        if (improvementItem.id === id) {
          pushImprovement = JSON.parse(JSON.stringify(this.improvements.find(findItem => findItem.id === id)));
        }
      });
      intializeImprovements.push(new Improvement(pushImprovement));
    });
    this.improvements = intializeImprovements;
    this.sub.next(this.improvements);
  }

  getImprovements() {
    this.sub.next(this.improvements);
  }

  buyImprovement(improvementId: number) {
    const improvement = this.improvements.find(imp => imp.id === improvementId);
    let sufficientFunds = true;
    improvement.itemsCost.forEach(impCostItem => {
      if (!this.itemService.sufficientFunds(impCostItem.itemId, impCostItem.itemAmount)) {
        sufficientFunds = false;
      }
    });

    if (sufficientFunds) {
      improvement.itemsCost.forEach(impCostItem => {
        this.itemService.incrementItem(impCostItem.itemId, -impCostItem.itemAmount);
        impCostItem.itemAmount = Math.round(impCostItem.itemAmount * improvement.costMultiplyer);
      });
      improvement.level++;
      this.sub.next(this.improvements);

      switch (improvement.improvee) {
        case 'activity':
          this.activityService.buyActivityImprovement(improvement);
          break;
        case 'item':
          this.itemService.buyItemImprovement(improvement);
          break;
        default:
          break;
      }
    }
  }

}
