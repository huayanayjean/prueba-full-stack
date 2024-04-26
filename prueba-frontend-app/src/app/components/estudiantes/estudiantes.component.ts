import { Component, OnInit } from '@angular/core';
import { NavbarComponent } from '../navbar/navbar.component';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { EstudianteService } from '../../services/estudiante.service';


export interface Estudiante {
  id: number;
  nombre: string;
  apellido: string;
  edad: number;
  cedula: string;
  email: string;
}

@Component({
  selector: 'app-estudiantes',
  standalone: true,
  imports: [NavbarComponent, CommonModule],
  templateUrl: './estudiantes.component.html',
  styleUrl: './estudiantes.component.css'
})
export class EstudiantesComponent implements OnInit {
  estudiantes: any[] = [];

  constructor(private _estudiantesService: EstudianteService,
    private router: Router) { }

  ngOnInit(): void {
    this.obtenerEstudiantes();
  }

  obtenerEstudiantes(): void {
    this._estudiantesService.obtenerEstudiantes()
      .subscribe(estudiantes => {
        this.estudiantes = estudiantes;
      });
  }

  verDetalle(id: number): void {
    this.router.navigateByUrl(`/estudiante/${id}`);
  }

  editarEstudiante(id: number): void {
    this.router.navigateByUrl(`/estudiante-nuevo/${id}`);
  }

  eliminarEstudiante(id: number): void {
    if (confirm('¿Estás seguro de eliminar este estudiante?')) {
      this._estudiantesService.eliminarEstudiante(id)
        .subscribe(() => {
          this.obtenerEstudiantes();
        });
    }
  }

  agregarEstudiante(): void {
    this.router.navigateByUrl('/estudiante-nuevo');
  }
}
