import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { AuthenticationService } from 'src/app/auth/auth.service';

@Injectable({
  providedIn: 'root'
})
export class AdminGuard implements CanActivate {

  constructor(private router: Router,
    private authService: AuthenticationService) { }

  canActivate() {
    const user = this.authService.userValue;

    if (user && user.roles) {
      return true;

    } else {
      this.router.navigate(['/']);
      return false;
    }
  }

}
