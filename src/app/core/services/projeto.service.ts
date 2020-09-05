import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/internal/Observable';
import { environment } from '../../../environments/environment';
import { Projeto } from '../../shared/models/projeto';

@Injectable({
  providedIn: 'root'
})
export class ProjetoService {

  
  private projetoUrl: string = `${environment.apiUrl}/projetos`

  constructor(private http: HttpClient) { }

  salvar(projeto: Projeto): Observable<Projeto> {
    return this.http.post<Projeto>(this.projetoUrl, projeto);
  }

  get(id: number): Observable<Projeto> {
    return this.http.get<Projeto>(`${this.projetoUrl}/${id}`)
  }

  getProjetos(): Observable<Projeto[]> {
    return this.http.get<Projeto[]>(this.projetoUrl)
  }

  alterar(id: number, projeto: Projeto): Observable<Projeto> {
    return this.http.put<Projeto>(`${this.projetoUrl}/${id}`, projeto);
  }

  deletar(id: number): Observable<void> {
    return this.http.delete<void>(`${this.projetoUrl}/${id}`);
  }

}
