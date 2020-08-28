import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Usuario } from '../../shared/models/usuario';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class UsuarioService {

  private usuarioUrl: string = `${environment.apiUrl}/user/usuarios`

  constructor(private http: HttpClient) { }

  getUsuarios(config: any): Observable<any> {
    let params = new HttpParams();

    params = params.append('nome', config.nome)
    params = params.append('pagina', config.pagina)
    params = params.append('itemsPorPagina', config.itemsPorPagina)

    return this.http.get<any>(this.usuarioUrl, { params, observe: 'response' })
  }

  get(id: number): Observable<Usuario> {
    return this.http.get<Usuario>(`${this.usuarioUrl}/${id}`)
  }

  salvar(usuario: Usuario): Observable<Usuario> {
    return this.http.post<Usuario>(this.usuarioUrl, usuario);
  }

  update(id: number, usuario: Usuario): Observable<Usuario> {
    return this.http.put<Usuario>(`${this.usuarioUrl}/${id}`, usuario)
  }

  updatePassword(novaSenha: string): Observable<void> {
    return this.http.put<void>(`${this.usuarioUrl}/password`, novaSenha)
  }

  excluir(id: number): Observable<void> {
    return this.http.delete<void>(`${this.usuarioUrl}/${id}`);
  }
}
