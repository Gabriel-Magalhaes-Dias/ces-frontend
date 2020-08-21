import { Component, OnInit, Input, Output } from '@angular/core';
import { Requisito } from 'src/app/shared/models/requisito';
import { BehaviorSubject } from 'rxjs';

@Component({
  selector: 'app-requisitos-sprint',
  templateUrl: './requisitos-sprint.component.html',
  styleUrls: ['./requisitos-sprint.component.css']
})
export class RequisitosSprintComponent implements OnInit {

  @Input() requisitos: Requisito[];
  @Input() entregas: Requisito[];
  @Input() checkbox: boolean;
  @Output() requisitosSelecionados = new BehaviorSubject<Requisito[]>([]);

  constructor() { }

  ngOnInit(): void { 

  }

  selecionarRequisito(requisito: Requisito) {
    this.onCheck(requisito, true)
  }

  desselecionarRequisito(requisito: Requisito) {
    this.onCheck(requisito, false)
  }

  selecionado(requisito: Requisito) {
    return  this.entregas?.find(r => r.id === requisito.id);
  }

  onCheck(value: Requisito, isChecked: boolean) {
    const req = this.requisitosSelecionados.getValue();

    if (isChecked) {
      req.push(value);
    } else {
      req.splice(req.indexOf(value), 1);
    }

    this.requisitosSelecionados.next(req);
  }
}
