import { CUSTOM_ELEMENTS_SCHEMA, Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { Router, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { MaterialModule } from '../../material.module';
import { Subject, catchError, finalize, of, takeUntil, tap } from 'rxjs';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, MaterialModule, RouterModule],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css',
  schemas: [
    CUSTOM_ELEMENTS_SCHEMA
  ]
})
export class NavbarComponent implements OnInit {

  private unsubscribe$ = new Subject<void>();

  constructor(private _authService: AuthService,
    private router: Router
  ) { }

  ngOnInit(): void {
    document.addEventListener("click", this.closeNavbarDropdown.bind(this));
  }

  closeNavbarDropdown(event: MouseEvent) {
    const target = event.target as HTMLElement;
    const dropdownMenu = target.closest('.dropdown-menu');
    const navbarCollapse = document.querySelector('.navbar-collapse');
    if (dropdownMenu && navbarCollapse != null && navbarCollapse.contains(target)) {
      event.stopPropagation();
    }
  }

  ngOnDestroy(): void {
    document.removeEventListener("click", this.closeNavbarDropdown.bind(this));
  }

  async logout(): Promise<void> {
    const token: string = localStorage.getItem('token') || '';
      await this._authService.logout(token).pipe(
        tap(response => {
          localStorage.removeItem('token');
          this.router.navigateByUrl('/login');
        }),
        catchError((error: HttpErrorResponse) => {
          if (error.status === 401) {
          } else {
          }
          return of(null);
        }),
        finalize(() => {
        }),
        takeUntil(this.unsubscribe$)
      ).subscribe();
  }
}
