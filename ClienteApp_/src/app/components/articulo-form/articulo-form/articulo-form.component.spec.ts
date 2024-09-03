import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AriculoFormComponent } from './articulo-form.component';

describe('ArticuloFormComponent', () => {
  let component: ArticuloFormComponent;
  let fixture: ComponentFixture<AriculoFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AriculoFormComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ArticuloFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
