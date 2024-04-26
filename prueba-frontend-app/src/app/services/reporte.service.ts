import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ReporteService {
  private topCursos = 'http://localhost:8000/api/reporte/top-cursos';
  private topEstudiantes = 'http://localhost:8000/api/reporte/top-estudiantes';
  private totalCursos = 'http://localhost:8000/api/reporte/total-cursos';
  private totalEstudiantes = 'http://localhost:8000/api/reporte/total-estudiantes';
  private reporteCursosPorEstudiante = 'http://localhost:8000/api/reporte-estudiantes';


  constructor(private http: HttpClient) { }

  obtenerTopCursos() {
    const headers = new HttpHeaders()
      .set('Content-Type', 'application/json')
      .set('Authorization', 'Bearer ' + localStorage.getItem('token'));
    return this.http.get<any>(this.topCursos, { headers });
  }
  obtenerTopEstudiantes() {
    const headers = new HttpHeaders()
      .set('Content-Type', 'application/json')
      .set('Authorization', 'Bearer ' + localStorage.getItem('token'));
    return this.http.get<any>(this.topEstudiantes, { headers });
  }
  obtenerTotalCursos() {
    const headers = new HttpHeaders()
      .set('Content-Type', 'application/json')
      .set('Authorization', 'Bearer ' + localStorage.getItem('token'));
    return this.http.get<any>(this.totalCursos, { headers });
  }
  obtenerTotalEstudiantes() {
    const headers = new HttpHeaders()
      .set('Content-Type', 'application/json')
      .set('Authorization', 'Bearer ' + localStorage.getItem('token'));
    return this.http.get<any>(this.totalEstudiantes, { headers });
  }
  obtenerCursosPorEstudiante(idEstudiante: number) {
    const headers = new HttpHeaders()
      .set('Content-Type', 'application/json')
      .set('Authorization', 'Bearer ' + localStorage.getItem('token'));
    const url = `${this.reporteCursosPorEstudiante}/${idEstudiante}/cursos-asignados`;
    return this.http.get<any>(url, { headers });
  }
}