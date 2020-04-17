import { Component, OnInit, Input, ChangeDetectionStrategy, OnDestroy } from '@angular/core';
import { ImprovementService } from '../../services/improvement.service';
import initialItems from '../../assets/items';
import { UtilsService } from '../../services/utils.service';
import { Subscription } from 'rxjs';
import { Item } from '../../models/item';
import { ItemService } from '../../services/item.service';
import { Globals } from '../../assets/globals';

@Component({
  selector: 'app-improvement-card',
  templateUrl: './improvement-card.component.html',
  styleUrls: ['./improvement-card.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ImprovementCardComponent implements OnInit, OnDestroy {
  @Input() improvementType: string;

  public initialItems = initialItems;
  public itemsSub: Subscription;
  public mcpItem: Item;
  public Globals = Globals;

  constructor(
    public improvementService: ImprovementService,
    public itemService: ItemService,
    public utilsService: UtilsService
  ) { }

  ngOnInit(): void {
    this.itemsSub = this.itemService.items$.subscribe((items) => {
      this.mcpItem = items.find(item => item.id === Globals.itemIds.mcp);
    });
  }

  ngOnDestroy() {
    this.itemsSub.unsubscribe();
  }
}
