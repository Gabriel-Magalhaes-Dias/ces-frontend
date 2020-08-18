import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { Title } from '@angular/platform-browser';
import { ActivatedRoute, Router } from '@angular/router';
import { NotificationService } from 'src/app/core/services/notification.service';
import { RequisitoService } from 'src/app/core/services/requisito.service';
import { ConfirmDialogComponent, DialogData } from 'src/app/shared/confirm-dialog/confirm-dialog.component';
import { Requisito } from 'src/app/shared/models/requisito';

@Component({
  selector: 'app-requisito-info',
  templateUrl: './requisito-info.component.html',
  styleUrls: ['./requisito-info.component.css']
})
export class RequisitoInfoComponent implements OnInit {

  constructor(private titleService: Title, private requisitoSevice: RequisitoService, private fb: FormBuilder,
    private routeEntrada: ActivatedRoute, private dialog: MatDialog, private router: Router, private notification: NotificationService) { }

  requisito: Requisito;
  tipoDescricao: string;
  id: number;

  ngOnInit(): void {
    this.titleService.setTitle('Informações do Requisito');
    this.id = parseInt(this.routeEntrada.snapshot.paramMap.get('id'));
    this.requisitoSevice.get(this.id).subscribe((requisito: Requisito) => (this.requisito = requisito));
  }

  excluirRequisito(): void {
    const config = {
      data: {
        title: 'Excluir Requisito',
        message: 'Deseja excluir este registro?'
      } as DialogData
    }
    const dialogRef = this.dialog.open(ConfirmDialogComponent, config)
    dialogRef.afterClosed().subscribe((opcao: boolean) => {
      if (opcao) {
        this.requisitoSevice.deletar(this.id).subscribe();
        this.router.navigate(['/backlog']);
        this.notification.success('Requisito excluido com sucesso');
      }
    })

  }

  editarRequisito(): void {
    this.router.navigateByUrl('/requisitos/novo/' + this.id);
  }

}
