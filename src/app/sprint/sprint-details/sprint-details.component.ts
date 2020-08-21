import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Title } from '@angular/platform-browser';
import { Router, ActivatedRoute } from '@angular/router';
import { ConfirmDialogComponent, DialogData } from 'src/app/shared/confirm-dialog/confirm-dialog.component';
import { SprintService } from 'src/app/core/services/sprint.service';
import { Sprint } from 'src/app/shared/models/sprint';

@Component({
  selector: 'app-sprint-details',
  templateUrl: './sprint-details.component.html',
  styleUrls: ['./sprint-details.component.css']
})
export class SprintDetailsComponent implements OnInit {

  idSprint: string;
  sprint: Sprint;

  constructor(
    private route: ActivatedRoute,
    private dialog: MatDialog, 
    private router: Router, 
    private titleService: Title,
    private sprintService: SprintService
  ) { }

  ngOnInit(): void {
    this.titleService.setTitle('Informações da Sprint');
    this.idSprint = this.route.snapshot.params.id;
    this.sprintService.get(this.idSprint)
      .subscribe(sprint => this.sprint = sprint)
  }

  iniciarSprint(): void {
    const config = {
      data: {
        title: 'Iniciar Sprint',
        message: 'Deseja iniciar a sprint?'
      } as DialogData
    }
    const dialogRef = this.dialog.open(ConfirmDialogComponent, config)
    dialogRef.afterClosed().subscribe((opcao: boolean) => {
      if (opcao) {
        this.router.navigate(['/backlog'])
      }
    })
  }

  edit(id: number) {
    this.router.navigate([`/sprints/edit/${id}`])
  }

}
