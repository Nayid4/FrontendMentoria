import { Inject, Injectable, PLATFORM_ID, signal } from '@angular/core';
import { environment } from '../../../environments/environment.development';
import { CookieService } from 'ngx-cookie-service';
import { HttpClient } from '@angular/common/http';
import { Observable, tap } from 'rxjs';
import { DataUser } from '../models/dataUser.model';
import { TokenUser } from '../models/token.model';
import { BehaviorSubject } from 'rxjs';
import { isPlatformBrowser } from '@angular/common';
import { LoginIn } from '../models/loginIn.model';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private readonly TOKEN_NAME = 'token';
  private readonly REFRESH_TOKEN_NAME = 'refreshToken';
  private readonly apiUrl = environment.apiUrl;
  private readonly endpoint = 'autenticacion';
  private authenticatedSubject = new BehaviorSubject<boolean>(!!this.token);
  private userSubject = new BehaviorSubject<DataUser>({} as DataUser);
  

  constructor(private http: HttpClient, private cookieService: CookieService, 
    @Inject(PLATFORM_ID) private platformId: Object
  ) {
    if (isPlatformBrowser(this.platformId)) {
      this.authenticatedSubject.next(!!this.token);
    }
   }


  getTokenUser(): boolean {
    return !!this.token;
  }

  get token(): string {
    if (isPlatformBrowser(this.platformId)) {
      return this.cookieService.get(this.TOKEN_NAME) || '';
    }
    return ''; // Si estamos en el servidor, devolvemos un string vacío
  }

  get refreshToken(): string {
    if (isPlatformBrowser(this.platformId)) {
      return this.cookieService.get(this.REFRESH_TOKEN_NAME) || '';
    }
    return '';
  }

  set token(valor: string) {
    this.cookieService.set(this.TOKEN_NAME, valor, { expires: 7, path: '/' });
    this.authenticatedSubject.next(!!valor);
  }

  set refreshToken(valor: string) {
    this.cookieService.set(this.REFRESH_TOKEN_NAME, valor, { expires: 7, path: '/' });
    this.authenticatedSubject.next(!!valor);
  }

  get authenticated$() {
    return this.authenticatedSubject.asObservable();
  }

  get dataAuthenticated$() {
    const datosEnMemoria = this.userSubject.getValue();
    
    if (Object.keys(datosEnMemoria).length === 0 && this.token) {
      // Solo hacer la llamada si no hay datos cargados y si hay un token válido
      this.DataUser().subscribe(dataUser => {
        this.dataAuthenticated = dataUser;
      });
    }
  
    return this.userSubject.asObservable();
  }

  set dataAuthenticated(dato: DataUser) {
    this.userSubject.next(dato);
  }

  IniciarSesion(data: LoginIn): Observable<TokenUser> {
    return this.http.post<TokenUser>(`${this.apiUrl}/${this.endpoint}/iniciar-sesion`, data).pipe(
      tap(resp => {
        this.token = resp.token;
        this.refreshToken = resp.refreshToken
      })
    );
  }

  RefreshToken(): Observable<TokenUser> {
    // Mandar el refresh token en el encabezado
    return this.http.get<TokenUser>(`${this.apiUrl}/${this.endpoint}/refrescar-token`)
  }

  DataUser(): Observable<DataUser> {
    return this.http.get<DataUser>(`${this.apiUrl}/${this.endpoint}/datos-usuario`);
  }

  cerrarSesion() {
    this.cookieService.delete(this.TOKEN_NAME);
    this.cookieService.delete(this.REFRESH_TOKEN_NAME);
    this.cookieService.deleteAll("/");

    localStorage.removeItem(this.TOKEN_NAME);
    localStorage.removeItem(this.REFRESH_TOKEN_NAME);
 

    this.authenticatedSubject.next(false);
    this.userSubject.next({} as DataUser);
  }
}
