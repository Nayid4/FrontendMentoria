import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PreposalsComponent } from './preposals.component';

describe('PreposalsComponent', () => {
  let component: PreposalsComponent;
  let fixture: ComponentFixture<PreposalsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PreposalsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PreposalsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
