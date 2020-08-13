import { Requisito } from 'src/app/shared/models/requisito';
import { UserStory } from './../../shared/models/userStory';
import { Component, OnInit } from '@angular/core'
import { MatDialog } from '@angular/material/dialog'
import { Title } from '@angular/platform-browser'
import { Router, ActivatedRoute } from '@angular/router'
import { ConfirmDialogComponent, DialogData } from 'src/app/shared/confirm-dialog/confirm-dialog.component'
import { NotificationService } from '../../core/services/notification.service'
import { RequisitoService } from 'src/app/core/services/requisito.service';
import { FormBuilder, Validators } from '@angular/forms';


@Component({
  selector: 'app-requisito-form',
  templateUrl: './requisito-form.component.html',
  styleUrls: ['./requisito-form.component.css']
})
export class RequisitoFormComponent implements OnInit {


  requisitoForm = this.fb.group({
    nome: ['', Validators.required],
    observacoes: ['', Validators.required]
  })

  userStoryForm = this.fb.group({
    comoUm: ['', Validators.required],
    acao: ['', Validators.required],
    paraQueSejaPossivel: ['', Validators.required],
    tema: ['', Validators.required]
  })

  
  requisito: Requisito = {
    nome: '',
    observacoes: '',
    estado: 'novo',
    userStory: null
  }

  userStory : UserStory = { 
    comoUm: '',
    acao: '',
    paraQueSejaPossivel: '',
    tema: ''
  }

  acaoOption : string;
  tipoDescricao = 'user_story';
  id : number;
  editarRequisito: boolean;

  constructor(private dialog: MatDialog, private notification: NotificationService, private fb: FormBuilder,
    private router: Router, private activatedRoute : ActivatedRoute, private titleService: Title, private requisitoService : RequisitoService) { }

  ngOnInit(): void {
    this.id = this.activatedRoute.snapshot.params['id'];

    if (this.id) {
      this.editarRequisito = true;
      this.titleService.setTitle('Atualizar Requisito');
      this.requisitoService.get(this.id)
        .subscribe((requisito : Requisito) => (this.updateRequisito(requisito, requisito.userStory)));
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
          //Tratamentos básicos na interface
        this.requisito = this.requisitoForm.value as Requisito;
        this.userStory = this.userStoryForm.value as UserStory;

          //Passivo de exclusão caso o Form funcione
        if(!this.acaoOption){
          this.notification.error('Existem campos incompletos');
        }

          //Concatenar o dropmenu com o resto da descrição
        this.userStory.acao = this.acaoOption.concat(this.userStory.acao);
        this.requisito.userStory = this.userStory;
          //Cadastro
        if(this.editarRequisito){
          this.requisitoService.alterar(this.requisito, this.id).subscribe(() => this.notification.success('Requisito atualizado com sucesso'));
        }else{
          this.requisitoService.salvar(this.requisito).subscribe(() => this.notification.success('Requisito criado com sucesso'));
        }
        this.router.navigate(['/backlog'])
      }
    })
  }


  updateRequisito(requisito : Requisito, userStory : UserStory){
    this.acaoOption = this.ajustarEntrada(userStory);

    this.requisitoForm.patchValue({
      nome: requisito.nome,
      observacoes: requisito.observacoes
    });

    this.userStoryForm.patchValue({
      comoUm: userStory.comoUm,
      acao: userStory.acao,
      paraQueSejaPossivel: userStory.paraQueSejaPossivel,
      tema: userStory.tema
    });

    this.requisito = requisito;
    this.userStory = userStory;
  }

   ajustarEntrada(userStory : UserStory): string{
      if(userStory.acao.split(" ")[0]==='eu'){
        userStory.acao = userStory.acao.slice(9);
        return 'eu quero ';
      }else if(userStory.acao.split(" ")[0]==='preciso'){
        userStory.acao = userStory.acao.slice(11);
        return 'preciso de ';
      }else if(userStory.acao.split(" ")[0]==='gostaria'){
        userStory.acao = userStory.acao.slice(12);
        return 'gostaria de ';
      }else if(userStory.acao.split(" ")[0]==='devo'){
        userStory.acao = userStory.acao.slice(5);
        return 'devo ';
      }
   }
}
