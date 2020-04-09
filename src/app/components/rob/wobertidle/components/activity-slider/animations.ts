import {
  trigger,
  state,
  style,
  animate,
  transition
} from '@angular/animations';

export let activityLoader = trigger('activityLoader', [
  state('void', style({
    width: 0,
  })),
  state('endAnim', style({
    width: '100%',
  })),
  state('beginAnim', style({
    width: 0,
  })),
  transition('* => beginAnim', [
    animate(0)
  ]),
  transition('* => endAnim', [
    animate('{{actionTime}}ms'),
  ],  {params: {actionTime: 1000}})
]);
