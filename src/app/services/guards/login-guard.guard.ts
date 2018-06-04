import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { Observable } from 'rxjs/Observable';
// para evitar una dependencia circular, esto no apunta a index, chequear como esta en el codigo despues
import { UsuarioService } from '../usuario/usuario.service';

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
