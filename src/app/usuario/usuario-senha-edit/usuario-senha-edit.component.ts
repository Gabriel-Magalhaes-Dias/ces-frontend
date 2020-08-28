import { Component, OnInit } from '@angular/core';
import { Validators, FormControl, FormBuilder } from '@angular/forms';
import { DialogData, ConfirmDialogComponent } from 'src/app/shared/confirm-dialog/confirm-dialog.component';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { UsuarioService } from 'src/app/core/services/usuario.service';
import { NotificationService } from 'src/app/core/services/notification.service';

@Component({
  selector: 'app-usuario-senha-edit',
  templateUrl: './usuario-senha-edit.component.html',
  styleUrls: ['./usuario-senha-edit.component.css']
})
export class UsuarioSenhaEditComponent implements OnInit {

  senhaForm = this.fb.group({
    novaSenha: ['', [Validators.required, this.startWithSpace, this.noWhitespaceValidator]],
    confirmarSenha: ''
  })

  id: number

  constructor(private activatedRoute: ActivatedRoute, 
              private dialog: MatDialog, private fb: FormBuilder,
              private usuarioService: UsuarioService,
              private router: Router,
              private notification: NotificationService) { }

  ngOnInit(): void {
    this.id = this.activatedRoute.snapshot.params['id'];
  }

  onSubmit() {
    this.alterar();
  }

  alterar(): void {
    if (this.novaSenha.value === this.confirmarSenha.value) {
      const config = {
        data: {
          title: 'Salvar alterações',
          message: 'Deseja salvar as alterações realizadas no registro?'
        } as DialogData
      }
      const dialogRef = this.dialog.open(ConfirmDialogComponent, config)
      dialogRef.afterClosed().subscribe((opcao: boolean) => {
        if (opcao) {
          this.usuarioService.updatePassword(this.novaSenha.value).subscribe(() => {
            this.router.navigate(['/'])
            this.notification.success('Senha alterada com sucesso')
          },
            () => {
              this.notification.error('Erro ao atualizar senha')
          })
        }
      })
    } else {
      this.notification.error('A senha de confirmaçao nao confere!');
      this.senhaForm.get('novaSenha').setValue('');
      this.senhaForm.get('confirmarSenha').setValue('');
    }

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

  get novaSenha() {
    return this.senhaForm.get('novaSenha');
  }

  get confirmarSenha() {
    return this.senhaForm.get('confirmarSenha');
  }
}
