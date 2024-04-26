import { Component, OnInit } from '@angular/core';
import { NavbarComponent } from '../../navbar/navbar.component';
import { Estudiante } from '../estudiantes.component';
import { EstudianteService } from '../../../services/estudiante.service';
import { AbstractControl, FormControl, FormGroup, ReactiveFormsModule, ValidationErrors, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Subject, catchError, finalize, of, takeUntil, tap } from 'rxjs';
import { HttpErrorResponse } from '@angular/common/http';
import { ActivatedRoute, Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MaterialModule } from '../../../material.module';

@Component({
  selector: 'app-nuevo-estudiante',
  standalone: true,
  imports: [NavbarComponent, CommonModule, ReactiveFormsModule, MaterialModule],
  templateUrl: './nuevo-estudiante.component.html',
  styleUrl: './nuevo-estudiante.component.css'
})
export class NuevoEstudianteComponent implements OnInit {
  private unsubscribe$ = new Subject<void>();
  formNuevoEstudiante!: FormGroup;
  modoEdicion = false;
  estudianteId: number | undefined;
  textoBoton = "Agregar";
  accion = "Nuevo";

  constructor(private estudiantesService: EstudianteService,
    private router: Router,
    private snackBar: MatSnackBar,
    private route: ActivatedRoute
  ) { }

  ngOnInit(): void {
    this.formNuevoEstudiante = new FormGroup({
      nombre: new FormControl("", [Validators.required, Validators.maxLength(100)]),
      apellido: new FormControl(""),
      edad: new FormControl("", [Validators.required, Validators.min(18)]),
      email: new FormControl("", [Validators.required, Validators.email]),
      cedula: new FormControl("", [Validators.required, Validators.maxLength(11)]),
    })

    this.route.params.subscribe(params => {
      this.estudianteId = params['id'];
      if (this.estudianteId) {
        this.textoBoton = "Editar";
        this.accion = this.textoBoton;
        this.modoEdicion = true;
        this.estudiantesService.obtenerEstudiantePorId(this.estudianteId).pipe(
          tap(response => {
            if (response) {
              this.formNuevoEstudiante.patchValue(response);
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

  agregarEstudiante() {
    this.markFormGroupTouched(this.formNuevoEstudiante);
    if (this.formNuevoEstudiante.valid) {
      if (!this.modoEdicion) {
        const request = {
          nombre: this.formNuevoEstudiante.get('nombre')?.value,
          apellido: this.formNuevoEstudiante.get('apellido')?.value,
          edad: this.formNuevoEstudiante.get('edad')?.value,
          email: this.formNuevoEstudiante.get('email')?.value,
          cedula: this.formNuevoEstudiante.get('cedula')?.value,
        };
        this.estudiantesService.agregarEstudiante(request).pipe(
          tap(response => {
            this.snackBarExito();
            this.router.navigateByUrl('/estudiante');
          }),
          catchError((error: HttpErrorResponse) => {
            console.error("error: ", error);
            return of(null);
          }),
          finalize(() => {
          }),
          takeUntil(this.unsubscribe$)
        ).subscribe();
      } else {
        this.editarEstudiante()
      }
    }

  }

  snackBarExito() {
    this.snackBar.open('Operación exitosa', 'Cerrar', {
      duration: 5000,
    });
  }

  markFormGroupTouched(formGroup: FormGroup) {
    Object.values(formGroup.controls).forEach(control => {
      control.markAsTouched();
      if (control instanceof FormGroup) {
        this.markFormGroupTouched(control);
      }
    });
  }

  editarEstudiante() {
    if (this.estudianteId) {
      const request = {
        nombre: this.formNuevoEstudiante.get('nombre')?.value,
        apellido: this.formNuevoEstudiante.get('apellido')?.value,
        edad: this.formNuevoEstudiante.get('edad')?.value,
        email: this.formNuevoEstudiante.get('email')?.value,
        cedula: this.formNuevoEstudiante.get('cedula')?.value,
      };
      this.estudiantesService.editarEstudiante(this.estudianteId, request).pipe(
        tap(response => {
          this.snackBarExito();
          this.router.navigateByUrl('/estudiante');
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
}