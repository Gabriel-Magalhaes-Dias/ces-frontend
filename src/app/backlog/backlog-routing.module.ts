import { NgModule } from '@angular/core'
import { RouterModule, Routes } from '@angular/router'
import { AuthGuard } from '../auth/auth.guard'
import { LayoutComponent } from '../shared/layout/layout.component'
import { BacklogClienteComponent } from './backlog-cliente/backlog-cliente.component'
import { BacklogHomeComponent } from './backlog-home/backlog-home.component'

const routes: Routes = [
  {
    path: 'backlog',
    canActivate: [AuthGuard],
    component: LayoutComponent,
    children: [
      {
        path: '',
        component: BacklogHomeComponent
      },
      {
        path: 'cliente',
        component: BacklogClienteComponent
      }
    ]
  }
]

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class BacklogRoutingModule { }
