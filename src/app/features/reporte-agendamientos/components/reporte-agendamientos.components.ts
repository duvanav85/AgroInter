import { Component } from '@angular/core';
import { AsyncPipe } from '@angular/common';
import { Observable } from 'rxjs';
//material
import { MatIconModule } from '@angular/material/icon';
//interfaces
import { CustomPagedResponse } from 'src/app/core/models/dto/apiresponse.interface';
import { reporteAgendamientoInterface, reporteAgendamientoFilter } from '../interface/reporte-agendamientos-interface';
//components
import { ModalSearchReporteAgendamientosComponents } from './modal-search-reporte-agendamientos/modal-search-reporte-agendamientos.components';
import { TableReporteAgendamientosComponents } from './table-reporte-agendamientos/table-reporte-agendamientos.components';
//services
import { reporteAgendamientosService } from '../services/reporte-agendamientos-services';
import { AlertService } from 'src/app/shared/services/Alert/alert.service';
import { ExportService } from 'src/app/shared/helpers/export.service';

@Component({
  selector: 'app-reporte-agendamientos',
  templateUrl: './reporte-agendamientos.components.html',
  styles: ``,
  imports: [
    AsyncPipe,
    MatIconModule,
    ModalSearchReporteAgendamientosComponents,
    TableReporteAgendamientosComponents,
  ],
})
export class ReporteAgendamientosComponents
{
  reporteAgendamiento          : Observable<CustomPagedResponse<reporteAgendamientoInterface>>
  reporteAgendamientoFilter    : reporteAgendamientoFilter = { pageNumber: 1, pageSize: 5 }
  reporteAgendamientoTotal     : reporteAgendamientoFilter = { pageNumber: 1, pageSize: 4444 }

  constructor(private reporteAgendamientoService    : reporteAgendamientosService,
              private exportService                 : ExportService,
              private alertService                  : AlertService){
    this.reporteAgendamiento = reporteAgendamientoService.visita
  }

  ngOnInit(): void {
    this.getreporteAgendamiento();
  }

  addPagination(event: reporteAgendamientoFilter): void {
    this.reporteAgendamientoFilter.pageNumber = event.pageNumber
    this.reporteAgendamientoFilter.pageSize = event.pageSize
    this.getreporteAgendamiento()
  }

  addFilter(event: reporteAgendamientoFilter): void {
    this.reporteAgendamientoFilter.idpropietario     = event.idpropietario
    this.reporteAgendamientoFilter.idtipo_cultivo    = event.idtipo_cultivo
    this.reporteAgendamientoFilter.idTicket          = event.idTicket
    this.reporteAgendamientoFilter.fecha_visita      = event.fecha_visita
    this.reporteAgendamientoFilter.idTecnico         = event.idTecnico
    this.reporteAgendamientoFilter.estado_ticket     = event.estado_ticket
    this.reporteAgendamientoFilter.semaforo          = event.semaforo
    this.reporteAgendamientoFilter.municipio         = event.municipio
    this.reporteAgendamientoFilter.vereda            = event.vereda
    this.reporteAgendamientoFilter.pageNumber        = event.pageNumber
    this.reporteAgendamientoFilter.pageSize          = event.pageSize
    this.getreporteAgendamiento()
  }

  getreporteAgendamiento(): void {
    this.reporteAgendamientoService.getAllReporteAgendamientos(this.reporteAgendamientoFilter).subscribe({
      next:(response: any) => {
        this.reporteAgendamientoService.updateReporteAgendamientos(response)
      },error:(err: any) => {
        this.alertService.messageAlert({ message: "Por favor intente más tarde." });
      }
    });
  }
}
