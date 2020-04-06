import { Activitybase } from './activitybase';

export class Activitybasic extends Activitybase {
  type = 'basic';

  constructor(options: {
    id: number,
    name: string,
    active?: boolean,
    color: string,
    produces: string,
    actionTime: string
  }) {
    super(options);
  }
}
