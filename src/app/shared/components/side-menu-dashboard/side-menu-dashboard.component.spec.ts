import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SideMenuDashboardComponent } from './side-menu-dashboard.component';

describe('SideMenuDashboardComponent', () => {
  let component: SideMenuDashboardComponent;
  let fixture: ComponentFixture<SideMenuDashboardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SideMenuDashboardComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SideMenuDashboardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
