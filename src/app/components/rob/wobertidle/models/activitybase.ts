export class Activitybase {
  id: number;
  name: string;
  active: boolean;
  color: string;
  produces: string;
  actionTime: string;

  constructor(options: {
    id: number,
    name: string,
    active?: boolean,
    color: string,
    produces: string,
    actionTime: string
  }) {
    this.id = options.id;
    this.name = options.name;
    this.active = options.active || false;
    this.color = options.color;
    this.produces = options.produces;
    this.actionTime = options.actionTime;
  }
}
