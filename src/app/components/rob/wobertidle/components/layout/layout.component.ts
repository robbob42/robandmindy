import { Component, OnInit, AfterViewInit } from '@angular/core';
import { MessageService } from '../../services/message.service';
import { Message } from '../../models/message';
import { pulse } from './animations';
import { ActivityService } from '../../services/activity.service';
import { ItemService } from '../../services/item.service';
import { Activitybasic } from '../../models/activitybasic';
import { UtilsService } from '../../services/utils.service';

@Component({
  selector: 'app-layout',
  templateUrl: './layout.component.html',
  styleUrls: ['./layout.component.scss'],
  animations: [
    pulse
  ]
})
export class LayoutComponent implements OnInit, AfterViewInit {
  public navigation: string;
  public messages: Message[] = [];
  public messagesTop = '-3em';
  public messagesLeft = '24em';
  public alertTop = '9em';
  public alertLeft = '30em';
  public alertLeftBounce = '31em';
  public logVisible = true;
  public advanceStorylineVisible = true;
  public advanceDropdownOpen = false;
  public canSkip = true;
  public highlightArrow = false;
  public basicActivities = [new Activitybasic({
    id: 0,
    name: '',
    active: false,
    color: '',
    produces: '',
    produceAmount: 0,
    producesId: 0,
    actionTime: 0,
    mcpTriggerAmount: 0,
    triggered: false,
    mcpDiscoverAmount: 0,
    discovered: false
  })];
  public inventory;

  constructor(
    private messageService: MessageService,
    private activityService: ActivityService,
    private itemService: ItemService,
    private utilsService: UtilsService
  ) {
    this.messageService.initializeMessages();
    messageService.subscribeMessages().subscribe((subscribedMessages) => {
      this.messages = [];
      for (let i = 0; i < 4; i++) {
        if (typeof subscribedMessages[i] !== 'undefined') {
          this.messages.push(subscribedMessages[i]);
        }
      }
      const latestMessage = subscribedMessages[0];
      if (latestMessage.triggerId === 1000) {
        setTimeout(() => {
          const rect = document.getElementById('mcpDiv').getBoundingClientRect();
          this.alertTop = `${rect.top}px`;
          this.alertLeft = `${rect.left - 20}px`;
          this.alertLeftBounce = `${rect.left - 10}px`;
          this.highlightArrow = true;
        }, 10);
      }
      if (latestMessage.triggerId === 1001) {
        setTimeout(() => {
          const rect = document.getElementById('humanDiv').getBoundingClientRect();
          this.alertTop = `${rect.top}px`;
          this.alertLeft = `${rect.left - 20}px`;
          this.alertLeftBounce = `${rect.left - 10}px`;
          this.highlightArrow = true;
        }, 10);
      }
      if (latestMessage.triggerId === 1) {
        this.messagesTop = '14em';
      }
    });
    messageService.getMessages();

    messageService.subscribeAdvance().subscribe((subscribedAdvanceVis) => {
      this.advanceStorylineVisible = subscribedAdvanceVis;
    });
    messageService.getAdvanceVisible();

  }

  ngOnInit(): void {
    this.navigation = 'home';
    this.activityService.initializeAdvancedActivities();
    this.activityService.initializeBasicImprovements();
    this.utilsService.initialize();

    setTimeout(() => {
      this.activityService.initializeBasicActivities();
      this.activityService.subscribeBasic().subscribe((activities) => {
        this.basicActivities = activities;
      });
      this.itemService.initializeItems();
      this.itemService.subscriber().subscribe((items) => {
        this.inventory = items;
      });
    });
  }

  ngAfterViewInit() {
  }

  setNav(nav) {
    this.navigation = nav;
  }

  advanceStoryline() {
    this.messageService.advanceStoryline();
  }

  showLog() {
    this.logVisible = true;
  }
  hideLog() {
    this.logVisible = false;
  }

  delayHideAlert() {
    setTimeout(() => {
      this.highlightArrow = false;
    }, 2000);
  }

  skipIntro() {
    this.advanceDropdownOpen = false;
    this.logVisible = false;
    if (this.canSkip) {
      this.canSkip = false;
      this.messageService.processTrigger(1);
    }
  }
}
