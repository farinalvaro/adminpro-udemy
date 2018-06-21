import { Component, OnInit } from '@angular/core';
import { Hospital } from '../../models/hospital.model';
import { HospitalService } from '../../services/service.index';
import { ModalUploadService } from '../../components/modal-upload/modal-upload.service';

declare var swal: any;

@Component({
  selector: 'app-hospitales',
  templateUrl: './hospitales.component.html',
  styles: []
})

export class HospitalesComponent implements OnInit {

  hospitales: Hospital[] = [];
  totalRegistros: number = 0;
  cargando: boolean = true;

  constructor(
    public _hospitalService: HospitalService,
    public _modalUploadService: ModalUploadService
  ) { }

  ngOnInit() {
    this.cargarHospitales();

    this._modalUploadService.notificacion
      .subscribe( () => this.cargarHospitales() );
      // algo para mejorar aca es recibir ese hospital y actualizar solo ese, cargar solo el hospital actualizado
  }

  actualizarImagen( hospital: Hospital ) {
    this._modalUploadService.mostrarModal( 'hospitales', hospital._id );
  }
  
  crearHospital() {
    swal({
      title: 'Crear hospital',
      text: 'Ingrese el nombre del hospital',
      content: "input",
      icon: 'info', 
      buttons: true,
      dangerMode: true
    })
    .then((value) => {
      this._hospitalService.crearHospital(value)
        .subscribe( resp => this.cargarHospitales());
    });
  }
  
  cargarHospitales() {

    this.cargando = true;

    this._hospitalService.cargarHospitales()
      .subscribe( (resp: any) => {
        this.totalRegistros = resp.total;
        this.hospitales = resp.hospitales;
        this.cargando = false;
      });
  }

  buscarHospital( termino: string ) {

    if (termino.length <= 0) {
      this.cargarHospitales();
      return;
    }

    this.cargando = true;

    this._hospitalService.buscarHospital(termino)
      .subscribe( (hospitales: Hospital[]) => {
        
        this.hospitales = hospitales;
        this.cargando = false;

      });
  }

  borrarHospital(hospital: Hospital) {
    
    swal({
      title: 'Esta seguro?',
      text: 'Esta a punto de borrar el hospital ' + hospital.nombre,
      icon: 'warning',
      buttons: true,
      dangerMode: true
    })
    .then( borrar => {
      if ( borrar ) {
        this._hospitalService.borrarHospital( hospital._id )
        .subscribe( borrado => {
          this.cargarHospitales();
        });
      }
    });
  }

  guardarHospital( hospital: Hospital ) {
    this._hospitalService.actualizarHospital( hospital )
    .subscribe();
  }

}
