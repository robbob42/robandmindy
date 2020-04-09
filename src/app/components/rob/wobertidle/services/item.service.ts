import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { Item } from '../models/item';
import items from '../assets/items';

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

  getItemInventory() {
    items.forEach((inventoryItem) => {
      this.inventory.push(new Item(inventoryItem));
    });

    this.sub.next(this.inventory);
  }

  incrementItem(itemId, amount, mcp = 0) {
    this.inventory.find(item => item.id === itemId).amount += amount;
    if (mcp) {
      this.inventory.find(item => item.id === 900).amount += mcp;
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
}
