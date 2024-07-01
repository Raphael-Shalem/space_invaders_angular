import { Component, OnDestroy, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { initialState } from 'app/state/game.reducer';
import { selectGameState } from 'app/state/game.selectors';
import { Subscription } from 'rxjs';


@Component({
  selector: 'app-aliens',
  templateUrl: './aliens.component.html',
  styleUrl: './aliens.component.css'
})
export class AliensComponent implements OnInit, OnDestroy {

  constructor(private store: Store) {}

  private gameStateSubscription: Subscription = new Subscription();

  gameState$ = this.store.select(selectGameState)

  alien_army = initialState.alien_army;
  dead_alien = initialState.dead_alien;
  new_army_x = 0;
  new_army_y = 0;
  move_army = '';

  ngOnInit() {
    this.gameStateSubscription = this.gameState$.subscribe(gameState => {
      this.alien_army = gameState.alien_army;
      this.dead_alien = gameState.dead_alien;
      this.new_army_x = gameState.army_position_x// + 616;
      this.new_army_y = gameState.army_position_y//; + 552;
      this.move_army = `translate(${ this.new_army_x }px,${ this.new_army_y}px)`
    });
  }

  ngOnDestroy() {
    this.gameStateSubscription.unsubscribe();
  }
}
