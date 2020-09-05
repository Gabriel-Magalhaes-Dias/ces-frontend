import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { Title } from '@angular/platform-browser';
import { ActivatedRoute, Router } from '@angular/router';
import { NotificationService } from 'src/app/core/services/notification.service';
import { ProjetoService } from 'src/app/core/services/projeto.service';
import { ConfirmDialogComponent, DialogData } from 'src/app/shared/confirm-dialog/confirm-dialog.component';
import { Projeto } from 'src/app/shared/models/projeto';

@Component({
  selector: 'app-projeto-info',
  templateUrl: './projeto-info.component.html',
  styleUrls: ['./projeto-info.component.css']
})
export class ProjetoInfoComponent implements OnInit {

  constructor(private titleService: Title, private projetoSevice: ProjetoService, private fb: FormBuilder,
    private routeEntrada: ActivatedRoute, private dialog: MatDialog, private router: Router, private notification: NotificationService) { }

  projeto: Projeto;
  tipoDescricao: string;
  id: number;

  ngOnInit(): void {
    this.titleService.setTitle('Informações do Projeto');
    this.id = parseInt(this.routeEntrada.snapshot.paramMap.get('id'));
    this.projetoSevice.get(this.id).subscribe((projeto: Projeto) => {
      this.projeto = projeto
      this.projeto.dataInicio = new Date(projeto.dataInicio)
      this.projeto.dataFim = new Date(projeto.dataFim)
    });
  }

  excluir(): void {
    const config = {
      data: {
        title: 'Excluir Projeto',
        message: 'Deseja excluir este registro?'
      } as DialogData
    }
    const dialogRef = this.dialog.open(ConfirmDialogComponent, config)
    dialogRef.afterClosed().subscribe((opcao: boolean) => {
      if (opcao) {
        this.projetoSevice.deletar(this.id).subscribe(() => {
          this.router.navigate(['/projetos']);
          this.notification.success('Projeto excluido com sucesso');
        },
          () => {
            this.notification.error('Falha ao excluir projeto. Projeto não está vazio!');
          }
        );

      }
    })
  }

  editar(): void {
    this.router.navigateByUrl('/projetos/' + this.id + '/editar');
  }

}
