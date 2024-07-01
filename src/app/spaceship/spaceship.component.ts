import { Component, OnDestroy, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { initialState } from 'app/state/game.reducer';
import { selectGameState } from 'app/state/game.selectors';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-spaceship',
  templateUrl: './spaceship.component.html',
  styleUrl: './spaceship.component.css'
})
export class SpaceshipComponent implements OnInit, OnDestroy {

  constructor(private store: Store) {}

  private gameStateSubscription: Subscription = new Subscription();
  gameState$ = this.store.select(selectGameState)

  spaceship_destroyed = initialState.spaceship_destroyed;
  transform = '';

  ngOnInit() {
    this.gameStateSubscription = this.gameState$.subscribe(gameState => {
      this.spaceship_destroyed = gameState.spaceship_destroyed;
      this.transform = `translate(${ gameState.spaceship_location_x }px,0)`
    });
  }

  ngOnDestroy() {
    this.gameStateSubscription.unsubscribe();
  }
}
