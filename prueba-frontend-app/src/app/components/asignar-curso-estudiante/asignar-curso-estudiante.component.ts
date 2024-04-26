import { Component } from '@angular/core';
import { NavbarComponent } from '../navbar/navbar.component';
import { CommonModule } from '@angular/common';
import { CursoService } from '../../services/curso.service';
import { Router } from '@angular/router';
import { EstudianteService } from '../../services/estudiante.service';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { Subject, catchError, finalize, of, takeUntil, tap } from 'rxjs';
import { HttpErrorResponse } from '@angular/common/http';
import { CursoEstudiantesService } from '../../services/curso-estudiantes.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MaterialModule } from '../../material.module';

@Component({
  selector: 'app-asignar-curso-estudiante',
  standalone: true,
  imports: [NavbarComponent, CommonModule, ReactiveFormsModule, MaterialModule],
  templateUrl: './asignar-curso-estudiante.component.html',
  styleUrl: './asignar-curso-estudiante.component.css'
})
export class AsignarCursoEstudianteComponent {
  private unsubscribe$ = new Subject<void>();
  cursos: any[] = [];
  estudiantes: any[] = [];
  formCursoEstudiante!: FormGroup;

  constructor(private _cursoService: CursoService,
    private _estudiantesService: EstudianteService,
    private _cursoEstudianteService: CursoEstudiantesService,
    private snackBar: MatSnackBar,
    private router: Router) { }

  ngOnInit(): void {
    this.obtenerCursos();
    this.obtenerEstudiantes();
    this.formCursoEstudiante = new FormGroup({
      curso: new FormControl(""),
      estudiante: new FormControl("")
    })
  }

  obtenerCursos(): void {
    this._cursoService.obtenerCursos()
      .subscribe(cursos => {
        this.cursos = cursos;
      });
  }

  obtenerEstudiantes(): void {
    this._estudiantesService.obtenerEstudiantes()
      .subscribe(estudiantes => {
        this.estudiantes = estudiantes;
      });
  }

  agregarCurso() {
    const idEstudiante: number = parseInt(this.formCursoEstudiante.get('estudiante')?.value);
    const listIdCurso = this.formCursoEstudiante.get('curso')?.value.map((value: any) => parseInt(value))
    this._cursoEstudianteService.asignarCursos(idEstudiante , listIdCurso).pipe(
      tap(response => {
        this.snackBarExito();
        this.router.navigateByUrl('/dashboard');
      }),
      catchError((error: HttpErrorResponse) => {
        console.error("error: ", error)
        return of(null);
      }),
      finalize(() => {
      }),
      takeUntil(this.unsubscribe$)
    ).subscribe();
  }

  snackBarExito() {
    this.snackBar.open('Operación exitosa', 'Cerrar', {
      duration: 5000,
    });
  }
}
