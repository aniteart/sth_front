import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DepatmentsComponent } from './depatments.component';

describe('DepatmentsComponent', () => {
  let component: DepatmentsComponent;
  let fixture: ComponentFixture<DepatmentsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DepatmentsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DepatmentsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
