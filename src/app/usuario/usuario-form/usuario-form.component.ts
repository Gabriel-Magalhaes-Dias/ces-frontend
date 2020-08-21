import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators, FormControl } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { Title } from '@angular/platform-browser';
import { ActivatedRoute, Router } from '@angular/router';
import { NotificationService } from 'src/app/core/services/notification.service';
import { UsuarioService } from 'src/app/core/services/usuario.service';
import { ConfirmDialogComponent, DialogData } from 'src/app/shared/confirm-dialog/confirm-dialog.component';
import { Usuario } from 'src/app/shared/models/usuario';

@Component({
  selector: 'app-usuario-form',
  templateUrl: './usuario-form.component.html',
  styleUrls: ['./usuario-form.component.css']
})
export class UsuarioFormComponent implements OnInit {

  editarUsuario = false

  usuarioForm = this.fb.group({
    nome: ['', [Validators.required, this.noNumberValidator, this.startWithSpace]],
    username: ['', [Validators.required, Validators.minLength(4) , this.noWhitespaceValidator]],
    email: ['', [Validators.required, Validators.pattern("^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$")]],
    password: ['', [Validators.required, this.startWithSpace, this.noWhitespaceValidator]],
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
            this.notification.success('Usuário atualizado com sucesso')
          },
            () => {
              this.notification.error('Erro ao atualizar usuário')
            })
        } else {
          this.usuarioService.salvar(this.usuarioForm.value as Usuario).subscribe(() => {
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

  updateUsuario(usuario: Usuario) {
    this.usuarioForm.patchValue({
      nome: usuario.nome,
      username: usuario.username,
      //password: usuario.password,
      email: usuario.email,
      enabled: usuario.enabled
    })
  }

}
