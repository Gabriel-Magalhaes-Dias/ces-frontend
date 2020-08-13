import { Requisito } from 'src/app/shared/models/requisito';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})


export class RequisitoService {

  private requisitoUrl: string = 'http://localhost:8080/requisitos'

  constructor(private http: HttpClient) { }

  salvar(requisito: Requisito): Observable<Requisito> {
    return this.http.post<Requisito>(this.requisitoUrl, requisito);
  }

  get(id: number): Observable<Requisito> {
    return this.http.get<Requisito>(`${this.requisitoUrl}/${id}`)
  }

  alterar(requisito : Requisito, id:number): Observable<Requisito> {
    return this.http.put<Requisito>(`${this.requisitoUrl}/${id}`, requisito);
  }

  deletar(id: number): Observable<void> {
    return this.http.delete<void>(`${this.requisitoUrl}/${id}`);
  }
}