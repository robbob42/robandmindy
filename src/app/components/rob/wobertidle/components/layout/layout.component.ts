import { Component, OnInit } from '@angular/core';
import { MessageService } from '../../services/message.service';
import { Message } from '../../models/message';

@Component({
  selector: 'app-layout',
  templateUrl: './layout.component.html',
  styleUrls: ['./layout.component.scss']
})
export class LayoutComponent implements OnInit {
  public navigation: string;
  public messages: Message[] = [];
  public alertTop = '-3em';
  public alertLeft = '24em';
  public logVisible = true;
  public advanceStorylineVisible = true;
  public advanceDropdownOpen = false;
  public canSkip = true;

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
        this.alertTop = '9em';
        this.alertLeft = '30em';
      }
      if (latestMessage.triggerId === 1001) {
        this.alertTop = '12em';
        this.alertLeft = '30em';
      }
      if (latestMessage.triggerId === 1) {
        this.alertTop = '16em';
        this.alertLeft = '11em';
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

  skipIntro() {
    this.advanceDropdownOpen = false;
    this.logVisible = false;
    if (this.canSkip) {
      this.canSkip = false;
      this.messageService.processTrigger(1);
    }
  }
}
