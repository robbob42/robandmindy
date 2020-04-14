import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { Item } from '../models/item';
import items from '../assets/items';
import { Improvement } from '../models/improvement';

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

  incrementItem(itemId: number, amount: number, decrementId = 0, decrementAmt = 0, mcp = 0) {
    const incItem = this.inventory.find(item => item.id === itemId);
    incItem.amount += amount;
    if (mcp) {
      this.inventory.find(item => item.id === 900).amount += mcp;
    }
    if (incItem.limit && incItem.amount > incItem.limit) {
      incItem.amount = incItem.limit;
    }
    if (decrementId && decrementAmt) {
      this.inventory.find(item => item.id === decrementId).amount -= decrementAmt;
    }
    this.sub.next(this.inventory);
  }

  forceSetAmount(itemId: number, amount: number) {
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

  amountAvailable(itemId: number, amt: number) {
    if (!itemId) {
      return true;
    }
    const item = this.inventory.find(invItem => invItem.id === itemId);
    return item.amount >= amt;
  }

  buyItemImprovement(improvement: Improvement) {
    const item = this.inventory.find(invItem => invItem.id === improvement.improveeId);
    item[improvement.improves] = item[improvement.improves] * improvement.improvesBy;

    this.sub.next(this.inventory);
  }
}
