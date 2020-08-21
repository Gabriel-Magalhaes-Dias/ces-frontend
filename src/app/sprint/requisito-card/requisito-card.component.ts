import { Component, OnInit, Input, Output } from '@angular/core';
import { Requisito } from 'src/app/shared/models/requisito';
import { BehaviorSubject } from 'rxjs';

@Component({
  selector: 'app-requisito-card',
  templateUrl: './requisito-card.component.html',
  styleUrls: ['./requisito-card.component.css']
})
export class RequisitoCardComponent implements OnInit {

  @Input() requisito: Requisito;
  @Input() checkbox: boolean;
  @Input() selecionado: boolean;
  @Output() selecionar = new BehaviorSubject<Requisito>(undefined);
  @Output() desselecionar = new BehaviorSubject<Requisito>(undefined);  

  constructor() { }

  ngOnInit(): void {
    if(this.selecionado){this.selecionar.next(this.requisito)}
  }

  onCheck(value: Requisito, isChecked: boolean) {
    if (isChecked) {
      this.selecionar.next(value);
    } else {
      this.desselecionar.next(value);
    }
  }

}
