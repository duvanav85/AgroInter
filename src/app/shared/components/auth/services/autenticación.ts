// auth.service.ts
import { Injectable } from  '@angular/core' ;

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private authenticated = false;
  isAuthenticated(): boolean {
    // Implementa aquí tu lógica de autenticación
    this.login();
    return this.authenticated;
  }
  login(): void {
    // Realizar acciones de inicio de sesión
    this.authenticated = true;
  }
  // logout(): void {
  //   // Realizar acciones de cierre de sesión
  //   this.authenticated = false;
  // }
}
