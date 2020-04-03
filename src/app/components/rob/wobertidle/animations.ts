import {
  trigger,
  state,
  style,
  animate,
  transition
} from '@angular/animations';

export let fade = trigger('fade', [
  // state('void', style({ width: 0 })),
  // transition(':enter, :leave', [
  //   animate(500, style({width: '100%'}))
  // ])
  state('void', style({
    width: 0,
  })),
  state('endAnim', style({
    width: '100%',
  })),
  state('beginAnim', style({
    width: 0,
  })),
  transition('* => endAnim', [
    animate(1500)
  ]),
  transition('* => beginAnim', [
    animate(0)
  ])
]);
