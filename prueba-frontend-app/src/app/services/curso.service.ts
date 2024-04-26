import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CursoService {
  private apiUrl = 'http://localhost:8000/api/cursos';

  constructor(private http: HttpClient) { }

  obtenerCursos() {
    const headers = new HttpHeaders()
      .set('Content-Type', 'application/json')
      .set('Authorization', 'Bearer ' + localStorage.getItem('token'));
    return this.http.get<any>(this.apiUrl, { headers });
  }

  obtenerCursoPorId(id: number) {
    const headers = new HttpHeaders()
      .set('Content-Type', 'application/json')
      .set('Authorization', 'Bearer ' + localStorage.getItem('token'));
    const url = `${this.apiUrl}/${id}`;
    return this.http.get<any>(url, {headers});
  }

  eliminarCurso(id: number) {
    const headers = new HttpHeaders()
      .set('Content-Type', 'application/json')
      .set('Authorization', 'Bearer ' + localStorage.getItem('token'));
    const url = `${this.apiUrl}/${id}`;
    return this.http.delete<void>(url, {headers});
  }

  agregarCurso(request: any) {
    const headers = new HttpHeaders()
      .set('Content-Type', 'application/json')
      .set('Authorization', 'Bearer ' + localStorage.getItem('token'));
    return this.http.post<any>(this.apiUrl, request, { headers });
  }

  editarCurso(id: number, request: any): Observable<any> {
    const headers = new HttpHeaders()
      .set('Content-Type', 'application/json')
      .set('Authorization', 'Bearer ' + localStorage.getItem('token'));
    const url = `${this.apiUrl}/${id}`;
    return this.http.put<any>(url, request, { headers });
  }
}
