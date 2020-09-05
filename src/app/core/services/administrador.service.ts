import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Administrador } from 'src/app/shared/models/administrador';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AdministradorService {

  private administradorUrl: string = `${environment.apiUrl}/admin/administradores`

  constructor(private http: HttpClient) { }

  getAdministradores(config: any): Observable<any> {
    let params = new HttpParams();

    params = params.append('nome', config.nome)
    params = params.append('pagina', config.pagina)
    params = params.append('itemsPorPagina', config.itemsPorPagina)

    return this.http.get<any>(this.administradorUrl, { params, observe: 'response' })
  }

  get(id: number): Observable<Administrador> {
    return this.http.get<Administrador>(`${this.administradorUrl}/${id}`)
  }

  salvar(administrador: Administrador): Observable<Administrador> {
    return this.http.post<Administrador>(this.administradorUrl, administrador);
  }

  update(id: number, administrador: Administrador): Observable<Administrador> {
    return this.http.put<Administrador>(`${this.administradorUrl}/${id}`, administrador)
  }

  excluir(id: number): Observable<void> {
    return this.http.delete<void>(`${this.administradorUrl}/${id}`);
  }

}
