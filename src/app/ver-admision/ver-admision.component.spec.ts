import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VerAdmisionComponent } from './ver-admision.component';

describe('VerAdmisionComponent', () => {
  let component: VerAdmisionComponent;
  let fixture: ComponentFixture<VerAdmisionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ VerAdmisionComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(VerAdmisionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
