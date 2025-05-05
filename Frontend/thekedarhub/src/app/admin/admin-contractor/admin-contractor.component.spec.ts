import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminContractorComponent } from './admin-contractor.component';

describe('AdminContractorComponent', () => {
  let component: AdminContractorComponent;
  let fixture: ComponentFixture<AdminContractorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AdminContractorComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(AdminContractorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
