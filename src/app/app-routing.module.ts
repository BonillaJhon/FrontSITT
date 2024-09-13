import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

// Importa los componentes que deseas asociar a las rutas
import { LoginComponent } from './login/login.component';
import { DashboardComponent } from './dashboard/dashboard.component';

const routes: Routes = [
  // Ruta para el componente de inicio de sesión
  { path: 'login', component: LoginComponent },
  // Ruta para el componente del dashboard
  { path: 'dashboard', component: DashboardComponent },
  // Ruta por defecto para redirigir a la página de inicio de sesión si la URL es desconocida
  { path: '', redirectTo: '/login', pathMatch: 'full' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }