import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UserProgramListComponent } from './user-program-list.component';

describe('UserProgramListComponent', () => {
  let component: UserProgramListComponent;
  let fixture: ComponentFixture<UserProgramListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [UserProgramListComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UserProgramListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
