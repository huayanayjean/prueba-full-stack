import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CursoEstudiantesService {

  private apiUrl = 'http://localhost:8000/api/estudiantes/';

  constructor(private http: HttpClient) { }

  asignarCursos(idEstudiante: number, cursoIds: number[]): Observable<any> {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': 'Bearer ' + localStorage.getItem('token')
    });

    const bodyRequest = {
      curso_ids: cursoIds,
      fecha_asignacion: new Date().toISOString()
    };

    return this.http.post<any>(`${this.apiUrl}${idEstudiante}/asignar-cursos`, bodyRequest, { headers });
  }
}
