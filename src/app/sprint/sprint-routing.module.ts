import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SprintDetailsComponent } from './sprint-details/sprint-details.component';
import { SprintFormComponent } from './sprint-form/sprint-form.component';
import { SprintListComponent } from './sprint-list/sprint-list.component';
import { AuthGuard } from '../auth/auth.guard';

const routes: Routes = [
  {
    path: 'sprints',
    canActivate: [AuthGuard],
    //component: LayoutComponent,
    children: [
      {
        path: '',
        component: SprintListComponent
      },
      {
        path: 'edit/:id',
        component: SprintFormComponent
      },
      {
        path: 'info/:id',
        component: SprintDetailsComponent
      },
      {
        path: 'novo',
        component: SprintFormComponent
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SprintRoutingModule { }
