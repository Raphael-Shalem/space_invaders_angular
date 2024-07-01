import { createActionGroup, emptyProps, props } from '@ngrx/store';

export const GameActions = createActionGroup({
  source: 'Game',
  events: {
    'Update State': emptyProps(),
    'Key Down': props<{ key : string }>(),
    'Key Up': props<{ key : string }>(),
    'New Game': emptyProps()
  }
});
