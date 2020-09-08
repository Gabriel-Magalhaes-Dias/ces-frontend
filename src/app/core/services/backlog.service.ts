import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
@Injectable({
  providedIn: 'root'
})
export class BacklogService {

  private backlogUrl: string = `${environment.apiUrl}/projetos`
  private idProjeto = window.localStorage.getItem('idProjeto');

  constructor(private http: HttpClient) { }

  public getBacklog(id: number, config: any): Observable<any> {
    let params = new HttpParams();

    params = params.append('sprint', config.numeroSprint)
    params = params.append('nome', config.nomeRequisito)

    return this.http.get<any>(`${this.backlogUrl}/${window.localStorage.getItem('idProjeto')}/backlog`, { params })
  }

}
