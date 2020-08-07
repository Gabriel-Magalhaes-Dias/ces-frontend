import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { Title } from '@angular/platform-browser';
import { ActivatedRoute, Router } from '@angular/router';
import { AdministradorService } from 'src/app/core/services/administrador.service';
import { NotificationService } from 'src/app/core/services/notification.service';
import { ConfirmDialogComponent, DialogData } from 'src/app/shared/confirm-dialog/confirm-dialog.component';
import { Administrador } from '../../shared/models/administrador';

@Component({
  selector: 'app-administrador-form',
  templateUrl: './administrador-form.component.html',
  styleUrls: ['./administrador-form.component.css']
})
export class AdministradorFormComponent implements OnInit {

  administradorForm = this.fb.group({
    nome: ['', Validators.required],
    username: ['', Validators.required],
    password: ['', Validators.required],
    enabled: ['', Validators.required]
  })

  hide = true
  id: number

  constructor(private activatedRoute: ActivatedRoute,
    private administradorService: AdministradorService, private fb: FormBuilder,
    private dialog: MatDialog, private notification: NotificationService,
    private router: Router, private titleService: Title) { }

  ngOnInit(): void {
    this.id = this.activatedRoute.snapshot.params['id'];

    if (this.id) {
      this.titleService.setTitle('Atualizar Administrador');
      this.administradorService.get(this.id)
        .subscribe((administrador: Administrador) => this.updateAdministrador(administrador));
    } else {
      this.titleService.setTitle('Novo Administrador');
    }

  }

  onSubmit() {
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
        console.log(this.administradorForm.value as Administrador)

        if (this.id) {
          this.administradorService.update(this.id, this.administradorForm.value as Administrador).subscribe(() => {
            this.router.navigate(['/administradores'])
            this.notification.success('Administrador atualizado com sucesso')
          },
            () => {
              this.notification.error('Erro ao atualizar administrador')
            })
        } else {
          this.administradorService.salvar(this.administradorForm.value as Administrador).subscribe(() => {
            this.router.navigate(['/administradores'])
            this.notification.success('Administrador criado com sucesso')
          },
            () => {
              this.notification.error('Erro ao criar administrador')
            })
        }
      }
    })
  }

  updateAdministrador(administrador: Administrador) {
    this.administradorForm.patchValue({
      nome: administrador.nome,
      username: administrador.username,
      password: administrador.password,
      enabled: administrador.enabled
    })
  }

}
