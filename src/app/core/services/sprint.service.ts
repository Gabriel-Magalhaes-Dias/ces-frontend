import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { environment } from '../../../environments/environment';
import { Sprint } from '../../shared/models/sprint';

@Injectable({
  providedIn: 'root',
})
export class SprintService {

  private projetoUrl: string = `${environment.apiUrl}/projetos`

  constructor(
    private http: HttpClient,
  ) { }

  create(sprint: Sprint): Observable<Sprint> {
    const idProjeto = window.localStorage.getItem('idProjeto');
    const sprintUrl = `${this.projetoUrl}/${idProjeto}/sprints`
    return this.http.post<Sprint>(sprintUrl, sprint);
  }

  update(sprint: Sprint): Observable<Sprint> {
    const idProjeto = window.localStorage.getItem('idProjeto');
    const sprintUrl = `${this.projetoUrl}/${idProjeto}/sprints`
    return this.http.put<Sprint>(`${sprintUrl}/${sprint.id}`, sprint);
  }

  get(id: string): Observable<Sprint> {
    const idProjeto = window.localStorage.getItem('idProjeto');
    const sprintUrl = `${this.projetoUrl}/${idProjeto}/sprints`
    return this.http.get<Sprint>(`${sprintUrl}/${id}`);
  }

  getSprints(): Observable<Sprint[]> {
    const idProjeto = window.localStorage.getItem('idProjeto');
    const sprintUrl = `${this.projetoUrl}/${idProjeto}/sprints`
    return this.http.get<Sprint[]>(`${sprintUrl}`);
  }
}
