import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CardProcessComponent } from './card-process.component';

describe('CardProcessComponent', () => {
  let component: CardProcessComponent;
  let fixture: ComponentFixture<CardProcessComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CardProcessComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CardProcessComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
