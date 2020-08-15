import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LayoutComponent } from '../shared/layout/layout.component';
import { RequisitoFormComponent } from './requisito-form/requisito-form.component';
import { RequisitoInfoComponent } from './requisito-info/requisito-info.component';
import { AuthGuard } from '../auth/auth.guard';

const routes: Routes = [
  {
    path: 'requisitos',
    canActivate: [AuthGuard],
    component: LayoutComponent,
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
        
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class RequisitoRoutingModule { }
