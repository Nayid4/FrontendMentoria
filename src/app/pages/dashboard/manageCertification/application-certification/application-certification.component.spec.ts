import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ApplicationCertificationComponent } from './application-certification.component';

describe('ApplicationCertificationComponent', () => {
  let component: ApplicationCertificationComponent;
  let fixture: ComponentFixture<ApplicationCertificationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ApplicationCertificationComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ApplicationCertificationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
