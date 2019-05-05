import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EncrptionDecryptionComponent } from './encrption-decryption.component';

describe('EncrptionDecryptionComponent', () => {
  let component: EncrptionDecryptionComponent;
  let fixture: ComponentFixture<EncrptionDecryptionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EncrptionDecryptionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EncrptionDecryptionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
