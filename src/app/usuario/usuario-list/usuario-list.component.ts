import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { Title } from '@angular/platform-browser';
import { Router } from '@angular/router';
import { merge, of } from 'rxjs';
import { catchError, debounceTime, map, startWith, switchMap } from 'rxjs/operators';
import { NotificationService } from 'src/app/core/services/notification.service';
import { ConfirmDialogComponent, DialogData } from 'src/app/shared/confirm-dialog/confirm-dialog.component';
import { UsuarioService } from '../../core/services/usuario.service';
import { Usuario } from '../../shared/models/usuario';

@Component({
  selector: 'app-usuario-list',
  templateUrl: './usuario-list.component.html',
  styleUrls: ['./usuario-list.component.css']
})
export class UsuarioListComponent implements OnInit, AfterViewInit {

  displayedColumns: string[] = ['position', 'nome', 'username', 'email',  'ativo', 'numProjetosCriados', 'numProjetosEnvolvidos', 'acoes']
  // exampleDatabase: ExampleHttpDatabase | null;
  data: Usuario[] = []

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

  constructor(private usuarioService: UsuarioService,
    private dialog: MatDialog,
    private fb: FormBuilder,
    private notificationService: NotificationService,
    private router: Router, private titleService: Title) { }

  ngOnInit(): void {
    this.titleService.setTitle('Usuarios');

    this.search.get('nome').valueChanges
      .pipe(debounceTime(400))
      .subscribe((val: string) => {
        this.nome = this.search.get('nome').value
        this.paginator.pageIndex = 0
        this.listarUsuarios()
      });
  }

  ngAfterViewInit() {

    this.listarUsuarios()
  }

  listarUsuarios(): void {
    // If the user changes the sort order, reset back to the first page.
    this.sort.sortChange.subscribe(() => this.paginator.pageIndex = 0);



    merge(this.sort.sortChange, this.paginator.page)
      .pipe(
        startWith({}),
        switchMap(() => {
          this.isLoadingResults = true;
          return this.usuarioService.getUsuarios(
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

          return data.body as Usuario[];
        }),
        catchError(() => {
          this.isLoadingResults = false;
          this.isRateLimitReached = true;
          return of([]);
        })
      ).subscribe(data => this.data = data);
  }

  editar(id: number): void {
    this.router.navigateByUrl('usuarios/novo/' + id);
  }

  excluir(id: number): void {
    const config = {
      data: {
        title: 'Confirmar Exclusão',
        message: 'Deseja excluir o usuário?'
      } as DialogData
    }
    const dialogRef = this.dialog.open(ConfirmDialogComponent, config)
    dialogRef.afterClosed().subscribe((opcao: boolean) => {
      if (opcao) {
        this.usuarioService.excluir(id).subscribe(() => {
          this.notificationService.success('Usuário excluído com sucesso')
          this.listarUsuarios()
        })
      }
    })
  }

}