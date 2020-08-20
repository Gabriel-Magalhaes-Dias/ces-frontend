import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { Router } from '@angular/router';
import { Sprint } from 'src/app/shared/models/sprint';
import { SprintService } from 'src/app/core/services/sprint.service';

@Component({
  selector: 'app-sprint-list',
  templateUrl: './sprint-list.component.html',
  styleUrls: ['./sprint-list.component.css']
})
export class SprintListComponent implements OnInit {

  sprints: Sprint[]

  constructor(
    private sprintService: SprintService,
    private titleService: Title
  ) { }

  ngOnInit(): void {
    this.titleService.setTitle('Sprints');
    this.sprintService.getSprints()
      .subscribe(sprints => {
        this.sprints = sprints
      });
  }
}
