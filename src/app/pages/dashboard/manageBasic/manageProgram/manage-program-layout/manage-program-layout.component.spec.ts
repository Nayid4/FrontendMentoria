import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ManageProgramLayoutComponent } from './manage-program-layout.component';

describe('ManageProgramLayoutComponent', () => {
  let component: ManageProgramLayoutComponent;
  let fixture: ComponentFixture<ManageProgramLayoutComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ManageProgramLayoutComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ManageProgramLayoutComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
