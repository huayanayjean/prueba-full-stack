import { Component } from '@angular/core';
import { NavbarComponent } from '../navbar/navbar.component';
import { CommonModule } from '@angular/common';
import { CursoService } from '../../services/curso.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-cursos',
  standalone: true,
  imports: [NavbarComponent, CommonModule],
  templateUrl: './cursos.component.html',
  styleUrl: './cursos.component.css'
})
export class CursosComponent {
  cursos: any[] = [];

  constructor(private _cursoService: CursoService,
    private router: Router) { }

  ngOnInit(): void {
    this.obtenerCursos();
  }

  obtenerCursos(): void {
    this._cursoService.obtenerCursos()
      .subscribe(cursos => {
        this.cursos = cursos;
      });
  }

  verDetalle(id: number): void {
    this.router.navigateByUrl(`/curso/${id}`);
  }

  editarCurso(id: number): void {
    this.router.navigateByUrl(`/curso-nuevo/${id}`);
  }

  eliminarCurso(id: number): void {
    if (confirm('¿Estás seguro de eliminar este curso?')) {
      this._cursoService.eliminarCurso(id)
        .subscribe(() => {
          this.obtenerCursos();
        });
    }
  }

  agregarCurso(): void {
    this.router.navigateByUrl('/curso-nuevo');
  }
}
