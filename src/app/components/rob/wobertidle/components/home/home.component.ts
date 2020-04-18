import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { ItemService } from '../../services/item.service';
import { ControlService } from '../../services/control.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class HomeComponent implements OnInit {

  constructor(
    public itemService: ItemService,
    public controlService: ControlService
  ) {
  }

  ngOnInit() { }

}
