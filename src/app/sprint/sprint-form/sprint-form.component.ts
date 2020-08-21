import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Title } from '@angular/platform-browser';
import { Router, ActivatedRoute } from '@angular/router';
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

  id: string;
  sprint: Sprint;
  sprintForm: FormGroup;
  requisitos: Requisito[] = [];
  requisitosSelecionado: Requisito[] = [];

  constructor(
    private activatedRoute: ActivatedRoute,
    private dialog: MatDialog,
    private fb: FormBuilder,
    private notification: NotificationService,
    private router: Router,
    private titleService: Title,
    private requisitoService: RequisitoService,
    private sprintService: SprintService,
  ) {
    this.id = this.activatedRoute.snapshot.params['id'];
    this.createForm();
  }

  ngOnInit(): void {
    this.titleService.setTitle(this.id ?  'Editar Sprint' : 'Nova Sprint');
    this.requisitoService.getRequisitosByEstado('novo')
      .subscribe(requisitos => this.requisitos = requisitos)

    if(this.id){
      this.sprintService.get(this.id)
        .subscribe(sprint => {
          this.sprint = sprint
          this.editSprint();
        })
    }
  }

  editSprint() {
    this.sprintForm.patchValue({
      ...this.sprint,
    });
    console.log(this.requisitosSelecionado)
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
        message: this.id ? 'Deseja editar a sprint' : 'Deseja criar a sprint?'
      } as DialogData
    }
    const dialogRef = this.dialog.open(ConfirmDialogComponent, config)
    dialogRef.afterClosed().subscribe((opcao: boolean) => {
      if (opcao) {
        console.log(this.getSprint())
        this.sprintService.salvar(this.getSprint())
          .subscribe(sprint => {
            this.router.navigate(['/backlog'])
            this.notification.success('Sprint criada com sucesso')
          }, err => {
            console.log(err);
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
      requisitosIds: this.requisitosSelecionado.map(requisito => requisito.id),
    }
  }

}
