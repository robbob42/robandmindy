export class Improvement {
  id: number;
  name: string;
  type: string;
  level: number;
  improveeId: number;
  itemsCost: {
    itemId: number,
    itemAmount: number,
  }[];
  costMultiplyer: number;
  improvee: string;
  improves: string;
  improvesByMultiplyer: number;
  improvesByAdder?: number;

  constructor(options: {
    id: number,
    name: string,
    type: string,
    level: number,
    improveeId: number,
    itemsCost: {
      itemId: number,
      itemAmount: number,
    }[],
    costMultiplyer: number,
    improvee: string,
    improves: string,
    improvesByMultiplyer: number,
    improvesByAdder?: number
  }) {
    this.id = options.id;
    this.name = options.name;
    this.type = options.type;
    this.level = options.level;
    this.improveeId = options.improveeId;
    this.itemsCost = options.itemsCost;
    this.costMultiplyer = options.costMultiplyer;
    this.improvee = options.improvee;
    this.improves = options.improves;
    this.improvesByMultiplyer = options.improvesByMultiplyer;
    this.improvesByAdder = options.improvesByAdder || 0;
  }
}
