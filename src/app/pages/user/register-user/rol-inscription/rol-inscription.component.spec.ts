import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RolInscriptionComponent } from './rol-inscription.component';

describe('RolInscriptionComponent', () => {
  let component: RolInscriptionComponent;
  let fixture: ComponentFixture<RolInscriptionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RolInscriptionComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RolInscriptionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
