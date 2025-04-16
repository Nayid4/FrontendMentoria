import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ResumeInformationComponent } from './resume-information.component';

describe('ResumeInformationComponent', () => {
  let component: ResumeInformationComponent;
  let fixture: ComponentFixture<ResumeInformationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ResumeInformationComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ResumeInformationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
