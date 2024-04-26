import { Component, OnInit } from '@angular/core';
import { NavbarComponent } from '../../navbar/navbar.component';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Subject, catchError, finalize, of, takeUntil, tap } from 'rxjs';
import { HttpErrorResponse } from '@angular/common/http';
import { ActivatedRoute, Router } from '@angular/router';
import { CursoService } from '../../../services/curso.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MaterialModule } from '../../../material.module';

@Component({
  selector: 'app-mnto-cursos',
  standalone: true,
  imports: [NavbarComponent, CommonModule, ReactiveFormsModule, MaterialModule],
  templateUrl: './mnto-cursos.component.html',
  styleUrl: './mnto-cursos.component.css'
})
export class MntoCursosComponent implements OnInit {
  private unsubscribe$ = new Subject<void>();
  formMntoCurso!: FormGroup;
  modoEdicion = false;
  cursoId: number | undefined;
  textoBoton = "Agregar";
  accion = "Nuevo"

  constructor(private _cursoService: CursoService,
    private router: Router,
    private route: ActivatedRoute,
    private snackBar: MatSnackBar
  ) { }

  ngOnInit(): void {
    this.formMntoCurso = new FormGroup({
      nombre: new FormControl("", [Validators.required, Validators.maxLength(50)]),
      horario: new FormControl(""),
      fechaInicio: new FormControl("", Validators.required),
      fechaFin: new FormControl("", Validators.required),
      tipo: new FormControl("", Validators.required),
    })

    this.route.params.subscribe(params => {
      this.cursoId = params['id'];
      if (this.cursoId) {
        this.textoBoton = "Editar";
        this.accion = this.textoBoton;
        this.modoEdicion = true;
        this._cursoService.obtenerCursoPorId(this.cursoId).pipe(
          tap(response => {
            if (response) {
              this.formMntoCurso.patchValue(response);
              response.tipo === "Virtual" ? this.formMntoCurso.controls['tipo'].setValue(1) : this.formMntoCurso.controls['tipo'].setValue(2);
              this.formMntoCurso.controls['fechaInicio'].setValue(response.fecha_inicio)
              this.formMntoCurso.controls['fechaFin'].setValue(response.fecha_fin)
            }
          }),
          catchError((error: HttpErrorResponse) => {
            return of(null);
          }),
          takeUntil(this.unsubscribe$)
        ).subscribe();
      }
    });
  }

  ngOnDestroy(): void {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }

  agregarCurso() {
    this.markFormGroupTouched(this.formMntoCurso);
    if (this.formMntoCurso.valid) {
      if (!this.modoEdicion) {
        const request = {
          nombre: this.formMntoCurso.get('nombre')?.value,
          horario: this.formMntoCurso.get('horario')?.value,
          fecha_inicio: this.formMntoCurso.get('fechaInicio')?.value,
          fecha_fin: this.formMntoCurso.get('fechaFin')?.value,
          tipo: this.formMntoCurso.get('tipo')?.value == '1' ? 'Virtual' : 'Presencial',
        };
        this._cursoService.agregarCurso(request).pipe(
          tap(response => {
            this.snackBarExito();
            this.router.navigateByUrl('/curso');
          }),
          catchError((error: HttpErrorResponse) => {
            console.error("No se pudo agregar el curso")
            return of(null);
          }),
          finalize(() => {
          }),
          takeUntil(this.unsubscribe$)
        ).subscribe();
      } else {
        this.editarCurso()
      }
    }
  }

  snackBarExito() {
    this.snackBar.open('Operación exitosa', 'Cerrar', {
      duration: 5000,
    });
  }

  editarCurso() {
    if (this.cursoId) {
      const request = {
        nombre: this.formMntoCurso.get('nombre')?.value,
        horario: this.formMntoCurso.get('horario')?.value,
        fecha_inicio: this.formMntoCurso.get('fechaInicio')?.value,
        fecha_fin: this.formMntoCurso.get('fechaFin')?.value,
        tipo: this.formMntoCurso.get('tipo')?.value == '1' ? 'Virtual' : 'Presencial',
      };
      this._cursoService.editarCurso(this.cursoId, request).pipe(
        tap(response => {
          this.snackBarExito();
          this.router.navigateByUrl('/curso');
        }),
        catchError((error: HttpErrorResponse) => {
          console.error("error: ", error);
          return of(null);
        }),
        finalize(() => {
        }),
        takeUntil(this.unsubscribe$)
      ).subscribe();
    }
  }
  markFormGroupTouched(formGroup: FormGroup) {
    Object.values(formGroup.controls).forEach(control => {
      control.markAsTouched();
      if (control instanceof FormGroup) {
        this.markFormGroupTouched(control);
      }
    });
  }
}