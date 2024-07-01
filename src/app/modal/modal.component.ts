import { Component, OnDestroy, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';

import { selectGameState } from 'app/state/game.selectors';
import { GameActions } from 'app/state/game.actions';
import { Subscription } from 'rxjs';
import { InitialState } from 'app/state/game.initialState';
//import { GoogleBooksService } from './book-list/books.service';

@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
  styleUrl: './modal.component.css'
})
export class ModalComponent implements OnInit, OnDestroy {

  constructor(private store: Store) {}

  private gameStateSubscription: Subscription = new Subscription();
  
  gameState$ = this.store.select(selectGameState)
  interval_set = -1;
  opacity = 0;
  game_over = InitialState.game_over;
  alien_army_destroyed = InitialState.alien_army_destroyed;
  spaceship_destroyed = InitialState.spaceship_destroyed;

  setint () {
    if(this.interval_set === 1){
      this.store.dispatch(GameActions.newGame())
      return; 
    }
    setInterval(() => this.store.dispatch(GameActions.updateState()), 50);
  }

  ngOnInit() {
    this.gameStateSubscription = this.gameState$.subscribe(gameState => {
      this.interval_set = gameState.interval_set;
      this.opacity = gameState.modal_opacity;
      this.game_over = gameState.game_over;
      this.alien_army_destroyed = gameState.alien_army_destroyed;
      this.spaceship_destroyed = gameState.spaceship_destroyed;
    });
  }

  ngOnDestroy() {
    this.gameStateSubscription.unsubscribe();
  }
}
