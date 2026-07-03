import { Component } from '@angular/core';
import { AsyncPipe } from '@angular/common';
import { Observable } from 'rxjs';
//material
import { MatIconModule } from '@angular/material/icon';
//interfaces
import { CustomPagedResponse } from 'src/app/core/models/dto/apiresponse.interface';
import { asgvisitaInterface, asgvisitaFilter } from '../interface/asg-visitas-interface';
//components
import { ModalSearchAsgVisitasComponents } from './modal-search-asg-visitas/modal-search-asg-visitas.components';
import { TableAsgVisitasComponents } from './table-asg-visitas/table-asg-visitas.components';
//services
import { asgvisitaService } from '../service/asg-visitas-service';
import { AlertService } from 'src/app/shared/services/Alert/alert.service';
import { ExportService } from 'src/app/shared/helpers/export.service';



@Component({
  selector: 'app-asignacion-visitas.components',
  templateUrl: './asignacion-visitas.components.html',
  styles: ``,
  imports: [
    AsyncPipe,
    MatIconModule,
    ModalSearchAsgVisitasComponents,
    TableAsgVisitasComponents,
  ],
})
export class AsignacionVisitasComponents
{
  asgvisita          : Observable<CustomPagedResponse<asgvisitaInterface>>
  asgvisitaFilter    : asgvisitaFilter = { pageNumber: 1, pageSize: 5 }
  asgvisitaTotal     : asgvisitaFilter = { pageNumber: 1, pageSize: 4444 }

  constructor(private asgvisitaService    : asgvisitaService,
              private exportService       : ExportService,
              private alertService        : AlertService){
    this.asgvisita = asgvisitaService.visita
  }

  ngOnInit(): void {
    this.getAsgVisita();
  }

  addPagination(event: asgvisitaFilter): void {
    this.asgvisitaFilter.pageNumber = event.pageNumber
    this.asgvisitaFilter.pageSize = event.pageSize
    this.getAsgVisita()
  }

  addFilter(event: asgvisitaFilter): void {
    this.asgvisitaFilter.visitaid          = event.visitaid
    this.asgvisitaFilter.idTicket          = event.idTicket
    this.asgvisitaFilter.fecha_visita      = event.fecha_visita
    this.asgvisitaFilter.idTecnico         = event.idTecnico
    this.asgvisitaFilter.nro_convenio      = event.nro_convenio
    this.asgvisitaFilter.fecha_agenda      = event.fecha_agenda
    this.asgvisitaFilter.pageNumber        = event.pageNumber
    this.asgvisitaFilter.pageSize          = event.pageSize
    this.getAsgVisita()
  }

  getAsgVisita(): void {
    this.asgvisitaService.getAllAsgVisita(this.asgvisitaFilter).subscribe({
      next:(response: any) => {
        this.asgvisitaService.updateAsgVisita(response)
      },error:(err: any) => {
        this.alertService.messageAlert({ message: "Por favor intente más tarde." });
      }
    });
  }
}
