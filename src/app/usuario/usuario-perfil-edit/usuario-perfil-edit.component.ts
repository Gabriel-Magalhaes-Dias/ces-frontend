import { Component, OnInit } from '@angular/core';
import { Validators, FormControl, FormBuilder } from '@angular/forms';
import { User } from 'src/app/auth/user.model';
import { ActivatedRoute, Router } from '@angular/router';
import { UsuarioService } from 'src/app/core/services/usuario.service';
import { MatDialog } from '@angular/material/dialog';
import { NotificationService } from 'src/app/core/services/notification.service';
import { Title } from '@angular/platform-browser';
import { AuthenticationService } from 'src/app/auth/auth.service';
import { Usuario, Habilidade } from 'src/app/shared/models/usuario';
import { DialogData, ConfirmDialogComponent } from 'src/app/shared/confirm-dialog/confirm-dialog.component';

@Component({
  selector: 'app-usuario-perfil-edit',
  templateUrl: './usuario-perfil-edit.component.html',
  styleUrls: ['./usuario-perfil-edit.component.css']
})
export class UsuarioPerfilEditComponent implements OnInit {

  usuario: User;
  id: number
  habilidades: Habilidade[] = []

  usuarioForm = this.fb.group({
    nome: ['', [Validators.required, this.noNumberValidator, this.startWithSpace]],
    username: ['', [Validators.required, Validators.minLength(4) , this.noWhitespaceValidator]],
    email: ['', [Validators.required, Validators.pattern("^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$")]],
    habilidade: '',
    enabled: ['']
  })

  constructor(private activatedRoute: ActivatedRoute,
              private usuarioService: UsuarioService, private fb: FormBuilder,
              private dialog: MatDialog, private notification: NotificationService,
              private router: Router, private titleService: Title,
              private authenticationService: AuthenticationService) { }

  ngOnInit(): void {
    this.id = this.activatedRoute.snapshot.params['id'];

    if (this.id) {
      this.titleService.setTitle('Atualizar Usuario');
      this.usuarioService.get(this.id)
        .subscribe((usuario: Usuario) => this.updateUsuario(usuario));
    } else {
      this.titleService.setTitle('Novo Usuario');
    }

    this.authenticationService.user.subscribe(user => {
      this.usuario = user;
    });
  }

  onSubmit() {
    this.cadastrar();
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
        const usuario = this.getUsuario();
        if (this.id) {
          this.usuarioService.update(this.id, usuario).subscribe(() => {
            this.router.navigate(['/usuarios/perfil/', this.id])
            this.notification.success('Usuário atualizado com sucesso')
          },
            () => {
              this.notification.error('Erro ao atualizar usuário')
            })
        } else {
          this.usuarioService.salvar(usuario).subscribe(() => {
            this.router.navigate(['/usuarios'])
            this.notification.success('Usuário criado com sucesso')
          },
            () => {
              this.notification.error('Erro ao criar usuário')
            })
        }
      }
    })
  }

  addHabilidade() {
    this.habilidades.push({descricao: this.habilidade.value});
    this.habilidade.setValue('');
  }

  deleteHabilidade() {
    this.habilidades = [];
  }

  noNumberValidator(control: FormControl) {
    const input: string = control.value;
    const hasNumbers = input.match(/(\d+)/);
    return hasNumbers ? { 'hasnumbers': true } : null;
  }

  noWhitespaceValidator(control: FormControl) {
    const input: string = control.value;
    const hasWhitespace = input.match(' ');
    return hasWhitespace ? { 'whitespace': true } : null;
  }

  startWithSpace(control: FormControl) {
    const input: string = control.value;
    const startWithSpace = input.charAt(0).match(' ');
    return startWithSpace ? { 'startwithspace': true } : null;
  }

  get nome() {return this.usuarioForm.get('nome')}
  get email() {return this.usuarioForm.get('email')}
  get username() {return this.usuarioForm.get('username')}
  get enabled() {return this.usuarioForm.get('enabled')}
  get habilidade() {return this.usuarioForm.get('habilidade')}

  updateUsuario(usuario: Usuario) {
    this.usuarioForm.patchValue({
      nome: usuario.nome,
      username: usuario.username,
      //password: usuario.password,
      email: usuario.email,
      enabled: usuario.enabled
    })

    this.habilidades = usuario.habilidades;
  }

  getUsuario(): Usuario {
    return {
      email: this.email.value,
      enabled: this.enabled.value,
      nome: this.nome.value,
      password: this.usuario.password,
      username: this.username.value,
      habilidades: this.habilidades,
    }
  }

}
