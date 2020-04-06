import { Injectable } from '@angular/core';
import { Item } from '../models/item';
import { Subject } from 'rxjs';

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

    const inventoryCollection = [
      {
        id: 1,
        name: 'Rocks',
        icon: 'data-cluster',
        color: '#555555',
        amount: 0,
        visible: false
      },
      {
        id: 2,
        name: 'Trees',
        icon: 'tree',
        color: '#425f0b',
        amount: 0,
        visible: false
      },
      {
        id: 3,
        name: 'Fish',
        icon: 'fish',
        color: '#84b0f1',
        amount: 0,
        visible: false
      },
      {
        id: 4,
        name: 'Gems',
        icon: 'objects',
        color: '#aa5555',
        amount: 0,
        visible: false
      },
      {
        id: 5,
        name: 'Boards',
        icon: 'container',
        color: '#423821',
        amount: 0,
        visible: false
      },
      {
        id: 6,
        name: 'Cooked Fish',
        icon: 'fish',
        color: '#be6868',
        amount: 0,
        visible: false
      },
    ];

    inventoryCollection.forEach((inventoryItem) => {
      this.inventory.push(new Item(inventoryItem));
    });

    this.sub.next(this.inventory);
  }

  toggleVisible(itemId: number) {
    this.inventory.forEach(item => {
      if (item.id === itemId) {
        item.visible = !item.visible;
      }
    });
    this.sub.next(this.inventory);
  }
}
