import { Injectable } from '@angular/core';
import { Item } from '../models/item';

@Injectable({
  providedIn: 'root'
})
export class ItemService {
  private inventory: Item[] = [];

  constructor() { }

  getItemInventory() {

    const inventoryCollection = [
      {
        id: 1,
        name: 'Rocks',
        icon: 'data-cluster',
        color: '#555555',
        amount: 0,
        visible: true
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

    return this.inventory;
  }
}
