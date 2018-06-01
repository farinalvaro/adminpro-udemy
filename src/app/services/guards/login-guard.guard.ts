import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import { UsuarioService } from '../service.index';

@Injectable()
export class LoginGuardGuard implements CanActivate {
  
  constructor (
    public _usuarioService: UsuarioService,
    public router: Router
  ) {
    
  }

  canActivate() {

    if ( this._usuarioService.estaLogueado()) {
      console.log('PASO EL GUARD');
      return true;
    } else {
      console.log('Bloqueado por el guard');
      this.router.navigate(['/login']);
      return false;
    }
  }
}
