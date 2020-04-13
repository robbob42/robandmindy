import { Component, OnInit, OnDestroy } from '@angular/core';
import { ItemService } from '../../services/item.service';
import { Item } from '../../models/item';
import { Subscription } from 'rxjs';
import { Improvement } from '../../models/improvement';
import itemsModel from '../../assets/items';
import { UtilsService } from '../../services/utils.service';
import { ImprovementService } from '../../services/improvement.service';
import { Globals } from '../../assets/globals';

@Component({
  selector: 'app-shop',
  templateUrl: './shop.component.html',
  styleUrls: ['./shop.component.scss']
})
export class ShopComponent implements OnInit, OnDestroy {
  public inventory: Item[] = [];
  public basicImprovements: Improvement[] = [];

  public subscriptions: Subscription[] = [];
  public itemsModel = itemsModel;

  public speedImprovementsVisible = false;
  public speedImprovementsVisibleAmt = Globals.speedImprovementsVisibleAmt;

  public moneyImprovementsVisible = false;
  public moneyImprovementsAmt = Globals.moneyImprovementsAmt;

  public mcpItem = new Item({
    id: 0,
    name: '',
    icon: '',
    color: '',
    value: 0,
    amount: 0,
    limit: 0,
    visible: false
  });

  constructor(
    private improvementService: ImprovementService,
    private itemService: ItemService,
    public utilsService: UtilsService
    ) {
    // Activity subscriptions
    this.subscriptions.push(improvementService.subscriber().subscribe((improvements) => {
      this.basicImprovements = improvements;
    }));

    // Item subscriptions
    this.itemService.subscriber().subscribe((items) => {
      items.forEach(item => {
        if (item.id === 900) {
          this.mcpItem = item;
          this.speedImprovementsVisible = item.amount >= this.speedImprovementsVisibleAmt;
          this.moneyImprovementsVisible = item.amount >= this.moneyImprovementsAmt;
        }
      });
      this.inventory = items;
    });
  }

  ngOnInit() {
    this.improvementService.getImprovements();
    this.itemService.getItemInventory();
  }

  buyBasicImprovement(improvementId: number) {
    this.improvementService.buyImprovement(improvementId);
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
