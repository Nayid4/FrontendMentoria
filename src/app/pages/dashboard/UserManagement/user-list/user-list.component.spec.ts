import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListaUsuarioComponent } from './user-list.component';

describe('ListaUsuarioComponent', () => {
  let component: ListaUsuarioComponent;
  let fixture: ComponentFixture<ListaUsuarioComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ListaUsuarioComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ListaUsuarioComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
