import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OpinionExencionComponent } from './opinion-exencion.component';

describe('OpinionExencionComponent', () => {
  let component: OpinionExencionComponent;
  let fixture: ComponentFixture<OpinionExencionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ OpinionExencionComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(OpinionExencionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
