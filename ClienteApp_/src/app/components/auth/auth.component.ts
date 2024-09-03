import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import { HttpService } from '../../services/http.service'; 

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.css']
})
export class AuthComponent {
  authForm: FormGroup;
  isLoginMode = true;

  constructor(
    private fb: FormBuilder,
    private httpService: HttpService,
    private router: Router,
    private snackBar: MatSnackBar
  ) {
    this.authForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
      nombre: [''],
      apellidos: [''],
      direccion: ['']
    });
  }

  onSubmit() {
    if (this.authForm.valid) {
      const formData = this.authForm.value;
      if (this.isLoginMode) {
        this.httpService.login(formData).subscribe(
          response => {
            localStorage.setItem('token', response.token); 
            if (formData.email === 'admin@gmail.com') {
              localStorage.setItem('isAdmin', 'true');
              this.router.navigate(['/tiendas']).then(() => {
                window.dispatchEvent(new Event('storage'));
              });
            } else {
              localStorage.setItem('isAdmin', 'false');
              this.router.navigate(['/carrito']).then(() => {
                window.dispatchEvent(new Event('storage'));
              });
            }
          },
          error => {
            this.snackBar.open('Datos incorrectos ', 'Close', {
              duration: 3000,
            });
          }
        );
      } else {
        this.httpService.register(formData).subscribe(
          response => {
            localStorage.setItem('token', response.token); // Almacena el token en el localStorage
            localStorage.setItem('isAdmin', 'false');
            this.router.navigate(['/carrito']).then(() => {
              window.dispatchEvent(new Event('storage'));
            });
          },
          error => {
            console.error('Registration failed', error);
            this.snackBar.open('Intenta  de nuevo.', 'Close', {
              duration: 3000,
            });
          }
        );
      }
    }
  }

  switchMode() {
    this.isLoginMode = !this.isLoginMode;
  }
}
