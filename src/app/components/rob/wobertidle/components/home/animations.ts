import {
  trigger,
  state,
  style,
  animate,
  transition
} from '@angular/animations';

export let loadBasic = trigger('loadBasic', [
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
    animate('{{actionTime}}'),
  ],  {params: {actionTime: 1000}})
]);

export let loadAdvanced = trigger('loadAdvanced', [
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
    animate('{{actionTime}}'),
  ],  {params: {actionTime: 1000}})
]);

export let slide = trigger('slide', [
  state('left', style({
    transform: 'translateX(0)',
    marginBottom: '8px'
  })),
  state('right', style({
    color: 'white',
    transform: 'translateX(20px)',
    marginBottom: '8px',
    backgroundColor: '{{activityColor}}'
  }),  {params: {activityColor: 'white'}}),
  transition('left <=> right', [
    animate(70)
  ])
]);
