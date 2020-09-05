import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { Title } from '@angular/platform-browser';
import { ActivatedRoute, Router } from '@angular/router';
import { NotificationService } from 'src/app/core/services/notification.service';
import { ProjetoService } from 'src/app/core/services/projeto.service';
import { ConfirmDialogComponent, DialogData } from 'src/app/shared/confirm-dialog/confirm-dialog.component';
import { Projeto } from 'src/app/shared/models/projeto';

@Component({
  selector: 'app-projeto-form',
  templateUrl: './projeto-form.component.html',
  styleUrls: ['./projeto-form.component.css']
})
export class ProjetoFormComponent implements OnInit {

  id: number

  editarProjeto = false

  projeto: Projeto;

  projetoForm = this.fb.group({
    nome: ['', Validators.required],
    dataInicio: ['', Validators.required],
    dataFim: ['', Validators.required],
    descricao: ['', Validators.required],
    realizaTestesAceitacao: [false],
    clientePriorizaBacklog: [false],
    utilizaPriorizacaoRequisitos: [false],
    utilizaModeloProprioRequisito: [false],
    descritivoProjeto: this.fb.group({
      objetivos: [''],
      limitacoes: [''],
      visaoGeral: [''],
      funcoesDoProduto: ['']
    })
  })

  constructor(private dialog: MatDialog, private notification: NotificationService, private fb: FormBuilder,
    private router: Router, private activatedRoute: ActivatedRoute, private titleService: Title, private projetoService: ProjetoService) { }

  ngOnInit(): void {
    this.id = this.activatedRoute.snapshot.params['id'];

    if (this.id) {
      this.editarProjeto = true;
      this.titleService.setTitle('Atualizar Projeto');
      this.projetoService.get(this.id)
        .subscribe((projeto: Projeto) => (this.updateProjeto(projeto)));
    } else {
      this.titleService.setTitle('Novo Projeto');
      this.editarProjeto = false;
    }
  }

  cadastrar(): void {
    console.log(this.projetoForm.value as Projeto)
    const config = {
      data: {
        title: 'Salvar alterações',
        message: 'Deseja salvar as alterações realizadas no registro?'
      } as DialogData
    }
    const dialogRef = this.dialog.open(ConfirmDialogComponent, config)
    dialogRef.afterClosed().subscribe((opcao: boolean) => {
      if (opcao) {
        if (this.id) {
          this.projetoService.alterar(this.id, this.projetoForm.value as Projeto).subscribe(() => {
            this.router.navigate(['/projetos'])
            this.notification.success('Projeto atualizado com sucesso')
          },
            () => {
              this.notification.error('Erro ao atualizar projeto')
            })
        } else {
          this.projetoService.salvar(this.projetoForm.value as Projeto).subscribe(() => {
            this.router.navigate(['/projetos'])
            this.notification.success('Projeto criado com sucesso')
          },
            () => {
              this.notification.error('Erro ao criar projeto')
            })
        }
      }
    })
  }

  updateProjeto(projeto: Projeto) {
    this.projetoForm.patchValue({
      nome: projeto.nome,
      dataInicio: new Date(projeto.dataInicio),
      dataFim: new Date(projeto.dataFim),
      descricao: projeto.descricao,
      realizaTestesAceitacao: projeto.realizaTestesAceitacao,
      clientePriorizaBacklog: projeto.clientePriorizaBacklog,
      utilizaPriorizacaoRequisitos: projeto.utilizaPriorizacaoRequisitos,
      utilizaModeloProprioRequisito: projeto.utilizaModeloProprioRequisito,
      descritivoProjeto: {
        objetivos: projeto.descritivoProjeto.objetivos,
        limitacoes: projeto.descritivoProjeto.limitacoes,
        visaoGeral: projeto.descritivoProjeto.visaoGeral,
        funcoesDoProduto: projeto.descritivoProjeto.funcoesDoProduto
      }
    })
  }

}
