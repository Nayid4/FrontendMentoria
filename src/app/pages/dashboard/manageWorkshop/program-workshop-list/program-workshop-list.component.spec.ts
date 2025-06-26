import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProgramWorkshopListComponent } from './program-workshop-list.component';

describe('ProgramWorkshopListComponent', () => {
  let component: ProgramWorkshopListComponent;
  let fixture: ComponentFixture<ProgramWorkshopListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ProgramWorkshopListComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ProgramWorkshopListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
