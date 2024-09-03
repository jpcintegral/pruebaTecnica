import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { HttpService } from '../../../services/http.service';
import { Tienda } from '../../../models/tienda.model';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-tienda-form',
  templateUrl: './tienda-form.component.html',
  styleUrls: ['./tienda-form.component.css']
})
export class TiendaFormComponent implements OnInit {
  tiendaForm: FormGroup;
  tiendas: Tienda[] = [];
  editMode: boolean = false;
  currentTiendaID: number | null = 0;
  displayedColumns: string[] = ['sucursal', 'direccion', 'acciones'];

  constructor(private fb: FormBuilder,
    private httpService: HttpService
  ) {
    this.tiendaForm = this.fb.group({
      sucursal: ['', Validators.required],
      direccion: ['', Validators.required]
    });
  }

  ngOnInit(): void {
    this.loadTiendas();
   }

   loadTiendas(): void {
    this.httpService.getTiendas().subscribe((data: Tienda[]) => {
      this.tiendas = data;       
    });
  }

  submitForm(): void {
    if (this.tiendaForm.valid) {
      this.currentTiendaID = 0;
      const tiendaData: Tienda = { ...this.tiendaForm.value, tiendaID: this.currentTiendaID };

      if (this.editMode && this.currentTiendaID) {
        this.httpService.updateTienda(this.currentTiendaID, tiendaData).subscribe(() => {
          this.loadTiendas();
          this.resetForm();
        });
      } else {
       
        this.httpService.addTienda(tiendaData).subscribe(() => {
          this.loadTiendas();
          this.resetForm();
        });
      }
    }
  }

  editTienda(tienda: Tienda): void {
    this.editMode = true;
    this.currentTiendaID = tienda.tiendaID;
    this.tiendaForm.patchValue(tienda);
  }

  deleteTienda(id: number): void {
    this.httpService.deleteTienda(id).subscribe(() => {
      this.loadTiendas();
    });
  }

  resetForm(): void {
    this.tiendaForm.reset();
    this.editMode = false;
    this.currentTiendaID = null;
  }

}
