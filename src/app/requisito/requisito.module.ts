import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { MaterialModule } from '../material.module';
import { SharedModule } from '../shared/shared.module';
import { RequisitoFormComponent } from './requisito-form/requisito-form.component';
import { RequisitoInfoComponent } from './requisito-info/requisito-info.component';
import { RequisitoPriorizarComponent } from './requisito-priorizar/requisito-priorizar.component';
import { RequisitoRoutingModule } from './requisito-routing.module';
import { HistoricoListComponent } from './historico/historico-list/historico-list.component';
import { HistoricoInfoComponent } from './historico/historico-info/historico-info.component';
import { RequisitoEstimarComponent } from './requisito-estimar/requisito-estimar.component';

@NgModule({
  declarations: [RequisitoFormComponent, RequisitoInfoComponent, RequisitoPriorizarComponent, HistoricoListComponent, HistoricoInfoComponent, RequisitoEstimarComponent],
  imports: [
    CommonModule,
    RequisitoRoutingModule,
    SharedModule,
    MaterialModule,
    ReactiveFormsModule
  ]
})
export class RequisitoModule { }
