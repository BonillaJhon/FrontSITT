import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { AuthService } from '../auth.service';  // Importa el AuthService

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  tareas: any[] = [];
  token: string | null = null;
  userProfile: any = null;  // Información del perfil de usuario

  constructor(private http: HttpClient, private authService: AuthService) {}

  ngOnInit(): void {
    this.token = this.authService.getToken();  // Recupera el token desde el AuthService
    if (this.token) {
      this.obtenerTareas();  // Solo se ejecuta si el token está disponible
      this.obtenerPerfilUsuario();  // Obtener la información del perfil
    } else {
      console.error('Token no encontrado.');
    }
  }

  obtenerTareas(): void {
    if (!this.token) {
      console.error('El token es nulo.');
      return;
    }

    const headers = new HttpHeaders({
      'Authorization': `Bearer ${this.token}`
    });

    this.http.get<any[]>('https://localhost:7243/api/Tareas/get-tareas', { headers })
      .subscribe(
        (data: any[]) => {
          this.tareas = data;
        },
        error => {
          console.error('Error al obtener tareas:', error);
        }
      );
  }

  agregarTarea(nombre: string, descripcion: string): void {
    if (!this.token) {
      console.error('El token es nulo.');
      return;
    }

    const headers = new HttpHeaders({
      'Authorization': `Bearer ${this.token}`,
      'Content-Type': 'application/json'
    });

    const nuevaTarea = {
      nombre: nombre,
      descripcion: descripcion,
      completado: false,
      userId: 1,  
      usuario: {
        id: 1,  
        nombre: 'string',
        email: 'user@example.com',
        contraseña: 'string'
      }
    };

    this.http.post('https://localhost:7243/api/Tareas/crear-tarea', nuevaTarea, { headers })
      .subscribe(
        response => {
          this.obtenerTareas();  // Refrescar la lista de tareas
        },
        error => {
          console.error('Error al crear tarea:', error);
        }
      );
  }

  eliminarTarea(tareaId: number): void {
    if (!this.token) {
      console.error('El token es nulo.');
      return;
    }

    const headers = new HttpHeaders({
      'Authorization': `Bearer ${this.token}`
    });

    this.http.delete(`https://localhost:7243/api/Tareas/eliminar-tarea/${tareaId}`, { headers })
      .subscribe(
        response => {
          this.obtenerTareas(); 
        },
        error => {
          console.error('Error al eliminar tarea:', error);
        }
      );
  }

  obtenerPerfilUsuario(): void {
    if (!this.token) {
      console.error('El token es nulo.');
      return;
    }

    const headers = new HttpHeaders({
      'Authorization': `Bearer ${this.token}`
    });

    this.http.get<any>('https://localhost:7243/api/usuario/perfil', { headers })
      .subscribe(
        (data: any) => {
          this.userProfile = data;
        },
        error => {
          console.error('Error al obtener perfil del usuario:', error);
        }
      );
  }
}
