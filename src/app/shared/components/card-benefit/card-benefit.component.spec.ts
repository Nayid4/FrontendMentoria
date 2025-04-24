import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CardBenefitComponent } from './card-benefit.component';

describe('CardBenefitComponent', () => {
  let component: CardBenefitComponent;
  let fixture: ComponentFixture<CardBenefitComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CardBenefitComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CardBenefitComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
