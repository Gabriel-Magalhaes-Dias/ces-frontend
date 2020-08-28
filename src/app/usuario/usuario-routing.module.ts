import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { UsuarioFormComponent } from './usuario-form/usuario-form.component';
import { UsuarioListComponent } from './usuario-list/usuario-list.component';
import { AuthGuard } from '../auth/auth.guard';
import { UsuarioPerfilComponent } from './usuario-perfil/usuario-perfil.component';
import { UsuarioPerfilEditComponent } from './usuario-perfil-edit/usuario-perfil-edit.component';
import { UsuarioSenhaEditComponent } from './usuario-senha-edit/usuario-senha-edit.component';

const routes: Routes = [
  {
    path: 'usuarios',
    canActivate: [AuthGuard],
    children: [
      {
        path: '',
        component: UsuarioListComponent
      },
      {
        path: 'novo',
        children: [
          {
            path: '',
            component: UsuarioFormComponent
          },
          {
            path: ':id',
            component: UsuarioFormComponent
          }
        ]
      },
      {
        path: 'perfil',
        children: [
          {
            path: ':id',
            component: UsuarioPerfilComponent
          },
          {
            path: ':id/editar',
            component: UsuarioPerfilEditComponent
          },
          {
            path: ':id/senha',
            component: UsuarioSenhaEditComponent
          }
        ]
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UsuarioRoutingModule { }
