import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { MaterialModule } from '../material.module';
import { ProjetoFormComponent } from './projeto-form/projeto-form.component';
import { ProjetoListComponent } from './projeto-list/projeto-list.component';
import { ProjetoRoutingModule } from './projeto-routing.module';
import { ProjetoInfoComponent } from './projeto-info/projeto-info.component';

@NgModule({
  declarations: [ProjetoFormComponent, ProjetoListComponent, ProjetoInfoComponent],
  imports: [
    CommonModule,
    ProjetoRoutingModule,
    MaterialModule,
    ReactiveFormsModule
  ]
})
export class ProjetoModule { }
