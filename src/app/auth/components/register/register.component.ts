import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from '../../auth.service';
import { Router } from '@angular/router';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { User } from '../../user.model';
import { NotificationService } from 'src/app/core/services/notification.service';
import { error } from '@angular/compiler/src/util';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  user: User;
  registerForm: FormGroup;
  isLoading = false;
  errorMessage = '';

  constructor(private authService: AuthenticationService,
              private notificationService: NotificationService,
              private router: Router,
              private fb: FormBuilder) {
                this.createForm();
               }

  ngOnInit() {
  }

  createForm() {
    this.registerForm = this.fb.group({
      email: '',
      nome: '',
      username: '',
      password: '',
      passwordConfirmation: ''
    });
  }

  onSubmit() {

    if (this.password === this.passwordConfirmation) {
      this.isLoading = true;
      this.user = this.getUser();

      this.authService.register(this.user).subscribe(
        data => {
          this.isLoading = false;
          this.notificationService.success('Usuário cadastrado com sucesso!');
          this.router.navigate(['/login']);
        },
        err => {
          this.isLoading = false;
          this.errorMessage = err.error.message;
          this.notificationService.error(this.errorMessage);
        }
      );
    } else {
      this.notificationService.error('A senha de confirmaçao nao confere!');
      this.registerForm.get('password').setValue('');
      this.registerForm.get('passwordConfirmation').setValue('');
    }
  }

  get email() {
    return this.registerForm.get('email').value;
  }

  get username() {
    return this.registerForm.get('username').value;
  }

  get password() {
    return this.registerForm.get('password').value;
  }

  get passwordConfirmation() {
    return this.registerForm.get('passwordConfirmation').value;
  }

  get nome() {
    return this.registerForm.get('nome').value;
  }

  getUser(): User {
    return {
      nome: this.nome,
      email: this.email,
      username: this.username,
      password: this.password,
      enabled: true
    };
  }

}
