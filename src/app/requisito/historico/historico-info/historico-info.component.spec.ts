import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HistoricoInfoComponent } from './historico-info.component';

describe('HistoricoInfoComponent', () => {
  let component: HistoricoInfoComponent;
  let fixture: ComponentFixture<HistoricoInfoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HistoricoInfoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HistoricoInfoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
