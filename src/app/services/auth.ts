import { HttpClient } from '@angular/common/http';
import { Inject, Injectable, PLATFORM_ID } from '@angular/core';
import { Observable } from 'rxjs';
import { JwtHelperService } from '@auth0/angular-jwt';
import { Router } from '@angular/router';
import { isPlatformBrowser } from '@angular/common';

import { User } from '../models/user';
import { Auth } from '../models/auth';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private _uriBase = 'http://localhost:3000/api/';
  private _uriLogin = this._uriBase + 'login';
  
  private isBrowser: boolean;

  constructor(
    private _http: HttpClient,
    private jwtHelper: JwtHelperService,
    private router: Router,
    @Inject(PLATFORM_ID) private platformId: object
  ) {
    this.isBrowser = isPlatformBrowser(platformId);
  }

  public login(user: User): Observable<Auth> {
    return this._http.post<Auth>(this._uriLogin, user);
  }

  public getToken(): string | null {
    return this.isBrowser ? sessionStorage.getItem('access_token') : null;
  }

  public getUserId(): string | null {
    return this.isBrowser ? sessionStorage.getItem('user_id') : null;
  }

  public isAuthenticated(): boolean {
    return !this.jwtHelper.isTokenExpired(this.getToken());
  }

  public closeSession(): void {
    if (!this.isBrowser) return;
    sessionStorage.removeItem('access_token');
    sessionStorage.removeItem('user_id');
    this.router.navigate(['/login']);
  }
}
