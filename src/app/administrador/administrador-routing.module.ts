import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdministradorFormComponent } from './administrador-form/administrador-form.component';
import { AdministradorListComponent } from './administrador-list/administrador-list.component';
import { AuthGuard } from '../auth/auth.guard';

const routes: Routes = [
  {
    path: 'administradores',
    canActivate: [AuthGuard],
    //component: LayoutComponent,
    children: [
      {
        path: '',
        component: AdministradorListComponent
      },
      {
        path: 'novo',
        children: [
          {
            path: '',
            component: AdministradorFormComponent
          },
          {
            path: ':id',
            component: AdministradorFormComponent
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
export class AdministradorRoutingModule { }
