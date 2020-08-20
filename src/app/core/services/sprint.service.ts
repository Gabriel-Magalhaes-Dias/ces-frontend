import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { environment } from '../../../environments/environment';
import { Sprint } from '../../shared/models/sprint';

@Injectable({
  providedIn: 'root'
})
export class SprintService {

  private requisitoUrl: string = `${environment.apiUrl}/sprints`;

  constructor(private http: HttpClient) { }

  salvar(sprint: Sprint): Observable<Sprint> {
    return this.http.post<Sprint>(this.requisitoUrl, sprint);
  }

  get(id: string): Observable<Sprint> {
    return of({
      id: +id,
      numeroSprint: 1,
      estado: "nova",
      dataInicio: new Date(),
      dataFim: new Date(),
      valorEntregueAoNegocio: "Valor ",
      valorAprovadoCliente: false,
      entregas: [{ nome: 'Requisito 01' }, { nome: 'Requisito 02' }]
    })
  }

  getSprints(): Observable<Sprint[]> {
    return of([{
      id: 1,
      numeroSprint: 1,
      estado: "nova",
      dataInicio: new Date(),
      dataFim: new Date(),
      valorEntregueAoNegocio: "Valor ",
      valorAprovadoCliente: false,
      entregas: [{ nome: 'Requisito 01' }, { nome: 'Requisito 02' }]
    }, {
      id: 2,
      numeroSprint: 2,
      estado: "nova",
      dataInicio: new Date(),
      dataFim: new Date(),
      valorEntregueAoNegocio: "Valor?",
      valorAprovadoCliente: false,
      entregas: [{ nome: 'Requisito 01' }, { nome: 'Requisito 02' }]
    }])
  }

}
