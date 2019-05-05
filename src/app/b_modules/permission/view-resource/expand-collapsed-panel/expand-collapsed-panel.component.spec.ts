import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ExpandCollapsedPanelComponent } from './expand-collapsed-panel.component';

describe('ExpandCollapsedPanelComponent', () => {
  let component: ExpandCollapsedPanelComponent;
  let fixture: ComponentFixture<ExpandCollapsedPanelComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ExpandCollapsedPanelComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ExpandCollapsedPanelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
