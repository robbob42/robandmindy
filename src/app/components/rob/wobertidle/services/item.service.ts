import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { Item } from '../models/item';
import items from '../assets/items';
import { Improvementbasic } from '../models/improvementbasic';

@Injectable({
  providedIn: 'root'
})
export class ItemService {
  private sub = new Subject<Item[]>();
  private inventory: Item[] = [];

  constructor() { }

  subscriber() {
    return this.sub;
  }

  initializeItems() {
    items.forEach((inventoryItem) => {
      this.inventory.push(new Item(inventoryItem));
    });
    this.sub.next(this.inventory);
  }

  getItemInventory() {
    this.sub.next(this.inventory);
  }

  incrementItem(itemId, amount, mcp = 0) {
    const incItem = this.inventory.find(item => item.id === itemId);
    incItem.amount += amount;
    if (mcp) {
      this.inventory.find(item => item.id === 900).amount += mcp;
    }
    if (incItem.amount > incItem.limit) {
      incItem.amount = incItem.limit;
    }
    this.sub.next(this.inventory);
  }

  forceSetAmount(itemId, amount) {
    this.inventory.find(item => item.id === itemId).amount = amount;
    this.sub.next(this.inventory);
  }

  toggleVisible(visible: boolean, itemId: number) {
    this.inventory.find(item => item.id === itemId).visible = visible;
    this.sub.next(this.inventory);
  }

  sufficientFunds(itemId: number, amountCheck: number) {
    return this.inventory.find(invenItem => invenItem.id === itemId).amount >= amountCheck;
  }

  sell(itemId: number, percent: number) {
    const sellingItem = this.inventory.find(item => item.id === itemId);
    const sellingAmount = Math.floor(sellingItem.amount * percent / 100);
    const coinsItem = this.inventory.find(item => item.id === 902);

    if (sellingAmount > 0) {
      // sellingItem.amount -= sellingAmount;
      coinsItem.amount += sellingItem.value * sellingAmount;

      this.sub.next(this.inventory);
    }
  }

  limitReached(itemId: number) {
    const item = this.inventory.find(invItem => invItem.id === itemId);
    return item.amount >= item.limit;
  }

  buyItemImprovement(type: string, improvement: Improvementbasic) {
    const item = this.inventory.find(invItem => invItem.id === improvement.improveeId);
    item[improvement.improves] = item[improvement.improves] * improvement.improvesBy;

    this.sub.next(this.inventory);
  }
}
