import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ManageRecognitionLayoutComponent } from './manage-recognition-layout.component';

describe('ManageRecognitionLayoutComponent', () => {
  let component: ManageRecognitionLayoutComponent;
  let fixture: ComponentFixture<ManageRecognitionLayoutComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ManageRecognitionLayoutComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ManageRecognitionLayoutComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
