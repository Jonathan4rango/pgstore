import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { BehaviorSubject, tap } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private http = inject(HttpClient);
  private router = inject(Router);

  private authStatus = new BehaviorSubject<boolean>(this.hasToken());

  isAuthenticated$ = this.authStatus.asObservable(); // Para saber si está autenticado

  private apiUrl = 'http://localhost:5175/api/auth'; // Ajusta la URL según tu backend

  login(id: string, password: string) {
    return this.http.post<{ token: string }>(`${this.apiUrl}/login`, { id, password }).pipe(
      tap(response => {
        localStorage.setItem('token', response.token);
        this.authStatus.next(true);
      })
    );
  }

  logout() {
    localStorage.removeItem('token');
    this.authStatus.next(false);
    this.router.navigate(['/login']);
  }

  getToken(): string | null {
    return localStorage.getItem('token');
  }

  isAuthenticated(): boolean {
    return this.authStatus.value;
  }

  private hasToken(): boolean {
    return !!localStorage.getItem('token');
  }
}
