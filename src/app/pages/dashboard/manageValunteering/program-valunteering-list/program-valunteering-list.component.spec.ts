import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProgramValunteeringListComponent } from './program-valunteering-list.component';

describe('ProgramValunteeringListComponent', () => {
  let component: ProgramValunteeringListComponent;
  let fixture: ComponentFixture<ProgramValunteeringListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ProgramValunteeringListComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ProgramValunteeringListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
