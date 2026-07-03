import { Component } from '@angular/core';
import { AsyncPipe } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import { Observable } from 'rxjs';

import { ModalSearchDetallesParametrosComponents } from './modal-search-detalles-parametros/modal-search-detalles-parametros.components';
import { TableDetallesParametrosComponents } from './table-detalles-parametros/table-detalles-parametros.components';
// Services
import { AlertService } from 'src/app/shared/services/Alert/alert.service';
import { DetalleParametrosService } from '../services/detalle-parametros.service';
import { ExportService } from '../../../shared/helpers/export.service';
//interfaces
import { DetalleParametrosInterface, DetalleParametrosFilter } from '../interface/detalle-parametros-interface';
import { CustomPagedResponse } from 'src/app/core/models/dto/apiresponse.interface';


@Component({
  selector: 'app-detalles-parametros.componente',
  templateUrl: './detalles-parametros.componente.html',
  styles: ``,
  imports: [
    AsyncPipe,
    MatIconModule,
    ModalSearchDetallesParametrosComponents,
    TableDetallesParametrosComponents,
  ],
})
export class DetallesParametrosComponente
{
  detallesParametros?       : Observable<CustomPagedResponse<DetalleParametrosInterface>>
  detallesParametrosFilter  : DetalleParametrosFilter = { pageNumber: 1, pageSize: 5 }
  detallesParametrosTotal   : DetalleParametrosFilter = { pageNumber: 1, pageSize: 4444 }

  constructor(private detallesParametrosService  : DetalleParametrosService,
              private exportService              : ExportService,
              private alertService               : AlertService){
    this.detallesParametros = detallesParametrosService.detalleParametro
  }

  ngOnInit(): void {
    this.getDetallesParametros();
  }

  addPagination(event: DetalleParametrosFilter): void {
    this.detallesParametrosFilter.pageNumber = event.pageNumber
    this.detallesParametrosFilter.pageSize = event.pageSize
    this.getDetallesParametros()
  }

  addFilter(event: DetalleParametrosFilter): void {
    this.detallesParametrosFilter.idparametro = event.idparametro
    this.detallesParametrosFilter.idregistro  = event.idregistro
    this.detallesParametrosFilter.descripcion = event.descripcion
    this.detallesParametrosFilter.activo      = event.activo
    this.detallesParametrosFilter.pageNumber  = event.pageNumber
    this.detallesParametrosFilter.pageSize    = event.pageSize
    this.getDetallesParametros()
  }

  getDetallesParametros(): void {
    this.detallesParametrosService.getAllDetalleParametros(this.detallesParametrosFilter).subscribe({
      next:(response: any) => {
        this.detallesParametrosService.updateDetalleParametrosObservable(response)
      },error:(err: any) => {
        this.alertService.messageAlert({ message: "Por favor intente más tarde." });
      }
    });
  }
}
