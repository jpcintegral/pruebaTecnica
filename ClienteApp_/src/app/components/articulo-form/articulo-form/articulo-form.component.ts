import { Component, OnInit, ChangeDetectorRef  } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { HttpService } from '../../../services/http.service';
import { Articulo } from '../../../models/articulo.model';
import { Tienda } from '../../../models/tienda.model';

@Component({
  selector: 'app-articulo-form',
  templateUrl: './articulo-form.component.html',
  styleUrls: ['./articulo-form.component.css']
})
export class ArticuloFormComponent implements OnInit {
  articuloForm!: FormGroup;
  articulos: Articulo[] = [];
  tiendas: Tienda[] = [];
  editMode = false;
  currentArticuloID: number | null = 0;
  selectedImage: File | null = null;
  displayedColumns: string[] = ['codigo', 'descripcion', 'precio', 'stock', 'imagen', 'tienda', 'actions'];
  constructor(private fb: FormBuilder, private httpService: HttpService, private cdr: ChangeDetectorRef) { }

  ngOnInit(): void {
    this.initForm();
    this.loadArticulos();
    this.loadTiendas();
  }

  initForm(): void {
    this.articuloForm = this.fb.group({
      codigo: ['', Validators.required],
      descripcion: ['', Validators.required],
      precio: ['', [Validators.required, Validators.pattern('^[0-9]*$')]],
      imagen: [''],
      stock: ['', [Validators.required, Validators.pattern('^[0-9]*$')]],
      tiendaID: [ '', Validators.required]
    });
  }

  loadArticulos(): void {
    this.httpService.getArticulos().subscribe(data => {
     console.log(data);         
      this.articulos = data;
    });
  }

  loadTiendas(): void {
    this.httpService.getTiendas().subscribe(
      (data: Tienda[]) => {
        console.log('Tiendas cargadas:', data); 
        this.tiendas = data;;
        this.cdr.detectChanges()
      },
      error => {
        console.error('Error al cargar tiendas:', error); 
      }
    );
  }
  onFileChange(event: any): void {
    const file = event.target.files[0];
    if (file) {
      this.selectedImage = file;
    }
  }


  submitForm(): void {
    if (this.articuloForm.invalid) {
      return;
    }

    const formData = new FormData();
    formData.append('codigo', this.articuloForm.get('codigo')?.value);
    formData.append('descripcion', this.articuloForm.get('descripcion')?.value);
    formData.append('precio', this.articuloForm.get('precio')?.value);
    formData.append('stock', this.articuloForm.get('stock')?.value);
    formData.append('tiendaID', this.articuloForm.get('tiendaID')?.value);

    if (this.selectedImage) {
      formData.append('imagen', this.selectedImage);
    }

    if (this.editMode) {
      this.httpService.updateArticulo(this.currentArticuloID!, formData).subscribe(() => {
        this.resetForm();
        this.loadArticulos();
      });
    } else {
      this.httpService.addArticulo(formData).subscribe(() => {
        this.resetForm();
        this.loadArticulos();
      });
    }
  }

  editArticulo(articulo: Articulo): void {
    this.currentArticuloID = articulo.articuloID;
    this.editMode = true;
    this.articuloForm.patchValue(articulo);
  }

  deleteArticulo(articuloID: number): void {
    this.httpService.deleteArticulo(articuloID).subscribe(() => {
      this.loadArticulos();
    });
  }

  resetForm(): void {
    this.articuloForm.reset();
    this.editMode = false;
    this.currentArticuloID = null;
  }

}
