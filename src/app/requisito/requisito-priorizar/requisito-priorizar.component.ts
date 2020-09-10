import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { Title } from '@angular/platform-browser';
import { ActivatedRoute, Router } from '@angular/router';
import { NotificationService } from 'src/app/core/services/notification.service';
import { RequisitoService } from 'src/app/core/services/requisito.service';
import { Requisito } from 'src/app/shared/models/requisito';
import { UserStory } from './../../shared/models/userStory';

export interface Prioridade {
  prioridade: number
}

@Component({
  selector: 'app-requisito-priorizar',
  templateUrl: './requisito-priorizar.component.html',
  styleUrls: ['./requisito-priorizar.component.css']
})
export class RequisitoPriorizarComponent implements OnInit {

  constructor(private titleService: Title, private requisitoSevice: RequisitoService, private fb: FormBuilder,
    private routeEntrada: ActivatedRoute, private dialog: MatDialog, private router: Router, private notification: NotificationService,
    private requisitoService: RequisitoService) { }

  requisito: Requisito = {
    nome: "",
    observacoes: "",
  };
  userStory: UserStory = {
    tema: "",
    comoUm: "",
    acao: "",
    paraQueSejaPossivel: ""
  }
  tipoDescricao: string;
  id: number;
  idProjeto: number

  priorizarForm = this.fb.group({
    prioridade: ['', [Validators.required]],
  })

  priorizar(): void {
    this.requisitoService.priorizar(this.id, this.priorizarForm.value as Prioridade).subscribe(() => {
      this.notification.success('Requisito priorizado com sucesso')
      this.router.navigate(['/backlog/cliente/'+this.idProjeto]);
    },
      () => this.notification.error('Erro ao priorizar requisito'));
  }

  ngOnInit(): void {
    this.titleService.setTitle('Informações do Requisito');
    this.id = parseInt(this.routeEntrada.snapshot.paramMap.get('id'));
    this.idProjeto = parseInt(this.routeEntrada.parent.snapshot.paramMap.get('idProjeto'));
    this.requisitoSevice.get(this.id).subscribe(requisito => { this.requisito = requisito; this.userStory = requisito.userStory });
  }

}
