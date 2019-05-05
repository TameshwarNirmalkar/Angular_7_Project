import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CommonMenuTabsComponent } from './common-menu-tabs.component';

describe('CommonMenuTabsComponent', () => {
  let component: CommonMenuTabsComponent;
  let fixture: ComponentFixture<CommonMenuTabsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CommonMenuTabsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CommonMenuTabsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
