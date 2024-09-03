import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { HttpService } from '../../../services/http.service';
import { Cliente } from '../../../models/cliente.model';

@Component({
  selector: 'app-cliente-form',
  templateUrl: './cliente-form.component.html',
  styleUrls: ['./cliente-form.component.css']
})
export class ClienteFormComponent implements OnInit {
  
  clienteForm: FormGroup = this.fb.group({})

  constructor(private fb: FormBuilder, private httpService: HttpService) { }

  ngOnInit(): void {
    this.clienteForm = this.fb.group({
      nombre: ['', Validators.required],
      apellidos: ['', Validators.required],
      direccion: ['', Validators.required]
    });
  }

  onSubmit(): void {
    if (this.clienteForm && this.clienteForm.valid) {  // Asegúrate de que clienteForm no sea undefined
      const cliente: Cliente = this.clienteForm.value;
      this.httpService.addCliente(cliente).subscribe(response => {
        console.log('Cliente agregado:', response);
      });
    }
  }
}
