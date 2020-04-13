export class Item {
  id: number;
  name: string;
  icon: string;
  color: string;
  value: number;
  amount: number;
  visible: boolean;

  constructor(options: {
    id: number,
    name: string,
    icon: string,
    color: string,
    value?: number,
    amount?: number,
    visible?: boolean,
    }) {
    this.id = options.id;
    this.name = options.name;
    this.icon = options.icon;
    this.color = options.color;
    this.value = options.value || 0;
    this.amount = options.amount || 0;
    this.visible = options.visible || false;
  }
}
