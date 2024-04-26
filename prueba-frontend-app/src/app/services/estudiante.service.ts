import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Estudiante } from '../components/estudiantes/estudiantes.component';

@Injectable({
  providedIn: 'root'
})
export class EstudianteService {
  private apiUrl = 'http://localhost:8000/api/estudiantes';

  constructor(private http: HttpClient) { }

  obtenerEstudiantes() {
    const headers = new HttpHeaders()
      .set('Content-Type', 'application/json')
      .set('Authorization', 'Bearer ' + localStorage.getItem('token'));
    return this.http.get<any>(this.apiUrl, { headers });
  }

  obtenerEstudiantePorId(id: number) {
    const headers = new HttpHeaders()
      .set('Content-Type', 'application/json')
      .set('Authorization', 'Bearer ' + localStorage.getItem('token'));
    const url = `${this.apiUrl}/${id}`;
    return this.http.get<any>(url, {headers});
  }

  eliminarEstudiante(id: number) {
    const headers = new HttpHeaders()
      .set('Content-Type', 'application/json')
      .set('Authorization', 'Bearer ' + localStorage.getItem('token'));
    const url = `${this.apiUrl}/${id}`;
    return this.http.delete<void>(url, {headers});
  }

  agregarEstudiante(request: any) {
    const headers = new HttpHeaders()
      .set('Content-Type', 'application/json')
      .set('Authorization', 'Bearer ' + localStorage.getItem('token'));
    return this.http.post<any>(this.apiUrl, request, { headers });
  }

  editarEstudiante(id: number, request: any): Observable<any> {
    const headers = new HttpHeaders()
      .set('Content-Type', 'application/json')
      .set('Authorization', 'Bearer ' + localStorage.getItem('token'));
    const url = `${this.apiUrl}/${id}`;
    return this.http.put<any>(url, request, { headers });
  }
}

