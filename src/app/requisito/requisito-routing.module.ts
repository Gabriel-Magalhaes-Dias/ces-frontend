import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from '../auth/auth.guard';
import { HistoricoInfoComponent } from './historico/historico-info/historico-info.component';
import { HistoricoListComponent } from './historico/historico-list/historico-list.component';
import { RequisitoEstimarComponent } from './requisito-estimar/requisito-estimar.component';
import { RequisitoFormComponent } from './requisito-form/requisito-form.component';
import { RequisitoInfoComponent } from './requisito-info/requisito-info.component';
import { RequisitoPriorizarComponent } from './requisito-priorizar/requisito-priorizar.component';

const routes: Routes = [
  {
    path: 'projetos/:idProjeto/requisitos',
    canActivate: [AuthGuard],
    //component: LayoutComponent,
    children: [
      {
        path: 'info/:id',
        component: RequisitoInfoComponent
      },
      {
        path: 'novo',
        children: [
          {
            path: '',
            component: RequisitoFormComponent
          },
          {
            path: ':id',
            component: RequisitoFormComponent
          }
        ]
      },
      {
        path: ':id/priorizar',
        component: RequisitoPriorizarComponent
      },
      {
        path: ':id/estimar',
        component: RequisitoEstimarComponent
      },
      {
        path: ':id/historico',
        component: HistoricoListComponent
      },
      {
        path: ':idRequisito/versao/:idVersao',
        component: HistoricoInfoComponent
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class RequisitoRoutingModule { }
