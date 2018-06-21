import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

// Services
import { UsuarioService } from '../usuario/usuario.service';

// Models
import { Hospital } from '../../models/hospital.model';

import { URL_SERVICIOS } from '../../config/config';

@Injectable()
export class HospitalService {

  totalHospitales: number = 0;

  constructor(
    public http: HttpClient,
    public _usuarioService: UsuarioService
  ) {
  }

  cargarHospitales() {
    
    let url = URL_SERVICIOS + '/hospital';
    return this.http.get(url);

  }

  obtenerHospital( id: string ) {
    
    let url = URL_SERVICIOS + '/hospital/' + id;
    return this.http.get(url)
      .map( (resp: any) => resp.hospital);

  }

  borrarHospital( id: string ) {
    let url = URL_SERVICIOS + '/hospital/' + id;
    url += '?token=' + this._usuarioService.token;

    return this.http.delete(url)
      .map( resp => {
        swal('Hospital borrado', 'El hospital ha sido eliminado correctamente', 'success');
        return true;
      });
  }

  crearHospital( nombre: string ) {
    let url = URL_SERVICIOS + '/hospital';
    url += '?token=' + this._usuarioService.token;

    let hospital: Hospital = new Hospital(nombre);

    // en lugar de tener que crear un hospital para mandar un solo parametro, podria mandar {nombre} y toma un tipo objeto
    return this.http.post( url, hospital )
      .map( (resp: any) => {
        swal('Hospital creado', nombre, 'success');
        return resp.hospital.nombre;
      });

  }

  buscarHospital( termino: string ) {
    let url = URL_SERVICIOS + '/busqueda/coleccion/hospitales/' + termino;

    return this.http.get(url)
        .map((resp: any) => resp.hospitales);

  }

  actualizarHospital( hospital: Hospital) {
    let url = URL_SERVICIOS + '/hospital/' + hospital._id;
    url += '?token=' + this._usuarioService.token;

    return this.http.put( url, hospital )
      .map( (resp: any) => {
        
        swal('Hospital actualizado', hospital.nombre, 'success');
        
        return resp.hospital;
      });
  }
}
