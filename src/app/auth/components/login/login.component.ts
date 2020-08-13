import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthenticationService } from 'src/app/auth/auth.service';
import { NotificationService } from 'src/app/core/services/notification.service';
import { User } from '../../user.model';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  loginForm: FormGroup;
  user: User;
  isLoginFailed = false;
  errorMessage = '';
  roles: string[] = [];

  constructor(
    private alertService: NotificationService,
    private authService: AuthenticationService,
    private fb: FormBuilder,
    private router: Router
  ) {
    this.createForm();
  }

  createForm() {
    this.loginForm = this.fb.group({
      username: '',
      password: '',
    });
  }

  ngOnInit() {
    this.user = this.authService.userValue;
    if (this.user) {
      this.router.navigate(['/']);
    }
  }

  onSubmit() {
    this.authService.login(this.loginForm.value).subscribe(
      data => {
        this.isLoginFailed = false;
        this.router.navigate(['/']);

      },
      err => {
        this.errorMessage = err.error.message;
        this.alertService.error(this.errorMessage);
        this.isLoginFailed = true;
      }

    );

    /*
    this.authenticationService.authenticationService(this.username, this.password).subscribe((result) => {
      this.invalidLogin = false;
      this.loginSuccess = true;
      this.successMessage = 'Login Successful.';
      this.router.navigate(['/republicas']);
    }, () => {
      this.invalidLogin = true;
      this.loginSuccess = false;
    });*/
  }

}
