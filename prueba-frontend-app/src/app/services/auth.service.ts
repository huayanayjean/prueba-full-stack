import { DOCUMENT } from '@angular/common';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private apiUrl = 'http://localhost:8000/api/login';
  private logoutUrl = 'http://localhost:8000/api/logout';

  private authSecretKey = 'token';
  localStorage: any;

  constructor(private http: HttpClient,  @Inject(DOCUMENT) private document: Document) { 
    this.localStorage = document.defaultView?.localStorage;
  }

  login(request: any): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}`, request);
  }
  
  isAuthenticatedUser(): boolean {
    let isToken = false;
    if (this.localStorage) {
      isToken = !!this.localStorage.getItem(this.authSecretKey);
    }
    return isToken;
  }

  logout(token: string): Observable<any> {
    const headers = new HttpHeaders()
      .set('Content-Type', 'application/json')
      .set('Authorization', 'Bearer ' + token);

    return this.http.post<any>(this.logoutUrl, {}, { headers });
  }
}
