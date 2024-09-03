import { Component, OnInit } from '@angular/core';
import { HttpService } from '../../../services/http.service';
import { Cliente } from '../../../models/cliente.model';
import { MatDialog } from '@angular/material/dialog';
import { ClienteFormComponent } from '../../cliente-form/cliente-form/cliente-form.component';


@Component({
  selector: 'app-cliente-list',
  templateUrl: './cliente-list.component.html',
  styleUrls: ['./cliente-list.component.css']
})
export class ClienteListComponent implements OnInit {

  clientes: Cliente[] = [];

  constructor(private httpService: HttpService, private dialog: MatDialog) { }

  ngOnInit(): void {
    this.loadClientes();
  }

  loadClientes(): void {
    this.httpService.getClientes().subscribe((data: Cliente[]) => {
      this.clientes = data;
    });
  }

  /*openDialog(cliente?: Cliente): void {
    const dialogRef = this.dialog.open(ClienteFormComponent, {
      width: '400px',
      data: cliente
    });

    dialogRef.afterClosed().subscribe(() => {
      this.loadClientes();
    });
  }*/

  deleteCliente(id: number): void {
    if (confirm('Are you sure you want to delete this client?')) {
      this.httpService.deleteCliente(id).subscribe(() => {
        this.loadClientes();
      });
    }
  }
}
