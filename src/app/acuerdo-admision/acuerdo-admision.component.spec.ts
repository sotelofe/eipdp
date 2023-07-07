import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AcuerdoAdmisionComponent } from './acuerdo-admision.component';

describe('AcuerdoAdmisionComponent', () => {
  let component: AcuerdoAdmisionComponent;
  let fixture: ComponentFixture<AcuerdoAdmisionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AcuerdoAdmisionComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AcuerdoAdmisionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
