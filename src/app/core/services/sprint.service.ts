import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { environment } from '../../../environments/environment';
import { Sprint } from '../../shared/models/sprint';

@Injectable({
  providedIn: 'root',
})
export class SprintService {
  private sprintUrl = `${environment.apiUrl}/sprints`;

  constructor(private http: HttpClient) {}

  create(sprint: Sprint): Observable<Sprint> {
    return this.http.post<Sprint>(this.sprintUrl, sprint);
  }

  update(sprint: Sprint): Observable<Sprint> {
    return this.http.put<Sprint>(`${this.sprintUrl}/${sprint.id}`, sprint);
  }

  get(id: string): Observable<Sprint> {
    return this.http.get<Sprint>(`${this.sprintUrl}/${id}`);
  }

  getSprints(): Observable<Sprint[]> {
    return this.http.get<Sprint[]>(`${this.sprintUrl}`);
  }
}
