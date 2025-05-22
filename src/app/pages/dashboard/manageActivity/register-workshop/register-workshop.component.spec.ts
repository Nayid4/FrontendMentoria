import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RegisterWorkshopComponent } from './register-workshop.component';

describe('RegisterWorkshopComponent', () => {
  let component: RegisterWorkshopComponent;
  let fixture: ComponentFixture<RegisterWorkshopComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RegisterWorkshopComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RegisterWorkshopComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
