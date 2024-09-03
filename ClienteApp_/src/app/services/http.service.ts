import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Cliente } from  '../models/cliente.model';
import { Tienda } from '../models/tienda.model';
import { Articulo } from '../models/articulo.model';
import { ArticuloTienda } from '../models/articuloTienda.model';
import { Carrito } from '../models/carrito.model';

@Injectable({
  providedIn: 'root'
})
export class HttpService {

  private apiUrl = 'https://localhost:7292/api'; // Ajusta la URL base según tu configuración

  constructor(private http: HttpClient) { }

  // Métodos para Cliente
  getClientes(): Observable<Cliente[]> {
    return this.http.get<Cliente[]>(`${this.apiUrl}/clientes`);
  }

  getCliente(id: number): Observable<Cliente> {
    return this.http.get<Cliente>(`${this.apiUrl}/clientes/${id}`);
  }

  addCliente(cliente: Cliente): Observable<Cliente> {
    return this.http.post<Cliente>(`${this.apiUrl}/clientes`, cliente);
  }

  updateCliente(id: number, cliente: Cliente): Observable<Cliente> {
    return this.http.put<Cliente>(`${this.apiUrl}/clientes/${id}`, cliente);
  }

  deleteCliente(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/clientes/${id}`);
  }

  // Métodos para Tienda
  getTiendas(): Observable<Tienda[]> {
    return this.http.get<Tienda[]>(`${this.apiUrl}/tienda`);
  }

  getTienda(id: number): Observable<Tienda> {
    return this.http.get<Tienda>(`${this.apiUrl}/tienda/${id}`);
  }

  addTienda(tienda: Tienda): Observable<Tienda> {
    return this.http.post<Tienda>(`${this.apiUrl}/tienda`, tienda);
  }

  updateTienda(id: number, tienda: Tienda): Observable<Tienda> {
    return this.http.put<Tienda>(`${this.apiUrl}/tienda/${id}`, tienda);
  }

  deleteTienda(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/tienda/${id}`);
  }

  // Métodos para Articulo
  getArticulos(): Observable<Articulo[]> {
    return this.http.get<Articulo[]>(`${this.apiUrl}/articulo`);
  }

  getArticulo(id: number): Observable<Articulo> {
    return this.http.get<Articulo>(`${this.apiUrl}/articulo/${id}`);
  }
/*
  addArticulo(articulo: Articulo): Observable<Articulo> {
    return this.http.post<Articulo>(`${this.apiUrl}/articulo`, articulo);
  }
    */
  addArticulo(articulo: FormData): Observable<any> {
    return this.http.post(`${this.apiUrl}/articulo`, articulo);
  }

  updateArticulo(id: number, articulo: FormData): Observable<any> {
    return this.http.put(`${this.apiUrl}/articulo/${id}`, articulo);
  }

  deleteArticulo(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/articulo/${id}`);
  }

  // Métodos para ArticuloTienda
  getArticuloTiendas(): Observable<ArticuloTienda[]> {
    return this.http.get<ArticuloTienda[]>(`${this.apiUrl}/articuloTienda`);
  }

  getArticuloTienda(id: number): Observable<ArticuloTienda> {
    return this.http.get<ArticuloTienda>(`${this.apiUrl}/articuloTienda/${id}`);
  }


  addArticuloTienda(articuloTienda: ArticuloTienda): Observable<ArticuloTienda> {
    return this.http.post<ArticuloTienda>(`${this.apiUrl}/articuloTienda`, articuloTienda);
  }

   updateArticuloTienda(id: number, articuloTienda: ArticuloTienda): Observable<ArticuloTienda> {
    return this.http.put<ArticuloTienda>(`${this.apiUrl}/articuloTienda/${id}`, articuloTienda);
  }

  deleteArticuloTienda(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/articuloTienda/${id}`);
  }

  
  // Obtener el carrito de un cliente
  getCarrito(clienteId: number): Observable<Carrito> {
    return this.http.get<Carrito>(`${this.apiUrl}/Carrito/${clienteId}`);
  }


  // Agregar un artículo al carrito
  addItemToCarrito(clienteId: number, articuloId: number, cantidad: number): Observable<void> {
    const requestBody = { clienteId, articuloId, cantidad };
    return this.http.post<void>(`${this.apiUrl}/Carrito/add`, requestBody);
  }

  // Eliminar un artículo del carrito
  removeItemFromCarrito(clienteId: number, articuloId: number): Observable<void> {
    return this.http.post<void>(`${this.apiUrl}/Carrito/remove`, { clienteId, articuloId });
  }

  register(data: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/auth/register`, data);
  }
  
  login(data: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/auth/login`, data);
  }
}
