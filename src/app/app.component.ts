import { Component, OnDestroy, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';

import { selectGameState } from './state/game.selectors';
import { GameActions } from './state/game.actions';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
})
export class AppComponent implements OnInit, OnDestroy {

  gameState$ = this.store.select(selectGameState)

  constructor(private store: Store) {
    this.handleKeyDown = this.handleKeyDown.bind(this);
    this.handleKeyUp = this.handleKeyUp.bind(this);
  }

  ngOnInit(): void {
    window.addEventListener('keydown', this.handleKeyDown);
    window.addEventListener('keyup', this.handleKeyUp);
  }

  ngOnDestroy(): void {
    window.removeEventListener('keydown', this.handleKeyDown);
    window.removeEventListener('keyup', this.handleKeyUp);
  }

  handleKeyDown(event: KeyboardEvent): void {
    this.store.dispatch(GameActions.keyDown({ key: event.key }))
  }

  handleKeyUp(event: KeyboardEvent): void {
    this.store.dispatch(GameActions.keyUp({ key: event.key }))
  }
}

