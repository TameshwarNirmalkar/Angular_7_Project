import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RefreshTabComponent } from './refresh-tab.component';

describe('RefreshTabComponent', () => {
  let component: RefreshTabComponent;
  let fixture: ComponentFixture<RefreshTabComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RefreshTabComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RefreshTabComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
