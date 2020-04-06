import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { Message } from '../models/message';
import { ItemService } from './item.service';
import { ActivityService } from './activity.service';

@Injectable({
  providedIn: 'root'
})
export class MessageService {
  private subMessages = new Subject<Message[]>();
  private messages: Message[] = [];
  private advanceVisible = true;
  private subAdvanceVisible = new Subject<boolean>();

  private storyline: Message[] = [
    new Message('In this game, you are a DEMIGOD!'),
    new Message('...'),
    new Message('Well, a very week demigod...'),
    new Message('...'),
    new Message('A very VERY week demigod.'),
    new Message('Actually, you only have one power.'),
    new Message('The power to CONTROL THE MINDS OF HUMANS!'),
    new Message('Er, just mind.'),
    new Message('Singular.'),
    new Message('You can control the mind of a single human.'),
    new Message('But you can make him do ANYTHING YOU WANT!'),
    new Message('Just kidding, you can only make him do one thing.'),
    new Message('But you can make him do it AS MUCH AS YOU WANT!'),
    new Message('BWAH HAH HAH!'),
    new Message('Why don\'t you go ahead and snap up an unsuspecting victim now.', 1),
  ];

  constructor(private itemService: ItemService, private activityService: ActivityService) { }

  subscribeMessages() {
    return this.subMessages;
  }

  subscribeAdvance() {
    return this.subAdvanceVisible;
  }

  getMessages() {
    const messageSetup = [
      {
        text: 'Welcome to Wobert Idle, Wobert!'
      },
    ];

    messageSetup.forEach(message => {
      this.messages.push(new Message(message.text));
    });
    this.subMessages.next(this.messages);
  }

  getAdvanceVisible() {
    this.subAdvanceVisible.next(this.advanceVisible);
  }

  toggleAdvanceVisible() {
    this.advanceVisible = !this.advanceVisible;
    this.subAdvanceVisible.next(this.advanceVisible);
  }

  addMessage(message) {
    this.messages.unshift(new Message(message));
    this.subMessages.next(this.messages);
  }

  advanceStoryline() {
    const nextMessage = this.storyline.shift();
    this.messages.unshift(nextMessage);
    this.subMessages.next(this.messages);

    if (nextMessage.triggerId) {
      this.processTrigger(nextMessage.triggerId);
    }
  }

  processTrigger(triggerId) {
    switch (triggerId) {
      case 1:
        this.toggleAdvanceVisible();
        this.activityService.toggleVisible(1, 'basic');
        this.itemService.toggleVisible(1);
        break;
      default:
        break;
    }
  }
}
