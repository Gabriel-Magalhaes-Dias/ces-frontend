import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs/internal/BehaviorSubject';

import { Projeto } from '../../shared/models/projeto';

@Injectable({
  providedIn: 'root'
})
export class StorageService {

  constructor() { }

  setIdProjeto(id: number) {
    window.localStorage.setItem('idProjeto', id + '');
  }

}
