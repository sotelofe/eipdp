import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DetalleOpinionExencionComponent } from './detalle-opinion-exencion.component';

describe('DetalleOpinionExencionComponent', () => {
  let component: DetalleOpinionExencionComponent;
  let fixture: ComponentFixture<DetalleOpinionExencionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DetalleOpinionExencionComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DetalleOpinionExencionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
