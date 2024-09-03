import { Component, OnInit } from '@angular/core';
import { HttpService } from '../../../services/http.service';
import { Tienda } from '../../../models/tienda.model';

@Component({
  selector: 'app-tienda-list',
  templateUrl: './tienda-list.component.html',
  styleUrls: ['./tienda-list.component.css']
})
export class TiendaListComponent implements OnInit {
  tiendas: Tienda[] = [];

  constructor(private httpService: HttpService) { }

  ngOnInit(): void {
    this.httpService.getTiendas().subscribe((data: Tienda[]) => {
      this.tiendas = data;
    });
  }

  deleteTienda(id: number): void {
    this.httpService.deleteTienda(id).subscribe(() => {
      this.tiendas = this.tiendas.filter(tienda => tienda.tiendaID !== id);
    });
  }
}
