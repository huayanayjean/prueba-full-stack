import { CUSTOM_ELEMENTS_SCHEMA, Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { FormBuilder, FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { Observable, Subject, catchError, finalize, of, takeUntil, tap } from 'rxjs';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { MaterialModule } from '../../material.module';
import { NavbarComponent } from '../navbar/navbar.component';
import { ReporteService } from '../../services/reporte.service';
import { EstudianteService } from '../../services/estudiante.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, MaterialModule, NavbarComponent],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css',
  schemas: [
    CUSTOM_ELEMENTS_SCHEMA
  ]
})
export class DashboardComponent {
  formCursosPorEstudiante!: FormGroup;
  topCursos: any[] = [];
  topEstudiantes: any[] = [];
  totalCursos: number = 0;
  totalEstudiantes: number = 0;
  cursosAsignados: any[] = [];
  cursos: any[] = [];
  estudiantes: any[] = [];
  estudianteSeleccionado = false;

  constructor(private http: HttpClient,
    private _reporteService: ReporteService,
    private _estudiantesService: EstudianteService,
  ) { }

  ngOnInit(): void {
    this.obtenerTopCursos();
    this.obtenerTopEstudiantes();
    this.obtenerTotalCursos();
    this.obtenerTotalEstudiantes();
    this.obtenerEstudiantes();
    //this.obtenerCursosAsignadosEstudiante();
    this.formCursosPorEstudiante = new FormGroup({
      estudiante: new FormControl(""),
    })
  }

  obtenerEstudiantes(): void {
    this._estudiantesService.obtenerEstudiantes()
      .subscribe(estudiantes => {
        this.estudiantes = estudiantes;
      });
  }

  obtenerTopCursos(): void {
    this._reporteService.obtenerTopCursos()
      .subscribe(topCursos => {
        this.topCursos = topCursos;
      });
  }
  obtenerTopEstudiantes(): void {
    this._reporteService.obtenerTopEstudiantes()
      .subscribe(topEstudiantes => {
        this.topEstudiantes = topEstudiantes;
      });
  }
  obtenerTotalCursos(): void {
    this._reporteService.obtenerTotalCursos()
      .subscribe(totalCursos => {
        this.totalCursos = totalCursos.total_cursos;
      });
  }

  obtenerTotalEstudiantes(): void {
    this._reporteService.obtenerTotalEstudiantes()
      .subscribe(totalEstudiantes => {
        this.totalEstudiantes = totalEstudiantes.total_estudiantes;
      });
  }

  obtenerCursosAsignadosEstudiante(idEstudiante: any): void {
    this._reporteService.obtenerTopCursos()
      .subscribe(cursosAsignados => {
        this.cursosAsignados = cursosAsignados;
      });
  }

  onEstudianteSeleccionado(target: any) {
    const estudianteId = target.value;
    if (estudianteId) {
      this._reporteService.obtenerCursosPorEstudiante(estudianteId)
        .subscribe(cursosAsignados => {
          this.cursosAsignados = cursosAsignados;
          this.estudianteSeleccionado = true;
        });
    } else {
      this.estudianteSeleccionado = false;
    }
  }
}
