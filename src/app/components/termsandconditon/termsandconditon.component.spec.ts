import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TermsandconditonComponent } from './termsandconditon.component';

describe('TermsandconditonComponent', () => {
  let component: TermsandconditonComponent;
  let fixture: ComponentFixture<TermsandconditonComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [TermsandconditonComponent]
    });
    fixture = TestBed.createComponent(TermsandconditonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
