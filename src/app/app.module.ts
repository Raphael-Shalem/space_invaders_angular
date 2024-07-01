import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { HttpClientModule } from '@angular/common/http';
import { gameReducer } from './state/game.reducer';
import { StoreModule } from '@ngrx/store';

import { AppComponent } from './app.component';
import { ModalComponent } from './modal/modal.component';
import { AliensComponent } from './aliens/aliens.component';
import { SpaceshipComponent } from './spaceship/spaceship.component';
import { laserBeamComponent } from './laser-beam/laser-beam.component';
import { AlienLaserComponent } from './alien-laser/alien-laser.component';
import { ContainerComponent } from './container/container.component';
import { WindowSizeService } from './services/resize.service';


@NgModule({
  imports: [
    BrowserModule,
    StoreModule.forRoot({ game: gameReducer }),
    HttpClientModule,
  ],
  providers: [WindowSizeService],
  declarations: [AppComponent, AliensComponent, SpaceshipComponent, laserBeamComponent, AlienLaserComponent, ModalComponent, ContainerComponent],
  bootstrap: [AppComponent],
})
export class AppModule {}
