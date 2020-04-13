import { Activitybase } from './activitybase';

export class Activityadvanced extends Activitybase {
  type = 'advanced';
  produceAmount: number;
  decrements: string;
  decrementsAmount: number;

  constructor(options: {
    id: number,
    name: string,
    active?: boolean,
    color: string,
    produces: string,
    producesId: number,
    produceAmount: number;
    actionTime: number,
    mcProficiency?: number,
    mcpTriggerAmount: number,
    triggered: boolean,
    mcpDiscoverAmount: number,
    discovered: boolean,
    decrements: string,
    decrementAmount: number
  }) {
    super(options);
    this.produceAmount = options.produceAmount;
    this.decrements = options.decrements;
    this.decrementsAmount = options.decrementAmount;
  }
}
