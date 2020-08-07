import { CommonModule } from '@angular/common'
import { NgModule } from '@angular/core'
import { ReactiveFormsModule } from '@angular/forms'
import { MaterialModule } from '../material.module'
import { SharedModule } from '../shared/shared.module'
import { BacklogHomeComponent } from './backlog-home/backlog-home.component'
import { BacklogRoutingModule } from './backlog-routing.module'

@NgModule({
  declarations: [BacklogHomeComponent],
  imports: [
    CommonModule,
    SharedModule,
    MaterialModule,
    ReactiveFormsModule,
    BacklogRoutingModule
  ]
})
export class BacklogModule { }
