import { CUSTOM_ELEMENTS_SCHEMA, Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { FormBuilder, FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { Observable, Subject, catchError, finalize, of, takeUntil, tap } from 'rxjs';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { HttpErrorResponse } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { MaterialModule } from '../../material.module';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, MaterialModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css',
  schemas: [
    CUSTOM_ELEMENTS_SCHEMA
  ]
})
export class LoginComponent implements OnInit {
  private unsubscribe$ = new Subject<void>();
  usuario: string = '';
  password: string = '';
  error: string = '';
  observableLogin!: Observable<object>;
  token!: String;
  formLogin!: FormGroup;
  hide: boolean = true;
  isLoading: boolean = false;
  loginForm?: any;
  constructor(
    private snackBar: MatSnackBar,
    private _authService: AuthService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.formLogin = new FormGroup({
      email: new FormControl(""),
      password: new FormControl("")
    })
  }
   
  iniciarSesion(): void {
    const request = {
      email: this.formLogin.get('email')?.value,
      password: this.formLogin.get('password')?.value,
    };
    this.isLoading = true;
    this._authService.login(request).pipe(
      tap(response => {
        localStorage.setItem('token', response.access_token);
        this.router.navigateByUrl('/dashboard');
      }),
      catchError((error: HttpErrorResponse) => {
        if (error.status === 422) {
          this.mostrarError();
        }
        return of(null);
      }),
      finalize(() => {
        this.isLoading = false;
      }),
      takeUntil(this.unsubscribe$)
    ).subscribe();
  }

  mostrarError() {
    this.snackBar.open('Credenciales inválidas', 'Cerrar', {
      duration: 5000,
    });
  }

  ngOnDestroy() {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }
}
