import { Component, OnInit, Input, Output } from '@angular/core';
import { Requisito } from 'src/app/shared/models/requisito';
import { BehaviorSubject } from 'rxjs';
import { Entrega } from 'src/app/shared/models/entrega';

@Component({
  selector: 'app-requisitos-sprint',
  templateUrl: './requisitos-sprint.component.html',
  styleUrls: ['./requisitos-sprint.component.css']
})
export class RequisitosSprintComponent implements OnInit {

  @Input() entregas: Entrega[];
  @Input() requisitos: Requisito[];
  @Input() checkbox: boolean;
  @Output() requisitosSelecionados = new BehaviorSubject<Requisito[]>([]);

  constructor() { }

  ngOnInit() {
    this.entregas?.map(entrega => {
      this.requisitos?.map(requisito => {
          if(entrega.requisito.id === requisito.id) {
            this.onCheck(requisito, true);
          }
        });
      })
  }

  selecionado(requisito: Requisito) {
    return this.entregas?.find(entrega => entrega.requisito.id === requisito.id);
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
