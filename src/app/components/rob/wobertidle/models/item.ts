export class Item {
  id: number;
  name: string;
  icon: string;
  color: string;
  amount: number;
  visible: boolean;

  constructor(options: {
    id: number,
    name: string,
    icon: string,
    color: string,
    amount?: number,
    visible?: boolean,
    }) {
    this.id = options.id;
    this.name = options.name;
    this.icon = options.icon;
    this.color = options.color;
    this.amount = options.amount || 0;
    this.visible = options.visible || false;
  }
}
