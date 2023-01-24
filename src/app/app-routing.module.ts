import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'login',
    pathMatch: 'full'
  },
  {
    path: 'login',
    loadChildren: () => import('./pages/login/login.module').then( m => m.LoginPageModule)
  },
  {
    path: 'registro',
    loadChildren: () => import('./pages/movil/registro/registro.module').then( m => m.RegistroPageModule)
  },
  {
    path: 'perfil-dermatologico',
    loadChildren: () => import('./pages/movil/perfil-dermatologico/perfil-dermatologico.module').then( m => m.PerfilDermatologicoModule)
  },
  {
    path: 'inicio',
    loadChildren: () => import('./pages/inicio/inicio.module').then( m => m.InicioPageModule)
  },
  {
    path: 'crear-consulta',
    loadChildren: () => import('./pages/movil/crear-consulta/crear-consulta.module').then( m => m.CrearConsultaPageModule)
  },
  {
    path: 'test',
    loadChildren: () => import('./pages/test/test.module').then( m => m.TestPageModule)
  },
  {
    path: 'cuerpo',
    loadChildren: () => import('./pages/movil/cuerpo/cuerpo.module').then( m => m.CuerpoPageModule)
  },
  {
    path: 'consultas',
    loadChildren: () => import('./pages/consultas/consultas.module').then( m => m.ConsultasPageModule)
  },
  {
    path: 'resultado-consulta',
    loadChildren: () => import('./pages/movil/resultado-consulta/resultado-consulta.module').then( m => m.ResultadoConsultaPageModule)
  },
  {
    path: 'detalle-consulta',
    loadChildren: () => import('./pages/detalle-consulta/detalle-consulta.module').then( m => m.DetalleConsultaPageModule)
  },
  {
    path: 'notificaciones',
    loadChildren: () => import('./pages/movil/notificaciones/notificaciones.module').then( m => m.NotificacionesPageModule)
  },
  {
    path: 'registro-medico',
    loadChildren: () => import('./pages/web/registro-medico/registro-medico.module').then( m => m.RegistroMedicoPageModule)
  },
  {
    path: 'casos-medicos',
    loadChildren: () => import('./pages/web/casos-medicos/casos-medicos.module').then( m => m.CasosMedicosPageModule)
  },
  {
    path: 'historias-clinicas',
    loadChildren: () => import('./pages/web/historias-clinicas/historias-clinicas.module').then( m => m.HistoriasClinicasPageModule)
  },
  {
    path: 'reportes',
    loadChildren: () => import('./pages/web/reportes/reportes.module').then( m => m.ReportesPageModule)
  }
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}
