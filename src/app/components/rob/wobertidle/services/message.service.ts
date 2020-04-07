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
    new Message('Well, actually a very weak demigod...'),
    new Message('...'),
    new Message('A very VERY weak demigod.'),
    new Message('Named Wobert.'),
    new Message('To be honest, you only have one power.'),
    new Message('The power to CONTROL THE MINDS OF HUMANS!'),
    new Message('Er, mind.'),
    new Message('Singular.'),
    new Message('You can control the mind of a single human.'),
    new Message('But you can make him do ANYTHING YOU WANT!'),
    new Message('Just kidding, your Mind Control Proficiency(MCP) is at 0.', 1000),
    new Message('That means you can only make him do one thing.'),
    new Message('But you can make him do it AS MUCH AS YOU WANT!'),
    new Message('BWAH HAH HAH!'),
    new Message('But you don\'t have a human yet.'),
    new Message('Better go get one (Just hit \'Next\', that should do the trick).'),
    new Message('Got him!', 1001),
    new Message('Now go take your new mindless human and make him do his one activity.', 1),
    new Message('If you press the \'Start\' button, you\'ll notice you start obtaining materials.'),
    new Message('Isn\'t that nice of that mindless human!'),
    new Message('Also, your Mind Control Proficiency(MCP) will go up by a certain amount each time your mindless human gathers materials.'),
    new Message('That amount is shown next to an activity while it\'s stopped.'),
    new Message('The harder it is to force a human to perform an activity, the more MCP you\'ll gain!'),
    new Message('You\'ll learn more tasks as you gain MCP.  Harder tasks => better reward!'),
    new Message('It\'s now up to you to grow and become THE ULTIMATE DEMIGOD!', 903),
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
  toggleAdvanceOn() {
    this.subAdvanceVisible.next(true);
  }
  toggleAdvanceOff() {
    this.subAdvanceVisible.next(false);
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
        this.activityService.toggleVisible(true, 1, 'basic');
        this.itemService.toggleVisible(true, 1);
        break;
      case 900:
        this.toggleAdvanceOn();
        break;
      case 901:
        this.advanceStoryline();
        this.processTrigger(900);
        break;
      case 903:
        this.toggleAdvanceOff();
        break;
      case 904:
        this.advanceStoryline();
        this.processTrigger(903);
        break;
      default:
        break;
    }
  }
}
