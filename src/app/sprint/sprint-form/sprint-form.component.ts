import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Title } from '@angular/platform-browser';
import { Router } from '@angular/router';
import { ConfirmDialogComponent, DialogData } from 'src/app/shared/confirm-dialog/confirm-dialog.component';
import { NotificationService } from '../../core/services/notification.service';
import { SprintService } from '../../core/services/sprint.service';
import { Requisito } from 'src/app/shared/models/requisito';
import { Sprint } from 'src/app/shared/models/sprint';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { RequisitoService } from 'src/app/core/services/requisito.service';

@Component({
  selector: 'app-sprint-form',
  templateUrl: './sprint-form.component.html',
  styleUrls: ['./sprint-form.component.css']
})
export class SprintFormComponent implements OnInit {

  sprintForm: FormGroup;
  requisitos: Requisito[] = [];
  requisitosSelecionado: Requisito[] = [];

  constructor(
    private dialog: MatDialog,
    private fb: FormBuilder,
    private notification: NotificationService,
    private router: Router,
    private titleService: Title,
    private requisitoService: RequisitoService,
    private sprintService: SprintService,
  ) {
    this.createForm();
  }

  ngOnInit(): void {
    this.titleService.setTitle('Nova Sprint');
    this.requisitoService.getRequisitosEstadoNovo()
      .subscribe(requisitos => this.requisitos = requisitos)
  }

  createForm() {
    this.sprintForm = this.fb.group({
      valorEntregueAoNegocio: ['', Validators.required],
      dataInicio: ['', Validators.required],
      dataFim: ['', Validators.required],
    });
  }

  onSubmit(): void {
    const config = {
      data: {
        title: 'Confirmação',
        message: 'Deseja criar a sprint?'
      } as DialogData
    }
    const dialogRef = this.dialog.open(ConfirmDialogComponent, config)
    dialogRef.afterClosed().subscribe((opcao: boolean) => {
      if (opcao) {
        this.sprintService.salvar(this.getSprint())
          .subscribe(sprint => {
            console.log(sprint);
            this.router.navigate(['/backlog'])
            this.notification.success('Sprint criada com sucesso')
          }, err => {
            this.notification.error(err);
          })
      }
    })
  }

  setRequisitosSelecionados(requisitos: Requisito[]) {
    this.requisitosSelecionado = requisitos;
  }

  get valorEntregueAoNegocio() {
    return this.sprintForm.get('valorEntregueAoNegocio').value;
  }
  

  getSprint(): Sprint {
    return {
      estado: 'nova',
      numeroSprint: 1,
      dataInicio: new Date,
      dataFim: new Date,
      valorEntregueAoNegocio: this.valorEntregueAoNegocio,
      valorAprovadoCliente: false,
      entregas: this.requisitosSelecionado,
    }
  }

}
