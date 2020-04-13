import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivityService } from '../../services/activity.service';
import { Activitybasic } from '../../models/activitybasic';
import { ItemService } from '../../services/item.service';
import { Item } from '../../models/item';
import { Subscription } from 'rxjs';
import { Improvementbasic } from '../../models/improvementbasic';
import itemsModel from '../../assets/items';
import { UtilsService } from '../../services/utils.service';
import { ImprovementService } from '../../services/improvement.service';

@Component({
  selector: 'app-shop',
  templateUrl: './shop.component.html',
  styleUrls: ['./shop.component.scss']
})
export class ShopComponent implements OnInit, OnDestroy {
  public inventory: Item[] = [];
  public basicImprovements: Improvementbasic[] = [];

  public subscriptions: Subscription[] = [];
  public itemsModel = itemsModel;

  constructor(
    private improvementService: ImprovementService,
    private itemService: ItemService,
    private utilsService: UtilsService
    ) {
    // Activity subscriptions
    this.subscriptions.push(improvementService.subscribeBasicImprovement().subscribe((improvements) => {
      this.basicImprovements = improvements;
    }));

    // Item subscriptions
    this.itemService.subscriber().subscribe((items) => {
      this.inventory = items;
    });
  }

  ngOnInit() {
    this.improvementService.getBasicImprovements();
    this.itemService.getItemInventory();
  }

  buyBasicImprovement(improvementId: number) {
    this.improvementService.buyImprovement('basic', improvementId);
  }

  sell(itemId: number, percent: number) {
    this.itemService.sell(itemId, percent);
  }

  formatCurrency(amt: number) {
    return this.utilsService.formatCurrency(amt);
  }

  ngOnDestroy() {
    this.subscriptions.forEach(subscription => {
      subscription.unsubscribe();
    });
  }
}
