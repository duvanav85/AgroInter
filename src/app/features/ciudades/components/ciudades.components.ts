import { Component } from '@angular/core';
import { AsyncPipe } from '@angular/common';
import { Observable } from 'rxjs';
//material
import { MatIconModule } from '@angular/material/icon';
//interfaces
import { CustomPagedResponse } from 'src/app/core/models/dto/apiresponse.interface';
import { ciudadesFilter, ciudadesInterface } from '../interfaces/ciudades-interface';
//components
import { ModalSearchCiudadesComponents } from './modal-search-ciudades/modal-search-ciudades.components';
import { TableCiudadesComponents } from './table-ciudades/table-ciudades.components';
//services
import { ciudadesService } from '../services/ciudades-service';
import { AlertService } from 'src/app/shared/services/Alert/alert.service';
import { ExportService } from 'src/app/shared/helpers/export.service';


@Component({
  selector: 'app-ciudades.components',
  templateUrl: './ciudades.components.html',
  styles: ``,
  imports: [
    AsyncPipe,
    MatIconModule,
    ModalSearchCiudadesComponents,
    TableCiudadesComponents,
],
})
export class CiudadesComponents
{
  ciudades        : Observable<CustomPagedResponse<ciudadesInterface>>
  ciudadesFilter  : ciudadesFilter = { pageNumber: 1, pageSize: 5 }
  ciudadesTotal   : ciudadesFilter = { pageNumber: 1, pageSize: 4444 }

  constructor(private ciudadesService  : ciudadesService,
              private exportService  : ExportService,
              private alertService   : AlertService){
    this.ciudades = ciudadesService.ciudades;
  }

  ngOnInit(): void {
    this.getCiudades();
  }

  addPagination(event: ciudadesFilter): void {
    this.ciudadesFilter.pageNumber = event.pageNumber
    this.ciudadesFilter.pageSize = event.pageSize
    this.getCiudades()
  }

  addFilter(event: ciudadesFilter): void {
    this.ciudadesFilter.idciudad          = event.idciudad
    this.ciudadesFilter.iddepartamento    = event.iddepartamento
    this.ciudadesFilter.descripcion       = event.descripcion
    this.ciudadesFilter.pageNumber        = event.pageNumber
    this.ciudadesFilter.pageSize          = event.pageSize
    this.getCiudades()
  }

  getCiudades(): void {
    this.ciudadesService.getAllCiudades(this.ciudadesFilter).subscribe({
      next:(response: any) => {
        this.ciudadesService.updateCiudades(response)
      },error:(err: any) => {
        this.alertService.messageAlert({ message: "Por favor intente más tarde." });
      }
    });
  }
}
