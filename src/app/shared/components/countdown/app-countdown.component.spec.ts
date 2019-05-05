import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AppCountdownComponent } from './app-countdown.component';

describe('AppCountdownComponent', () => {
  let component: AppCountdownComponent;
  let fixture: ComponentFixture<AppCountdownComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AppCountdownComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AppCountdownComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
