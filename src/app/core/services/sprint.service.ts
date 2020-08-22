import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { environment } from '../../../environments/environment';
import { Sprint } from '../../shared/models/sprint';

@Injectable({
  providedIn: 'root',
})
export class SprintService {
  private sprintUrl: string = `${environment.apiUrl}/sprints`;

  constructor(private http: HttpClient) {}

  salvar(sprint: Sprint): Observable<Sprint> {
    return this.http.post<Sprint>(this.sprintUrl, sprint);
  }

  get(id: string): Observable<Sprint> {
    return this.http.get<Sprint>(`${this.sprintUrl}/${id}`);
    /*
    return of({
      id: +id,
      numeroSprint: 1,
      estado: 'nova',
      dataInicio: new Date(),
      dataFim: new Date(),
      valorEntregueAoNegocio: 'Valor ',
      valorAprovadoCliente: false,
      entregas: [
        {
          id: 1,
          nome: 'Manter backlog',
          observacoes: '',
          prioridade: 99,
          dataInicio: 1597965691269,
          dataEntrega: 1597965691269,
          idade: 4,
          estado: 'novo',
          recuperado: 0,
          userStory: {
            id: 1,
            comoUm: '',
            acao: '',
            paraQueSejaPossivel: '',
            tema: '',
          },
        },
        {
          id: 2,
          nome: 'Manter sprint',
          observacoes: '',
          prioridade: 90,
          dataInicio: 1597965691315,
          dataEntrega: 1597965691315,
          idade: 8,
          estado: 'novo',
          recuperado: 0,
          userStory: {
            id: 2,
            comoUm: '',
            acao: '',
            paraQueSejaPossivel: '',
            tema: '',
          },
        },
      ],
    });
    */
  }

  getSprints(): Observable<Sprint[]> {
    return this.http.get<Sprint[]>(`${this.sprintUrl}`);
    /*return of([
      {
        id: 1,
        numeroSprint: 1,
        estado: 'nova',
        dataInicio: new Date(),
        dataFim: new Date(),
        valorEntregueAoNegocio: 'Valor ',
        valorAprovadoCliente: false,
        entregas: [{ nome: 'Requisito 01' }, { nome: 'Requisito 02' }],
      },
      {
        id: 2,
        numeroSprint: 2,
        estado: 'nova',
        dataInicio: new Date(),
        dataFim: new Date(),
        valorEntregueAoNegocio: 'Valor?',
        valorAprovadoCliente: false,
        entregas: [{ nome: 'Requisito 01' }, { nome: 'Requisito 02' }],
      },
    ]);
  */
  }
}
