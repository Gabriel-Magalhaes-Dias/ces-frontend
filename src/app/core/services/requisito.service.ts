import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Requisito } from '../../shared/models/requisito';
import { Historico } from './../../shared/models/historico';

@Injectable({
  providedIn: 'root'
})

export class RequisitoService {

  private requisitoUrl: string = `${environment.apiUrl}/projetos`
  private idProjeto = window.localStorage.getItem('idProjeto')

  constructor(private http: HttpClient) { }

  public getRequisitosByEstado(estado: string): Observable<Requisito[]> {
    return this.http.get<Requisito[]>(`${this.requisitoUrl}/${this.idProjeto}/requisitos/estado/${estado}`);
  }

  salvar(idProjeto: number, requisito: Requisito): Observable<Requisito> {
    return this.http.post<Requisito>(`${this.requisitoUrl}/${this.idProjeto}/requisitos`, requisito);
  }

  get(idProjeto: number, id: number): Observable<Requisito> {
    return this.http.get<Requisito>(`${this.requisitoUrl}/${this.idProjeto}/requisitos/${id}`)
  }

  alterar(idProjeto: number, requisito: Requisito, id: number): Observable<Requisito> {
    return this.http.put<Requisito>(`${this.requisitoUrl}/${this.idProjeto}/requisitos/${id}`, requisito);
  }

  deletar(idProjeto: number, id: number): Observable<void> {
    return this.http.delete<void>(`${this.requisitoUrl}/${this.idProjeto}/requisitos/${id}`);
  }

  priorizar(idProjeto: number, id: number, prioridade: any): Observable<void> {
    return this.http.put<void>(`${this.requisitoUrl}/${this.idProjeto}/requisitos/${id}/priorizar`, prioridade);
  }

  estimar(idProjeto: number, id: number, estimativa: any): Observable<void> {
    return this.http.put<void>(`${this.requisitoUrl}/${this.idProjeto}/requisitos/${id}/estimar`, estimativa);
  }

  getHistorico(idProjeto: number, id: number): Observable<Historico[]> {
    return this.http.get<Historico[]>(`${this.requisitoUrl}/${this.idProjeto}/requisitos/${id}/historico`);
  }

  getHistoricoFiltro(idProjeto: number, id: number, config: any): Observable<Historico[]> {
    let params = new HttpParams();

    params = params.append('estado', config.estado)
    params = params.append('nome', config.nomeRequisito)
    return this.http.get<Historico[]>(`${this.requisitoUrl}/${this.idProjeto}/requisitos/${id}/historico`, { params });
  }

  getVersao(idProjeto: number, idRequisito: number, idVersao: number): Observable<Historico> {
    return this.http.get<Historico>(`${this.requisitoUrl}/${this.idProjeto}/requisitos/${idRequisito}/versao/${idVersao}`);
  }
}