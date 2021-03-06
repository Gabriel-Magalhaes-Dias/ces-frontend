import { BacklogService } from 'src/app/core/services/backlog.service';
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
import { Observable } from 'rxjs/internal/Observable';

@Component({
  selector: 'app-sprint-form',
  templateUrl: './sprint-form.component.html',
  styleUrls: ['./sprint-form.component.css']
})
export class SprintFormComponent implements OnInit {

  id: string;
  sprint: Sprint;
  sprintForm: FormGroup;
  requisitos$: Observable<Requisito[]>;
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
    private backlogService: BacklogService
  ) {
    this.id = this.activatedRoute.snapshot.params['id'];
    this.createForm();
  }

  async ngOnInit() {
    this.titleService.setTitle(this.id ? 'Editar Sprint' : 'Nova Sprint');
    if (this.id) {
      this.sprint = await this.sprintService.get(this.id).toPromise();
      this.editSprint();
    }
    this.requisitos$ = this.backlogService.getBacklog(parseInt(window.localStorage.getItem('idProjeto')), {numeroSprint: '', nomeRequisito: '', estado: 'novo'});
  }

  editSprint() {
    this.sprintForm.patchValue({
      valorEntregueAoNegocio: this.sprint.valorEntregueAoNegocio,
      dataInicio: new Date(this.sprint.dataInicio),
      dataFim: new Date(this.sprint.dataFim),
    });
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
        const sprint = this.getSprint();

        this.id ?
        this.sprintService.update(sprint)
          .subscribe(sprint => {
            this.router.navigate(['/sprints'])
            this.notification.success('Sprint atualizada com sucesso')
          }, err => {
            console.log(err);
            this.notification.error(err);
          }) :
        this.sprintService.create(sprint)
          .subscribe(sprint => {
            this.router.navigate(['/sprints'])
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
  
  get dataInicio() {
    return this.sprintForm.get('dataInicio').value;
  }

  get dataFim() {
    return this.sprintForm.get('dataFim').value;
  }

  getSprint(): Sprint {
    return {
      id: +this.id,
      dataInicio: this.dataInicio,
      dataFim: this.dataFim,   
      valorEntregueAoNegocio: this.valorEntregueAoNegocio,
      valorAprovadoCliente: false,
      entregas: this.requisitosSelecionado.map(req => {
        return {
          estimativa: 0,
          idAnalista: 1,
          idRequisito: req.id,
          requisito: req,
        }
      })
    }
  }

}
