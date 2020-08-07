import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { Title } from '@angular/platform-browser';
import { Router } from '@angular/router';
import { debounceTime } from 'rxjs/internal/operators/debounceTime';
import { BacklogService } from 'src/app/core/services/backlog.service';

@Component({
  selector: 'app-backlog-home',
  templateUrl: './backlog-home.component.html',
  styleUrls: ['./backlog-home.component.css']
})
export class BacklogHomeComponent implements OnInit {

  config = {
    numeroSprint: "",
    nomeRequisito: ""
  }

  //filtrosListagem: FormGroup

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

  openRequisitoDetails(): void {
    this.router.navigate(['/requisito-info'])
  }

  resetarConsulta(): void {
    this.requisitos = []
    this.listarRequisitos()
  }

}
