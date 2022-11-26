import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'login',
    pathMatch: 'full'
  },
  {
    path: 'folder/:id',
    loadChildren: () => import('./folder/folder.module').then( m => m.FolderPageModule)
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
    path: 'perfil-paso1',
    loadChildren: () => import('./pages/movil/perfil-paso1/perfil-paso1.module').then( m => m.PerfilPaso1PageModule)
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
    loadChildren: () => import('./pages/movil/consultas/consultas.module').then( m => m.ConsultasPageModule)
  },
  {
    path: 'resultado-consulta',
    loadChildren: () => import('./pages/movil/resultado-consulta/resultado-consulta.module').then( m => m.ResultadoConsultaPageModule)
  },
  {
    path: 'detalle-consulta',
    loadChildren: () => import('./pages/movil/detalle-consulta/detalle-consulta.module').then( m => m.DetalleConsultaPageModule)
  },
  {
    path: 'notificaciones',
    loadChildren: () => import('./pages/movil/notificaciones/notificaciones.module').then( m => m.NotificacionesPageModule)
  }
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}
