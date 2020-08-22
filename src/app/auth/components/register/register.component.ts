import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from '../../auth.service';
import { Router } from '@angular/router';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
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
      email: ['', [Validators.required, Validators.pattern("^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$")]],
      nome: ['', [Validators.required, this.noNumberValidator, this.startWithSpace]],
      username: ['', [Validators.required, Validators.minLength(4) , this.noWhitespaceValidator]],
      password: ['', Validators.required],
      passwordConfirmation: ''
    });
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

  onSubmit() {

    if (this.password.value === this.passwordConfirmation.value) {
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
    return this.registerForm.get('email');
  }

  get username() {
    return this.registerForm.get('username');
  }

  get password() {
    return this.registerForm.get('password');
  }

  get passwordConfirmation() {
    return this.registerForm.get('passwordConfirmation');
  }

  get nome() {
    return this.registerForm.get('nome');
  }

  getUser(): User {
    return {
      nome: this.nome.value,
      email: this.email.value,
      username: this.username.value,
      password: this.password.value,
      enabled: true
    };
  }

}
