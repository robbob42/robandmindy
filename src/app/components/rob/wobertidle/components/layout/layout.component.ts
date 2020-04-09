import { Component, OnInit } from '@angular/core';
import { MessageService } from '../../services/message.service';
import { Message } from '../../models/message';
import { pulse } from './animations';

@Component({
  selector: 'app-layout',
  templateUrl: './layout.component.html',
  styleUrls: ['./layout.component.scss'],
  animations: [
    pulse
  ]
})
export class LayoutComponent implements OnInit {
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

  constructor(private messageService: MessageService) {
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
          this.alertLeft = `${rect.left - 10}px`;
          this.alertLeftBounce = `${rect.left}px`;
          this.highlightArrow = true;
        }, 10);
      }
      if (latestMessage.triggerId === 1001) {
        setTimeout(() => {
          const rect = document.getElementById('humanDiv').getBoundingClientRect();
          this.alertTop = `${rect.top}px`;
          this.alertLeft = `${rect.left - 10}px`;
          this.alertLeftBounce = `${rect.left}px`;
          this.highlightArrow = true;
        }, 10);
      }
      if (latestMessage.triggerId === 1) {
        this.messagesTop = '19em';
        this.messagesLeft = '11em';
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
