import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Title } from '@angular/platform-browser';
import { Router, ActivatedRoute } from '@angular/router';
import { NotificationService } from 'src/app/core/services/notification.service';
import { ConfirmDialogComponent, DialogData } from 'src/app/shared/confirm-dialog/confirm-dialog.component';
import { Validators, FormBuilder } from '@angular/forms';
import { UsuarioService } from 'src/app/core/services/usuario.service';
import { Usuario } from 'src/app/shared/models/usuario';

@Component({
  selector: 'app-usuario-form',
  templateUrl: './usuario-form.component.html',
  styleUrls: ['./usuario-form.component.css']
})
export class UsuarioFormComponent implements OnInit {

  editarUsuario = false

  usuarioForm = this.fb.group({
    nome: ['', Validators.required],
    username: ['', Validators.required],
    password: ['', Validators.required],
    enabled: ['']
  })

  hide = true
  id: number

  constructor(private activatedRoute: ActivatedRoute,
    private usuarioService: UsuarioService, private fb: FormBuilder,
    private dialog: MatDialog, private notification: NotificationService,
    private router: Router, private titleService: Title) { }

  ngOnInit(): void {
    this.id = this.activatedRoute.snapshot.params['id'];

    if (this.id) {
      this.editarUsuario = true;
      this.titleService.setTitle('Atualizar Usuario');
      this.usuarioService.get(this.id)
        .subscribe((usuario: Usuario) => this.updateUsuario(usuario));
    } else {
      this.titleService.setTitle('Novo Usuario');
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

        if (this.id) {
          this.usuarioService.update(this.id, this.usuarioForm.value as Usuario).subscribe(() => {
            this.router.navigate(['/usuarios'])
            this.notification.success('Administrador atualizado com sucesso')
          },
            () => {
              this.notification.error('Erro ao atualizar administrador')
            })
        } else {
          this.usuarioService.salvar(this.usuarioForm.value as Usuario).subscribe(() => {
            this.router.navigate(['/usuarios'])
            this.notification.success('Usuario criado com sucesso')
          },
            () => {
              this.notification.error('Erro ao criar usuario')
            })
        }
      }
    })
  }

  updateUsuario(usuario: Usuario) {
    this.usuarioForm.patchValue({
      nome: usuario.nome,
      username: usuario.username,
      //password: usuario.password,
      enabled: usuario.enabled
    })
  }

}
