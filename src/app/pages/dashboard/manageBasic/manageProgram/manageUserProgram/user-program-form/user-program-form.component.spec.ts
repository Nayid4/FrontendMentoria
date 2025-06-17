import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UserProgramFormComponent } from './user-program-form.component';

describe('UserProgramFormComponent', () => {
  let component: UserProgramFormComponent;
  let fixture: ComponentFixture<UserProgramFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [UserProgramFormComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UserProgramFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
