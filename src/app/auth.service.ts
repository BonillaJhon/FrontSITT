import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private token: string | null = null;

  constructor() { }

  // Guardar el token en el servicio y en localStorage
  setToken(token: string): void {
    this.token = token;
    localStorage.setItem('token', token);
  }

  // Recuperar el token desde el servicio o localStorage
  getToken(): string | null {
    if (!this.token) {
      this.token = localStorage.getItem('token');  // Si no está en memoria, intenta obtenerlo desde localStorage
    }
    return this.token;
  }

  // Limpiar el token tanto del servicio como de localStorage
  clearToken(): void {
    this.token = null;
    localStorage.removeItem('token');
  }
}
