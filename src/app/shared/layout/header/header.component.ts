import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { AuthenticationService } from 'src/app/auth/auth.service';
import { User } from 'src/app/auth/user.model';
import {DrawerService} from 'src/app/shared/layout/drawer.service';
import { Solicitacao } from 'src/app/shared/models/solicitacao';


@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  solicitacoes: Solicitacao[] = [];
  isLoggedIn = false;
  user: User;

  constructor( private authenticationService: AuthenticationService,
               private drawerService: DrawerService) { }

  ngOnInit() {
    this.authenticationService.user.subscribe(user => {
      this.user = user;
      this.isLoggedIn = !!user;
    });
  }

  visualizarNotificacoes(): void {
    throw new Error('Method not implemented.');
  }
  atualizarListaSolicitacoes() {
    throw new Error('Method not implemented.');
  }

  logout(): void {
    this.authenticationService.logout();
    window.location.reload();
  }

  onToggleDrawer() {
    this.drawerService.toggleDrawer();
  }


}
