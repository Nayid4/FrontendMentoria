import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ManageFollowUpLayoutComponent } from './manage-follow-up-layout.component';

describe('ManageFollowUpLayoutComponent', () => {
  let component: ManageFollowUpLayoutComponent;
  let fixture: ComponentFixture<ManageFollowUpLayoutComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ManageFollowUpLayoutComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ManageFollowUpLayoutComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
