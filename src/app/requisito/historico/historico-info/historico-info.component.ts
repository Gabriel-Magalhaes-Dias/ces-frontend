import { UserStory } from './../../../shared/models/userStory';
import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { ActivatedRoute, Router } from '@angular/router';
import { RequisitoService } from 'src/app/core/services/requisito.service';
import { Historico } from './../../../shared/models/historico';

@Component({
  selector: 'app-historico-info',
  templateUrl: './historico-info.component.html',
  styleUrls: ['./historico-info.component.css']
})
export class HistoricoInfoComponent implements OnInit {

  idRequisito: number;
  idProjeto: number;
  idVersao: number;

  userStory: UserStory ={
    tema: "",
    comoUm: "",
    paraQueSejaPossivel: "",
    acao: ""
  }
  historico: Historico = {
    nome: "",
    observacoes: "",
    userStory: this.userStory
  };
  
  
  tipoDescricao: string;

  constructor(private requisitoService: RequisitoService, private router: Router, private routerEntrada: ActivatedRoute, private titleService: Title) { }

  ngOnInit(): void {
    this.titleService.setTitle('Informações da Versão');

    this.idProjeto = parseInt(this.routerEntrada.parent.snapshot.paramMap.get('idProjeto'));
    this.idRequisito = parseInt(this.routerEntrada.snapshot.paramMap.get('idRequisito'));
    this.idVersao = parseInt(this.routerEntrada.snapshot.paramMap.get('idVersao'));
  
    this.requisitoService.getVersao(this.idProjeto, this.idRequisito, this.idVersao).subscribe((historico) => { this.historico = historico; this.definirDescricao(historico) });

  }

  definirDescricao(historico: Historico): void {
    if (this.historico.userStory.comoUm) {
      this.tipoDescricao = "User Story";
    } else {
      this.tipoDescricao = "Não definido";
    }
  }

  voltar(): void{
    this.router.navigateByUrl('projetos/'+this.idProjeto+'/requisitos/' + this.idRequisito+ '/historico');
  }
}
