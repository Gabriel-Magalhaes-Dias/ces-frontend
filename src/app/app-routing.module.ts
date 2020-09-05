import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './auth/auth.guard';


const routes: Routes = [
  {
    path: 'administradores',
    canActivate: [AuthGuard],
    loadChildren: () => import('./administrador/administrador.module').then(m => m.AdministradorModule)
  },
  {
    path: 'projetos',
    canActivate: [AuthGuard],
    loadChildren: () => import('./projeto/projeto.module').then(m => m.ProjetoModule)
  },
  {
    path: 'backlog',
    canActivate: [AuthGuard],
    loadChildren: () => import('./backlog/backlog.module').then(m => m.BacklogModule)
  },
  {
    path: 'requisito',
    canActivate: [AuthGuard],
    loadChildren: () => import('./requisito/requisito.module').then(m => m.RequisitoModule)
  },
  {
    path: 'sprints',
    canActivate: [AuthGuard],
    loadChildren: () => import('./sprint/sprint.module').then(m => m.SprintModule)
  },
  {
    path: 'usuarios',
    canActivate: [AuthGuard],
    loadChildren: () => import('./usuario/usuario.module').then(m => m.UsuarioModule)
  },
  {
    path: '',
    redirectTo: 'projetos',
    pathMatch: 'full'
  },
  {
    path: '**',
    redirectTo: 'projetos',
    pathMatch: 'full'
  }
]

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
