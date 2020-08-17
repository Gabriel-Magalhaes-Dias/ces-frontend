import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { Title } from '@angular/platform-browser';
import { Router } from '@angular/router';
import { debounceTime } from 'rxjs/internal/operators/debounceTime';
import { BacklogService } from 'src/app/core/services/backlog.service';

@Component({
  selector: 'app-backlog-cliente',
  templateUrl: './backlog-cliente.component.html',
  styleUrls: ['./backlog-cliente.component.css']
})
export class BacklogClienteComponent implements OnInit {

  config = {
    numeroSprint: "",
    nomeRequisito: ""
  }

  filtrosListagem = new FormGroup({
    estado: new FormControl(),
    sprint: new FormControl(),
    nome: new FormControl('')
  })

  requisitos: any[] = []

  constructor(private backlogService: BacklogService,
    private fb: FormBuilder,
    private router: Router, private titleService: Title) { }

  ngOnInit(): void {
    this.titleService.setTitle('Backlog')

    this.filtrosListagem = this.fb.group({
      sprint: [''],
      nome: ['']
    });

    this.filtrosListagem.get('sprint').valueChanges.subscribe((val: string) => {
      this.config.numeroSprint = val;
      this.resetarConsulta();
    });

    this.filtrosListagem.get('nome').valueChanges
      .pipe(debounceTime(400))
      .subscribe((val: string) => {
        this.config.nomeRequisito = val;
        this.resetarConsulta();
      });

    this.listarRequisitos()
  }

  listarRequisitos(): void {
    this.backlogService.getBacklog(this.config).subscribe((requisitos: any) => {
      this.requisitos = requisitos
    })
  }

  openRequisitoDetails(id: number): void {
    this.router.navigateByUrl('/requisitos/info/' + id);
  }

  estimar(id: number): void {
    this.router.navigateByUrl('/requisitos/estimar/' + id)
  }

  resetarConsulta(): void {
    this.requisitos = []
    this.listarRequisitos()
  }

}
