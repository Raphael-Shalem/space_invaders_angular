import { Component, OnDestroy, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { initialState } from 'app/state/game.reducer';
import { selectGameState } from 'app/state/game.selectors';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-laser-beam',
  templateUrl: './laser-beam.component.html',
  styleUrl: './laser-beam.component.css'
})
export class laserBeamComponent implements OnInit, OnDestroy {

  constructor(private store: Store) {}

  private gameStateSubscription: Subscription = new Subscription();
  gameState$ = this.store.select(selectGameState)

  transform = "";
  opacity = 0;

  ngOnInit() {
    this.gameStateSubscription = this.gameState$.subscribe(gameState => {

      let laser_x_state = gameState.laser_location_x;
      let laser_x_props = gameState.spaceship_location_x;
      let laser_y = gameState.laser_location_y;
      let shoot_laser = gameState.shoot_laser;
      let transform_laser_not_shot = `translate(${ laser_x_props }px,0)`
      let transform_laser_shot = `translate(${ laser_x_state }px,${ laser_y }px)`
      let opacity_laser_not_shot = 0;
      let opacity_laser__shot = gameState.laser_opacity;

      this.transform = shoot_laser ? transform_laser_shot : transform_laser_not_shot;
      this.opacity = shoot_laser ? opacity_laser__shot : opacity_laser_not_shot;
      
    });
  }

  ngOnDestroy() {
    this.gameStateSubscription.unsubscribe();
  }
}

