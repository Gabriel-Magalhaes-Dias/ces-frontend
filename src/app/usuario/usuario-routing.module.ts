import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LayoutComponent } from '../shared/layout/layout.component';
import { UsuarioFormComponent } from './usuario-form/usuario-form.component';
import { UsuarioListComponent } from './usuario-list/usuario-list.component';
import { AuthGuard } from '../auth/auth.guard';

const routes: Routes = [
  {
    path: 'usuarios',
    canActivate: [AuthGuard],
    component: LayoutComponent,
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
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UsuarioRoutingModule { }
