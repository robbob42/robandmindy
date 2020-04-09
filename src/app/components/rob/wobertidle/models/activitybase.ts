export class Activitybase {
  id: number;
  name: string;
  type: string;
  active: boolean;
  color: string;
  produces: string;
  producesId: number;
  actionTime: string;
  mcProficiency: number;
  mcpTriggerAmount: number;
  trigger: number;
  triggered: boolean;
  mcpDiscoverAmount: number;
  discovered: boolean;
  visible: boolean;

  constructor(options: {
    id: number,
    name: string,
    type?: string,
    active?: boolean,
    color: string,
    produces: string,
    producesId: number,
    actionTime: string,
    mcProficiency?: number,
    mcpTriggerAmount: number,
    trigger?: number,
    triggered: boolean,
    mcpDiscoverAmount: number,
    discovered: boolean,
    visible?: boolean
  }) {
    this.id = options.id;
    this.name = options.name;
    this.type = options.type || '';
    this.active = options.active || false;
    this.color = options.color;
    this.produces = options.produces;
    this.producesId = options.producesId;
    this.actionTime = options.actionTime;
    this.mcProficiency = options.mcProficiency || 1;
    this.mcpTriggerAmount = options.mcpTriggerAmount;
    this.trigger = options.trigger || 0;
    this.triggered = options.triggered;
    this.mcpDiscoverAmount = options.mcpDiscoverAmount;
    this.discovered = options.discovered;
    this.visible = options.visible || false;
  }
}
