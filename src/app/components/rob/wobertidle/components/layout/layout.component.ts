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

  constructor(messageService: MessageService) {
    messageService.subscribeMessages().subscribe((subscribedMessages) => {
      this.messages = [];
      for (let i = 0; i < 3; i++) {
        if (typeof subscribedMessages[i] !== 'undefined') {
          this.messages.push(subscribedMessages[i]);
        }
      }
    });
    messageService.getMessages();
  }

  ngOnInit(): void {
    this.navigation = 'home';
  }

  setNav(nav) {
    this.navigation = nav;
  }

}
