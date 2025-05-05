import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PlacedbidComponent } from './placedbid.component';

describe('PlacedbidComponent', () => {
  let component: PlacedbidComponent;
  let fixture: ComponentFixture<PlacedbidComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [PlacedbidComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(PlacedbidComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
