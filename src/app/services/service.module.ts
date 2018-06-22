import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { 
  LoginGuardGuard,
  AdminGuard,
  SettingsService, 
  SidebarService, 
  SharedService, 
  UsuarioService, 
  SubirArchivoService, 
  HospitalService,
  MedicoService
} from './service.index';
import { HttpClientModule } from '@angular/common/http';
import { ModalUploadService } from '../components/modal-upload/modal-upload.service';

@NgModule({
  imports: [
    CommonModule,
    HttpClientModule
  ],
  providers: [
    // guards
    LoginGuardGuard,
    AdminGuard,
    // services
    SettingsService, 
    SidebarService, 
    SharedService, 
    UsuarioService,
    SubirArchivoService,
    ModalUploadService,
    HospitalService,
    MedicoService
  ],
  declarations: []
})
export class ServiceModule { }
