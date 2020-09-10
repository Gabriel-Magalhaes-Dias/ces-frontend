import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { Title } from '@angular/platform-browser';
import { ActivatedRoute, Router } from '@angular/router';
import { RequisitoService } from 'src/app/core/services/requisito.service';
import { Requisito } from 'src/app/shared/models/requisito';
import { NotificationService } from './../../core/services/notification.service';
import { UserStory } from './../../shared/models/userStory';

export interface Estimativa {
  estimativa: number
}

@Component({
  selector: 'app-requisito-estimar',
  templateUrl: './requisito-estimar.component.html',
  styleUrls: ['./requisito-estimar.component.css']
})
export class RequisitoEstimarComponent implements OnInit {

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
  idProjeto: number;

  estimarForm = this.fb.group({
    estimativa: ['', [Validators.required]],
  })

  estimar(): void {
    this.requisitoService.estimar(this.id, this.estimarForm.value as Estimativa).subscribe(() => {
      this.notification.success('Requisito estimado com sucesso');
      this.voltar();
    },
      () => this.notification.error('Erro ao estimar o requisito'));
  }

  ngOnInit(): void {
    this.titleService.setTitle('Informações do Requisito');
    this.id = parseInt(this.routeEntrada.snapshot.paramMap.get('id'));
    this.idProjeto = parseInt(this.routeEntrada.parent.snapshot.paramMap.get('idProjeto'));
    this.requisitoSevice.get(this.id).subscribe(requisito => { this.requisito = requisito; this.userStory = requisito.userStory });
  }

  voltar(): void{
    this.router.navigateByUrl('projetos/'+this.idProjeto+'/requisitos/info/'+this.id);
  }

}
