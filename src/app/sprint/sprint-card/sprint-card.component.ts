import { Component, OnInit, Input } from '@angular/core';
import { Router } from '@angular/router';
import { Sprint } from 'src/app/shared/models/sprint';

@Component({
  selector: 'app-sprint-card',
  templateUrl: './sprint-card.component.html',
  styleUrls: ['./sprint-card.component.css']
})
export class SprintCardComponent implements OnInit {

  @Input() sprint: Sprint;

  constructor(private router: Router) { }

  ngOnInit(): void {
  }

  openSpringDetails(): void {
    this.router.navigate([`/sprints/info/${this.sprint.id}`])
  }
  configureSprint(){
    this.router.navigate([`/sprints/configure/${this.sprint.id}`])
  }
}
