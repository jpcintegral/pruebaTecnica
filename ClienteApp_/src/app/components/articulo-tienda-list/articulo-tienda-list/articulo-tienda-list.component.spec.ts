import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ArticuloTiendaListComponent } from './articulo-tienda-list.component';

describe('ArticuloTiendaListComponent', () => {
  let component: ArticuloTiendaListComponent;
  let fixture: ComponentFixture<ArticuloTiendaListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ArticuloTiendaListComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ArticuloTiendaListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
