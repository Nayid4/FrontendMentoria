import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ManageBasicLayoutComponent } from './manage-basic-layout.component';

describe('ManageBasicLayoutComponent', () => {
  let component: ManageBasicLayoutComponent;
  let fixture: ComponentFixture<ManageBasicLayoutComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ManageBasicLayoutComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ManageBasicLayoutComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
