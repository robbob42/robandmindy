import { Activity } from '../models/activity';
import { Item } from '../models/item';
import { Improvement } from '../models/improvement';

export class Globals {
  public static winAmt = 20000;
  public static itemIds = {
    mcp: 900,
    human: 901,
    money: 902
  };
  public static visibleAmounts = {
    raw: 0,
    limit: 0,
    speed: 250,
    shop: 150,
    exchange: 1200,
    production: 1200,
    money: 1200,
    refine: 3000,
    powers: 10000,
    humans: 10000,
  };
  public static blankItem: Item = {
    id: 0,
    amount: 0,
    color: '',
    icon: '',
    limit: 0,
    name: '',
    value: 0,
    visible: false
  };
  public static blankActivity: Activity = {
    id: 0,
    type: '',
    name: '',
    active: false,
    color: '',
    produces: '',
    produceAmount: 0,
    producesId: 0,
    actionTime: 0,
    mcpTriggerAmount: 0,
    triggered: false,
    mcpDiscoverAmount: 0,
    discovered: false,
    decrementId: 0,
    decrementAmount: 0,
    mcProficiency: 0,
    trigger: 0,
    visible: false
  };
  public static blankImprovement: Improvement = {
    id: 0,
    costMultiplyer: 0,
    improvee: '',
    improveeId: 0,
    improves: '',
    improvesByMultiplyer: 0,
    itemsCost: [{
      itemId: 0,
      itemAmount: 0
    }],
    level: 0,
    name: '',
    type: ''
  };
}
