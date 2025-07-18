import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProgramFormComponent } from './program-form.component';

describe('ProgramFormComponent', () => {
  let component: ProgramFormComponent;
  let fixture: ComponentFixture<ProgramFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ProgramFormComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ProgramFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
