import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GenerarAdmisionComponent } from './generar-admision.component';

describe('GenerarAdmisionComponent', () => {
  let component: GenerarAdmisionComponent;
  let fixture: ComponentFixture<GenerarAdmisionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GenerarAdmisionComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(GenerarAdmisionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
