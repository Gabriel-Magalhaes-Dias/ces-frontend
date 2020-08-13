import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { MaterialModule } from '../material.module';
import { SharedModule } from '../shared/shared.module';
import { RequisitoFormComponent } from './requisito-form/requisito-form.component';
import { RequisitoInfoComponent } from './requisito-info/requisito-info.component';
import { RequisitoRoutingModule } from './requisito-routing.module';
import { ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [RequisitoFormComponent, RequisitoInfoComponent],
  imports: [
    CommonModule,
    RequisitoRoutingModule,
    SharedModule,
    MaterialModule,
    ReactiveFormsModule
  ]
})
export class RequisitoModule { }
