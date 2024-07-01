import { Component, OnInit, OnDestroy } from '@angular/core';
import { minScreenHeight, minScreenWidth } from 'app/constants';

import { fromEvent, Subscription } from 'rxjs';

@Component({
   selector: 'app-container',
   templateUrl: './container.component.html',
   styleUrl: './container.component.css'
})

export class ContainerComponent implements OnInit, OnDestroy {
  smallScreen: boolean = window.innerHeight < minScreenHeight || window.innerWidth < minScreenWidth;
  resizeSubscription: Subscription;

  constructor() {
    this.resizeSubscription = fromEvent(window, 'resize')
      .subscribe(() => {
         if (window.innerHeight < minScreenHeight || window.innerWidth < minScreenWidth) {
          console.log('small')
            this.smallScreen = true;
         }
         else {
            this.smallScreen = false;
         }
      });
  }

  ngOnInit(): void {
     console.log('this.smallScreen : ',this.smallScreen)
  }

  ngOnDestroy(): void {
    if (this.resizeSubscription) {
      this.resizeSubscription.unsubscribe();
    }
  }
}

