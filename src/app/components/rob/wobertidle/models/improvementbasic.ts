import { ImprovementBase } from './improvementbase';

export class Improvementbasic extends ImprovementBase {
  type = 'basic';

  constructor(options: {
    id: number,
    name: string,
    improveeId: number,
    itemsCost: {
      itemId: number,
      itemAmount: number,
    }[],
    costMultiplyer: number,
    improvee: string,
    improves: string,
    improvesBy: number
  }) {
    super(options);
  }
}
