export class ImprovementBase {
  id: number;
  name: string;
  activityId: number;
  itemsCost: {
    itemId: number,
    itemAmount: number,
  }[];
  costMultiplyer: number;
  improves: string;
  improvesBy: number;

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
    this.id = options.id;
    this.name = options.name;
    this.activityId = options.activityId;
    this.itemsCost = options.itemsCost;
    this.costMultiplyer = options.costMultiplyer;
    this.improves = options.improves;
    this.improvesBy = options.improvesBy;
  }
}
