import { ImprovementBase } from './improvementbase';

export class Improvementbasic extends ImprovementBase {
  type = 'basic';

  constructor(options: {
    id: number,
    name: string,
    activityId: number,
    itemsCost: {
      itemId: number,
      itemAmount: number,
    }[],
    costMultiplyer: number,
    improves: string,
    improvesBy: number
  }) {
    super(options);
  }
}
