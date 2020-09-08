import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { Router } from '@angular/router';
import { Projeto } from 'src/app/shared/models/projeto';
import { ProjetoService } from '../../core/services/projeto.service';
import { StorageService } from '../../core/services/storage.service';
import { environment } from '../../../environments/environment';

@Component({
  selector: 'app-projeto-list',
  templateUrl: './projeto-list.component.html',
  styleUrls: ['./projeto-list.component.css']
})
export class ProjetoListComponent implements OnInit {

  projetos: Projeto[]

  constructor(
    private projetoService: ProjetoService,
    private router: Router, 
    private storageService: StorageService,
    private titleService: Title
  ) { }

  ngOnInit(): void {
    this.titleService.setTitle('Projetos')
    this.listarProjetos()
  }

  listarProjetos(): void {
    this.projetoService.getProjetos().subscribe((projetos: Projeto[]) => {
      projetos.map((projeto: Projeto) => {
        projeto.dataInicio = new Date(projeto.dataInicio)
        projeto.dataFim = new Date(projeto.dataFim)
      })
      this.projetos = projetos
    })
  }

  openBacklog(id: number): void {
    environment.projetoSelecionado = id;
    this.storageService.setIdProjeto(id);
    this.router.navigateByUrl('/backlog');
  }

  openProjetoDetails(id: number): void {
    this.router.navigateByUrl('/projetos/' + id);
  }

}
