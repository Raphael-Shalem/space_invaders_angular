import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { initialState } from 'app/state/game.reducer';
import { selectGameState } from 'app/state/game.selectors';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-alien-laser',
  templateUrl: './alien-laser.component.html',
  styleUrl: './alien-laser.component.css'
})
export class AlienLaserComponent implements OnInit, OnDestroy {
  @Input() id: number = 0;

  constructor(private store: Store) {
   // this.ind = ind
  }



  private gameStateSubscription: Subscription = new Subscription();
  gameState$ = this.store.select(selectGameState)

  transform = "";
  opacity = 0;

  ngOnInit() {
    this.gameStateSubscription = this.gameState$.subscribe(gameState => {

      const styles = [
        { opacity: gameState.obj0.opacity, transform:`translate(${gameState.obj0.pos['x']}px,${gameState.obj0.pos['y']}px)` },
        { opacity: gameState.obj1.opacity, transform:`translate(${gameState.obj1.pos['x']}px,${gameState.obj1.pos['y']}px)` },
        { opacity: gameState.obj2.opacity, transform:`translate(${gameState.obj2.pos['x']}px,${gameState.obj2.pos['y']}px)` },
        { opacity: gameState.obj3.opacity, transform:`translate(${gameState.obj3.pos['x']}px,${gameState.obj3.pos['y']}px)` }
      ];

      this.transform = styles[this.id].transform;
      this.opacity = styles[this.id].opacity;
      
    });
  }

  ngOnDestroy() {
    this.gameStateSubscription.unsubscribe();
  }

}
