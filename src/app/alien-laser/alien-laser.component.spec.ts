import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AlienLaserComponent } from './alien-laser.component';

describe('AlienLaserComponent', () => {
  let component: AlienLaserComponent;
  let fixture: ComponentFixture<AlienLaserComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AlienLaserComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(AlienLaserComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
