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
    this.idProjeto = window.localStorage.getItem('idProjeto');
    return this.http.get<Requisito[]>(`${this.requisitoUrl}/${this.idProjeto}/requisitos/estado/${estado}`);
  }

  salvar(requisito: Requisito): Observable<Requisito> {
    this.idProjeto = window.localStorage.getItem('idProjeto');
    return this.http.post<Requisito>(`${this.requisitoUrl}/${this.idProjeto}/requisitos`, requisito);
  }

  get(id: number): Observable<Requisito> {
    this.idProjeto = window.localStorage.getItem('idProjeto');
    return this.http.get<Requisito>(`${this.requisitoUrl}/${this.idProjeto}/requisitos/${id}`)
  }

  alterar(requisito: Requisito, id: number): Observable<Requisito> {
    this.idProjeto = window.localStorage.getItem('idProjeto');
    return this.http.put<Requisito>(`${this.requisitoUrl}/${this.idProjeto}/requisitos/${id}`, requisito);
  }

  deletar(id: number): Observable<void> {
    this.idProjeto = window.localStorage.getItem('idProjeto');
    return this.http.delete<void>(`${this.requisitoUrl}/${this.idProjeto}/requisitos/${id}`);
  }

  priorizar(id: number, prioridade: any): Observable<void> {
    this.idProjeto = window.localStorage.getItem('idProjeto');
    return this.http.put<void>(`${this.requisitoUrl}/${this.idProjeto}/requisitos/${id}/priorizar`, prioridade);
  }

  estimar(id: number, estimativa: any): Observable<void> {
    this.idProjeto = window.localStorage.getItem('idProjeto');
    return this.http.put<void>(`${this.requisitoUrl}/${this.idProjeto}/requisitos/${id}/estimar`, estimativa);
  }

  getHistorico(id: number): Observable<Historico[]> {
    this.idProjeto = window.localStorage.getItem('idProjeto');
    return this.http.get<Historico[]>(`${this.requisitoUrl}/${this.idProjeto}/requisitos/${id}/historico`);
  }

  getHistoricoFiltro(id: number, config: any): Observable<Historico[]> {
    this.idProjeto = window.localStorage.getItem('idProjeto');
    let params = new HttpParams();

    params = params.append('estado', config.estado)
    params = params.append('nome', config.nomeRequisito)
    return this.http.get<Historico[]>(`${this.requisitoUrl}/${this.idProjeto}/requisitos/${id}/historico`, { params });
  }

  getVersao(idRequisito: number, idVersao: number): Observable<Historico> {
    this.idProjeto = window.localStorage.getItem('idProjeto');
    return this.http.get<Historico>(`${this.requisitoUrl}/${this.idProjeto}/requisitos/${idRequisito}/versao/${idVersao}`);
  }
}