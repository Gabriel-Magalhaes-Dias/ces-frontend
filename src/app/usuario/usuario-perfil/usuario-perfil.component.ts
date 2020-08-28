import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/auth/user.model';
import { AuthenticationService } from 'src/app/auth/auth.service';
import { UsuarioService } from 'src/app/core/services/usuario.service';
import { Usuario } from 'src/app/shared/models/usuario';

@Component({
  selector: 'app-usuario-perfil',
  templateUrl: './usuario-perfil.component.html',
  styleUrls: ['./usuario-perfil.component.css']
})
export class UsuarioPerfilComponent implements OnInit {

  user: Usuario;
  idUser: number;

  constructor(private authenticationService: AuthenticationService, private usuarioService: UsuarioService) { }

  ngOnInit() {
    this.idUser = this.authenticationService.getUserId();

    this.usuarioService.get(this.idUser).subscribe(user => {
      this.user = user;
    });
  }

  
}