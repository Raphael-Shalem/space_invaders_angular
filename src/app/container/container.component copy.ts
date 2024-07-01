import { Component, OnInit, OnDestroy } from '@angular/core';

import { fromEvent, Subscription } from 'rxjs';

@Component({
   selector: 'app-container',
   templateUrl: './container.component.html',
   styleUrl: './container.component.css'
})

export class ContainerComponent implements OnInit, OnDestroy {
  translate: string = "";
  resizeSubscription: Subscription;

  constructor() {
   
    this.resizeSubscription = fromEvent(window, 'resize')
      .subscribe(() => console.log(window.innerHeight));

  }

  ngOnInit(): void {
    
  }

  ngOnDestroy(): void {
    if (this.resizeSubscription) {
      this.resizeSubscription.unsubscribe();
    }
  }
}

