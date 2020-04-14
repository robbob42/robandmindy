import { Injectable } from '@angular/core';
import improvementSetup from '../assets/improvements';
import { Improvement } from '../models/improvement';
import { Subject } from 'rxjs';
import { ItemService } from './item.service';
import { ActivityService } from './activity.service';

@Injectable({
  providedIn: 'root'
})
export class ImprovementService {
  private improvements: Improvement[] = [];
  private sub = new Subject<Improvement[]>();

  constructor(private itemService: ItemService, private activityService: ActivityService) { }

  subscriber() {
    return this.sub;
  }

  initialize() {
    improvementSetup.forEach(improvement => {
      this.improvements.push(new Improvement(improvement));
    });
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


      improvement.itemsCost.forEach(impCostItem => {
        this.itemService.incrementItem(impCostItem.itemId, -impCostItem.itemAmount);
        impCostItem.itemAmount = Math.round(impCostItem.itemAmount * improvement.costMultiplyer);
      });
      improvement.level++;
      this.sub.next(this.improvements);
    }
  }

}
