import { Component, OnInit } from '@angular/core';
import { HttpService } from '../../../services/http.service';
import { Articulo } from '../../../models/articulo.model';

@Component({
  selector: 'app-articulo-list',
  templateUrl: './articulo-list.component.html',
  styleUrls: ['./articulo-list.component.css']
})
export class ArticuloListComponent implements OnInit {
  articulos: Articulo[] = [];

  constructor(private httpService: HttpService) { }

  ngOnInit(): void {
    this.httpService.getArticulos().subscribe((data: Articulo[]) => {
      this.articulos = data;
    });
  }

  deleteArticulo(id: number): void {
    this.httpService.deleteArticulo(id).subscribe(() => {
      this.articulos = this.articulos.filter(articulo => articulo.articuloID !== id);
    });
  }
}
