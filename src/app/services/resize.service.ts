import { Injectable, HostListener } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class WindowSizeService {
  private sizeSubject = new BehaviorSubject<[number, number]>([window.innerWidth, window.innerHeight]);
  size$ = this.sizeSubject.asObservable();

  constructor() {
    this.updateSize();
  }

  @HostListener('window:resize', ['$event'])
  onResize(event: Event) {
    this.updateSize();
  }

  private updateSize() {
    this.sizeSubject.next([window.innerWidth, window.innerHeight]);
  }
}