import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ProjetoFormComponent } from './projeto-form/projeto-form.component';
import { ProjetoInfoComponent } from './projeto-info/projeto-info.component';
import { ProjetoListComponent } from './projeto-list/projeto-list.component';
import { AuthGuard } from '../auth/auth.guard';

const routes: Routes = [
  {
    path: 'projetos',
    canActivate: [AuthGuard],
    children: [
      {
        path: '',
        component: ProjetoListComponent
      },
      {
        path: 'novo',
        component: ProjetoFormComponent
      },
      {
        path: ':id',
        component: ProjetoInfoComponent
      },
      {
        path: ':id/editar',
        component: ProjetoFormComponent
      },
      {
        path: ':idProjeto/requisitos',
        loadChildren: () => import('../requisito/requisito.module').then(m => m.RequisitoModule)
      },
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ProjetoRoutingModule { }
