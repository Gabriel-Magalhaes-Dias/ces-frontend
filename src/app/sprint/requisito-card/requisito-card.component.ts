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
  @Output() selecionado = new BehaviorSubject<Requisito>(undefined);
  @Output() desselecionado = new BehaviorSubject<Requisito>(undefined);  

  constructor() { }

  ngOnInit(): void {
    if(!this.checkbox){ }
  }

  onCheck(value: Requisito, isChecked: boolean) {
    if (isChecked) {
      this.selecionado.next(value);
    } else {
      this.desselecionado.next(value);
    }
  }

}
