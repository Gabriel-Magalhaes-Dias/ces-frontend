import { Component, OnInit, ViewChild, ElementRef, ChangeDetectorRef, AfterViewInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Breakpoints, BreakpointObserver } from '@angular/cdk/layout';
import { map, shareReplay } from 'rxjs/operators';
import { DrawerService } from 'src/app/shared/layout/drawer.service';
import { AuthenticationService } from 'src/app/auth/auth.service';
import { User } from 'src/app/auth/user.model';
import { Router } from '@angular/router';
@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.css']
})
export class NavComponent implements OnInit {

  @ViewChild('drawer', { static: false }) drawer: ElementRef;

  user: User;
  isLoggedIn: boolean;

  constructor(
    private changeDetectorRef: ChangeDetectorRef,
    private drawerService: DrawerService,
    private breakpointObserver: BreakpointObserver,
    private authService: AuthenticationService,
    private router: Router
  ) { }

  isHandset$: Observable<boolean> = this.breakpointObserver
    .observe(Breakpoints.Handset)
    .pipe(
      map(result => result.matches),
      shareReplay()
    );

  ngOnInit() {
    this.authService.user.subscribe(user => {
      this.user = user;
      this.isLoggedIn = !!user;
      if (this.isLoggedIn) {  
        this.getUsuario(user.id).then(() => {
        });
      }

      this.changeDetectorRef.detectChanges();
      this.drawerService.drawer = this.drawer;
    });
  }

  async getUsuario(id: number) {

  }

  getPermision(value: string) {
    return this.user.roles.find(role => role.name === value);
  }

  handleLogout() {
    this.authService.logout();
    this.router.navigate(['/']);
  }

}
