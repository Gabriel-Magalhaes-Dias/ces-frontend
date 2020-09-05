import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RequisitoEstimarComponent } from './requisito-estimar.component';

describe('RequisitoEstimarComponent', () => {
  let component: RequisitoEstimarComponent;
  let fixture: ComponentFixture<RequisitoEstimarComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RequisitoEstimarComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RequisitoEstimarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
