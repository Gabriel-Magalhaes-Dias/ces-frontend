import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject } from 'rxjs/internal/BehaviorSubject';
import { Observable } from 'rxjs/internal/Observable';
import { map } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { Login } from '../shared/models/login';
import { User } from './user.model';

const TOKEN_KEY = 'auth-token';
const REFRESH_TOKEN_KEY = 'refresh-token';
const USER_KEY = 'auth-user';
const USER_ID = 'auth-user-id';
const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {

  private userSubject: BehaviorSubject<User>;
  public user: Observable<User>;

  constructor(
    private router: Router,
    private http: HttpClient) {
    this.userSubject = new BehaviorSubject<User>(JSON.parse(localStorage.getItem(USER_KEY)));
    this.user = this.userSubject.asObservable();
  }

  login(login: Login): Observable<User> {
    return this.http.post<User>(`${environment.apiUrl}/auth/login`, login, httpOptions)
      .pipe(map(u => {
        this.saveUser(u);
        this.saveTokens(u.authenticationToken, u.refreshToken);
        this.saveUserId(u.id);
        this.userSubject.next(u);
        return u;
      }));
  }

  register(user: User): Observable<any> {
    return this.http.post(`${environment.apiUrl}/admin/usuarios`, {
      nome: user.nome,
      username: user.username,
      enabled: user.enabled,
      email: user.email,
      password: user.password
      //role: ['user']
    }, httpOptions);
  }

  logout() {
    window.localStorage.clear();
    this.userSubject.next(null);
    this.router.navigate(['/']);
  }

  public saveTokens(token: string, refreshToken: string) {
    window.localStorage.removeItem(TOKEN_KEY);
    window.localStorage.setItem(TOKEN_KEY, token);
    window.localStorage.removeItem(REFRESH_TOKEN_KEY);
    window.localStorage.setItem(REFRESH_TOKEN_KEY, refreshToken);
  }

  public getToken(): string {
    return localStorage.getItem(TOKEN_KEY);
  }

  public getRefreshToken(): string {
    return localStorage.getItem(REFRESH_TOKEN_KEY);
  }

  public refreshToken() {
    return this.http.post<any>(`${environment.apiUrl}/auth/refresh/token`, {
      refreshToken: this.getRefreshToken(),
      username: this.userValue.username
    }).pipe(map(user => {
      this.saveTokens(user.authenticationToken, user.refreshToken);
    }));
  }

  public saveUserId(id) {
    window.localStorage.removeItem(USER_ID);
    window.localStorage.setItem(USER_ID, id);
  }

  public getUserId(): number {
    return JSON.parse(localStorage.getItem(USER_ID));
  }

  public saveUser(user: User) {
    window.localStorage.removeItem(USER_KEY);
    window.localStorage.setItem(USER_KEY, JSON.stringify(user));
  }

  public get userValue(): User {
    return this.userSubject.value;
  }

}
