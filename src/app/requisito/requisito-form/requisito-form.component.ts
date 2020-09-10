import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { Title } from '@angular/platform-browser';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthenticationService } from 'src/app/auth/auth.service';
import { RequisitoService } from 'src/app/core/services/requisito.service';
import { ConfirmDialogComponent, DialogData } from 'src/app/shared/confirm-dialog/confirm-dialog.component';
import { Requisito } from 'src/app/shared/models/requisito';
import { NotificationService } from '../../core/services/notification.service';
import { UserStory } from './../../shared/models/userStory';

export interface RequisitoData {
  nome: string;
  observacoes: string;
  autor: string;
  userStory: {
    comoUm: string;
    acao: string;
    paraQueSejaPossivel: string;
    tema: string;
  }
}

@Component({
  selector: 'app-requisito-form',
  templateUrl: './requisito-form.component.html',
  styleUrls: ['./requisito-form.component.css']
})
export class RequisitoFormComponent implements OnInit {

  requisitoForm = this.fb.group({
    nome: ['', Validators.required],
    observacoes: ['', Validators.required],
    userStory: this.fb.group({
      comoUm: ['', Validators.required],
      acao: ['', Validators.required],
      paraQueSejaPossivel: ['', Validators.required],
      tema: ['', Validators.required]
    })
  })

  requisito: RequisitoData

  acaoOption: string;
  tipoDescricao = 'user_story';
  id: number;
  idProjeto: number
  editarRequisito: boolean;

  constructor(private dialog: MatDialog, private notification: NotificationService, private fb: FormBuilder,
    private router: Router, private activatedRoute: ActivatedRoute, private titleService: Title, private requisitoService: RequisitoService, private authService: AuthenticationService) { }

  ngOnInit(): void {
    this.idProjeto = parseInt(this.activatedRoute.parent.parent.snapshot.paramMap.get('idProjeto'));
    this.id = this.activatedRoute.snapshot.params['id'];
    
    if (this.id) {
      this.editarRequisito = true;
      this.titleService.setTitle('Atualizar Requisito');
      this.requisitoService.get(this.id)
        .subscribe((requisito: Requisito) => (this.updateRequisito(requisito)));
    } else {
      this.titleService.setTitle('Novo Requisito');
      this.editarRequisito = false;
    }
  }

  submit(): void {
    this.cadastrar()
  }

  cadastrar(): void {
    const config = {
      data: {
        title: 'Salvar alterações',
        message: 'Deseja salvar as alterações realizadas no registro?'
      } as DialogData
    }
    const dialogRef = this.dialog.open(ConfirmDialogComponent, config)
    dialogRef.afterClosed().subscribe((opcao: boolean) => {
      if (opcao) {
        this.requisito = this.requisitoForm.value as RequisitoData;

        this.requisito.userStory.acao = this.acaoOption.concat(this.requisito.userStory.acao);
        if (this.editarRequisito) {
          this.requisitoService.alterar(this.requisito, this.id).subscribe(() => this.notification.success('Requisito atualizado com sucesso'));
        } else {
          this.requisitoService.salvar(this.requisito).subscribe(() => this.notification.success('Requisito criado com sucesso'));
        }
        this.router.navigate(['/backlog/'+this.idProjeto]);
      }
    })
  }


  updateRequisito(requisito: Requisito) {
    this.acaoOption = this.ajustarEntrada(requisito.userStory);

    this.requisitoForm.patchValue({
      nome: requisito.nome,
      observacoes: requisito.observacoes,
      userStory: {
        comoUm: requisito.userStory.comoUm,
        acao: requisito.userStory.acao,
        paraQueSejaPossivel: requisito.userStory.paraQueSejaPossivel,
        tema: requisito.userStory.tema
      }
    });
  }

  ajustarEntrada(userStory: UserStory): string {
    if (userStory.acao.split(" ")[0] === 'eu') {
      userStory.acao = userStory.acao.slice(9);
      return 'eu quero ';
    } else if (userStory.acao.split(" ")[0] === 'preciso') {
      userStory.acao = userStory.acao.slice(11);
      return 'preciso de ';
    } else if (userStory.acao.split(" ")[0] === 'gostaria') {
      userStory.acao = userStory.acao.slice(12);
      return 'gostaria de ';
    } else if (userStory.acao.split(" ")[0] === 'devo') {
      userStory.acao = userStory.acao.slice(5);
      return 'devo ';
    }
  }
}
