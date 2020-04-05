import { Activitybase } from './activitybase';

export class Activityadvanced extends Activitybase {
  produceAmount: number;
  decrements: string;
  decrementsAmount: number;

  constructor(options: {
    id: number,
    name: string,
    active?: boolean,
    color: string,
    produces: string,
    actionTime: string,
    produceAmount: number,
    decrements: string,
    decrementAmount: number
  }) {
    super(options);
    this.produceAmount = options.produceAmount;
    this.decrements = options.decrements;
    this.decrementsAmount = options.decrementAmount;
  }
}
