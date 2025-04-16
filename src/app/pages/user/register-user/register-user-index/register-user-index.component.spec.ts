import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RegisterUserIndexComponent } from './register-user-index.component';

describe('RegisterUserIndexComponent', () => {
  let component: RegisterUserIndexComponent;
  let fixture: ComponentFixture<RegisterUserIndexComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RegisterUserIndexComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RegisterUserIndexComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
