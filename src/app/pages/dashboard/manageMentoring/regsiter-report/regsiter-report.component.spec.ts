import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RegsiterReportComponent } from './regsiter-report.component';

describe('RegsiterReportComponent', () => {
  let component: RegsiterReportComponent;
  let fixture: ComponentFixture<RegsiterReportComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RegsiterReportComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RegsiterReportComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
