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
    new Message('Well, a very weak demigod...'),
    new Message('...'),
    new Message('A very VERY weak demigod.'),
    new Message('Actually, you only have one power.'),
    new Message('The power to CONTROL THE MINDS OF HUMANS!'),
    new Message('Er, just mind.'),
    new Message('Singular.'),
    new Message('You can control the mind of a single human.'),
    new Message('But you can make him do ANYTHING YOU WANT!'),
    new Message('Just kidding, your Mind Control Proficiency(MCP) is at 0.'),
    new Message('That means you can only make him do one thing.'),
    new Message('But you can make him do it AS MUCH AS YOU WANT!'),
    new Message('BWAH HAH HAH!'),
    new Message('Go take your new mindless human and make him do his one activity.', 1),
    new Message('Hmmm.'),
    new Message('Although initially entertaining, you soon grow bored of watching your human do just one thing.'),
    new Message(`Perhaps if you get your MCP up to 30,
      you'll have gained enough knowledge to force your human to do something else!`, 900),
    new Message(`You did it! Now that your MCP is at 30,
      you should be able to get that human to do something new. Try to collect some of this new thing. END GAME FOR NOW...`, 2),
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
        this.activityService.toggleVisible(1, 'basic');
        this.itemService.toggleVisible(1);
        this.processTrigger(900);
        break;
      case 2:
        this.activityService.toggleVisible(2, 'basic');
        this.itemService.toggleVisible(2);
        this.processTrigger(900);
        break;
      case 900:
        this.toggleAdvanceVisible();
        break;
      case 901:
        this.advanceStoryline();
        this.processTrigger(900);
        break;
      default:
        break;
    }
  }
}
