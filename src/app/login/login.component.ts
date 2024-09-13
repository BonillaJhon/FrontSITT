import { Component, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { AuthService } from '../auth.service';  // Importa el AuthService

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  @ViewChild('loginForm', { static: false }) loginForm: NgForm | null = null;

  constructor(private http: HttpClient, private router: Router, private authService: AuthService) {}

  login() {
    if (!this.loginForm) {
      return;
    }

    const formData = {
      Email: this.loginForm.value.username,
      Contraseña: this.loginForm.value.password
    };

    this.http.post<any>('https://localhost:7243/api/Auth/login', formData)
      .subscribe(
        response => {
          if (response && response.token) {
            // Guardar el token utilizando el AuthService
            this.authService.setToken(response.token);
            console.log('Token almacenado:', response.token);
            // Navegar al dashboard
            this.router.navigate(['dashboard']);
          } else {
            console.error('Token no encontrado en la respuesta.');
          }
        },
        error => {
          console.error('Error al iniciar sesión:', error);
        }
      );
  }
}
