import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { MaterialModule } from '../material.module';
import { ReactiveFormsModule } from '@angular/forms';
import { SharedModule } from '../shared/shared.module';
import { SprintDetailsComponent } from './sprint-details/sprint-details.component';
import { SprintFormComponent } from './sprint-form/sprint-form.component';
import { SprintListComponent } from './sprint-list/sprint-list.component';
import { SprintRoutingModule } from './sprint-routing.module';
import { RequisitosSprintComponent } from './requisitos-sprint/requisitos-sprint.component';
import { SprintCardComponent } from './sprint-card/sprint-card.component';

@NgModule({
  declarations: [
    SprintFormComponent,
    SprintListComponent,
    SprintDetailsComponent,
    RequisitosSprintComponent, 
    SprintCardComponent
  ],
  imports: [
    CommonModule,
    SprintRoutingModule,
    SharedModule,
    MaterialModule,
    ReactiveFormsModule,
    RouterModule
  ]
})
export class SprintModule { }
