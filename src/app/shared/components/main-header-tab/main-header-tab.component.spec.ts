import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MainHeaderTabComponent } from './main-header-tab.component';

describe('MainHeaderTabComponent', () => {
  let component: MainHeaderTabComponent;
  let fixture: ComponentFixture<MainHeaderTabComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MainHeaderTabComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MainHeaderTabComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
