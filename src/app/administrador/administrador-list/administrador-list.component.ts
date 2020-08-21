import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { Title } from '@angular/platform-browser';
import { Router } from '@angular/router';
import { merge, of } from 'rxjs';
import { catchError, debounceTime, map, startWith, switchMap } from 'rxjs/operators';
import { AdministradorService } from 'src/app/core/services/administrador.service';
import { NotificationService } from 'src/app/core/services/notification.service';
import { ConfirmDialogComponent, DialogData } from 'src/app/shared/confirm-dialog/confirm-dialog.component';
import { Administrador } from 'src/app/shared/models/administrador';

@Component({
  selector: 'app-administrador-list',
  templateUrl: './administrador-list.component.html',
  styleUrls: ['./administrador-list.component.css']
})
export class AdministradorListComponent implements OnInit, AfterViewInit {

  displayedColumns: string[] = ['position', 'nome', 'username', 'email', 'ativo', 'acoes']
  // exampleDatabase: ExampleHttpDatabase | null;
  data: Administrador[] = []

  resultsLength = 0;
  isLoadingResults = true;
  isRateLimitReached = false;

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  config = {
    nome: "",
    pagina: 0,
    itemsPorPagina: 20
  }

  search = new FormGroup({
    nome: new FormControl("")
  })

  nome: string = ""

  constructor(private administradorService: AdministradorService,
    private dialog: MatDialog,
    private fb: FormBuilder,
    private notificationService: NotificationService,
    private router: Router, private titleService: Title) { }

  ngOnInit(): void {
    this.titleService.setTitle('Administradores');

    this.search.get('nome').valueChanges
      .pipe(debounceTime(400))
      .subscribe((val: string) => {
        this.nome = this.search.get('nome').value
        this.paginator.pageIndex = 0
        this.listarAdministradores()
      });
  }

  ngAfterViewInit() {

    this.listarAdministradores()
  }

  listarAdministradores(): void {
    // If the user changes the sort order, reset back to the first page.
    this.sort.sortChange.subscribe(() => this.paginator.pageIndex = 0);



    merge(this.sort.sortChange, this.paginator.page)
      .pipe(
        startWith({}),
        switchMap(() => {
          this.isLoadingResults = true;
          return this.administradorService.getAdministradores(
            {
              nome: this.nome,
              pagina: this.paginator.pageIndex,
              itemsPorPagina: 10
            }
          )
        }),
        map(data => {
          // Flip flag to show that loading has finished.
          this.isLoadingResults = false;
          this.isRateLimitReached = false;
          this.resultsLength = 40//data.headers.get('X-Total-Count')

          return data.body as Administrador[];
        }),
        catchError(() => {
          this.isLoadingResults = false;
          this.isRateLimitReached = true;
          return of([]);
        })
      ).subscribe(data => this.data = data);
  }

  editar(id: number): void {
    this.router.navigateByUrl('/administradores/novo/' + id);
  }

  excluir(id: number): void {
    const config = {
      data: {
        title: 'Confirmar Exclusão',
        message: 'Deseja excluir o administrador?'
      } as DialogData
    }
    const dialogRef = this.dialog.open(ConfirmDialogComponent, config)
    dialogRef.afterClosed().subscribe((opcao: boolean) => {
      if (opcao) {
        this.administradorService.excluir(id).subscribe(() => {
          this.notificationService.success('Administrador excluído com sucesso')
          this.listarAdministradores()
        })
      }
    })
  }

}
