export class Activitybase {
  id: number;
  name: string;
  type: string;
  active: boolean;
  color: string;
  produces: string;
  actionTime: string;
  mcProficiency: number;
  visible: boolean;

  constructor(options: {
    id: number,
    name: string,
    type?: string,
    active?: boolean,
    color: string,
    produces: string,
    actionTime: string,
    mcProficiency?: number,
    visible?: boolean
  }) {
    this.id = options.id;
    this.name = options.name;
    this.type = options.type || '';
    this.active = options.active || false;
    this.color = options.color;
    this.produces = options.produces;
    this.actionTime = options.actionTime;
    this.mcProficiency = options.mcProficiency || 1;
    this.visible = options.visible || false;
  }
}
