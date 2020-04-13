import { Injectable } from '@angular/core';
import basicImprovementSetup from '../assets/basicimprovements';
import { Improvementbasic } from '../models/improvementbasic';
import { Subject } from 'rxjs';
import { ItemService } from './item.service';
import { ActivityService } from './activity.service';

@Injectable({
  providedIn: 'root'
})
export class ImprovementService {
  private basicImprovements: Improvementbasic[] = [];
  private subBasicImprovements = new Subject<Improvementbasic[]>();

  constructor(private itemService: ItemService, private activityService: ActivityService) { }

  subscribeBasicImprovement() {
    return this.subBasicImprovements;
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
      switch (improvement.improvee) {
        case 'activity':
          this.activityService.buyActivityImprovement(improvement);
          break;
        case 'item':
          this.itemService.buyItemImprovement(type, improvement);
          break;
        default:
          break;
      }


      improvement.itemsCost.forEach(impCostItem => {
        this.itemService.incrementItem(impCostItem.itemId, -impCostItem.itemAmount);
        impCostItem.itemAmount = impCostItem.itemAmount * improvement.costMultiplyer;
      });

      impSub.next(improvements);
    }
  }

}
