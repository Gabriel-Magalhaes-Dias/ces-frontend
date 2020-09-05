import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { Title } from '@angular/platform-browser';
import { ActivatedRoute, Router } from '@angular/router';
import { debounceTime } from 'rxjs/operators';
import { RequisitoService } from 'src/app/core/services/requisito.service';
import { Historico } from './../../../shared/models/historico';

@Component({
  selector: 'app-historico-list',
  templateUrl: './historico-list.component.html',
  styleUrls: ['./historico-list.component.css']
})
export class HistoricoListComponent implements OnInit {

  historico: Historico[];
  total: Historico[];
  idRequisito: number;
  idProjeto: number;

  config = {
    nomeRequisito: "",
    estado: "",
    ordenarPor: ""
  }

  filtrosListagem = new FormGroup({
    estado: new FormControl(),
    versao: new FormControl(),
    nome: new FormControl(''),
    ordenarPor: new FormControl()
  })

  constructor(private requisitoService: RequisitoService, private fb: FormBuilder, private router: Router, private routeEntrada: ActivatedRoute, private titleService: Title) { }

  ngOnInit(): void {
    this.titleService.setTitle('Histórico');

    this.filtrosListagem = this.fb.group({
      versao: [''],
      nome: [''],
      estado: [''],
      ordenarPor: ['']
    });

    this.idProjeto = parseInt(this.routeEntrada.parent.snapshot.paramMap.get('idProjeto'));
    this.idRequisito = parseInt(this.routeEntrada.snapshot.params['id']);

    this.requisitoService.getHistoricoFiltro(this.idProjeto, this.idRequisito, this.config).subscribe((historico) => { this.historico = historico; this.total = historico });


    this.filtrosListagem.get('versao').valueChanges.subscribe((val: number) => {
      this.historico = [];
      if (val == 0) {
        this.requisitoService.getHistorico(this.idProjeto, this.idRequisito).subscribe((historico) => { this.historico = historico; this.total = historico });
      } else {
        this.requisitoService.getVersao(this.idProjeto, this.idRequisito, val).subscribe((versao) => { this.historico.push(versao); });
        this.requisitoService.getHistorico(this.idProjeto, this.idRequisito).subscribe((historico) => { this.total = historico });
      }
    });

    this.filtrosListagem.get('nome').valueChanges
      .pipe(debounceTime(400))
      .subscribe((val: string) => {
        this.config.nomeRequisito = val;
        this.resetarConsulta();
      });

    this.filtrosListagem.get('estado').valueChanges.subscribe((val: string) => {
      this.config.estado = val;
      this.resetarConsulta();
    });

    this.filtrosListagem.get('ordenarPor').valueChanges.subscribe((val: string) => {
      this.config.ordenarPor = val;
      this.resetarConsulta();
    });

  }

  exibirVersao(idVersao: number): void {
    this.router.navigateByUrl('projetos/'+this.idProjeto+'/requisitos/' + this.idRequisito + '/versao/' + idVersao);
  }

  listarVersoes(): void {
    this.requisitoService.getHistoricoFiltro(this.idProjeto, this.idRequisito, this.config).subscribe((historico) => { this.historico = historico; });
  }

  resetarConsulta(): void {
    this.historico = [];
    this.listarVersoes();
  }

  voltar(): void{
    this.router.navigateByUrl('projetos/'+this.idProjeto+'/requisitos/info/' + this.idRequisito);
  }

}
