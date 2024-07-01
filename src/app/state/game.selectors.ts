import { createFeatureSelector } from '@ngrx/store';
import { IgameState } from './game.model';

export const selectGameState = createFeatureSelector<IgameState>('game');
