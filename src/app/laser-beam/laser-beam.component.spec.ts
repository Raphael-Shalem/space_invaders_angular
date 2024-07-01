import { ComponentFixture, TestBed } from '@angular/core/testing';

import { laserBeamComponent } from './laser-beam.component';

describe('laserBeamComponent', () => {
  let component: laserBeamComponent;
  let fixture: ComponentFixture<laserBeamComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [laserBeamComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(laserBeamComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
