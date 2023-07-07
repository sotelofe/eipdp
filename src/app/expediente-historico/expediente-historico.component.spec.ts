import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ExpedienteHistoricoComponent } from './expediente-historico.component';

describe('ExpedienteHistoricoComponent', () => {
  let component: ExpedienteHistoricoComponent;
  let fixture: ComponentFixture<ExpedienteHistoricoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ExpedienteHistoricoComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ExpedienteHistoricoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
