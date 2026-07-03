import { Component } from '@angular/core';
import { AsyncPipe } from '@angular/common';
import { Observable } from 'rxjs';
//material
import { MatIconModule } from '@angular/material/icon';
//interfaces
import { CustomPagedResponse } from 'src/app/core/models/dto/apiresponse.interface';
import { visitaFilter, visitaInterface } from '../interface/visita-interface';
//components
import { ModalSearchVisitaComponents } from './modal-search-visita/modal-search-visita.components';
import { TableVisitaComponents } from './table-visita/table-visita.components';
//services
import { visitaService } from '../service/visita-services';
import { AlertService } from 'src/app/shared/services/Alert/alert.service';
import { ExportService } from 'src/app/shared/helpers/export.service';

@Component({
  selector: 'app-visita.components',
  templateUrl: './visita.components.html',
  styles: ``,
  imports: [
    AsyncPipe,
    MatIconModule,
    ModalSearchVisitaComponents,
    TableVisitaComponents,
  ],
})
export class VisitaComponents
{
  visita          : Observable<CustomPagedResponse<visitaInterface>>
  visitaFilter    : visitaFilter = { pageNumber: 1, pageSize: 5 }
  visitaTotal     : visitaFilter = { pageNumber: 1, pageSize: 4444 }

  constructor(private visitaService  : visitaService,
              private exportService    : ExportService,
              private alertService     : AlertService){
    this.visita = visitaService.visita
  }

  ngOnInit(): void {
    this.getVisita();
  }

  addPagination(event: visitaFilter): void {
    this.visitaFilter.pageNumber = event.pageNumber
    this.visitaFilter.pageSize = event.pageSize
    this.getVisita()
  }

  addFilter(event: visitaFilter): void {
    this.visitaFilter.edo_ticket     = event.edo_ticket
    this.visitaFilter.productorId    = event.productorId
    this.visitaFilter.idPredio       = event.idPredio
    this.visitaFilter.idVereda       = event.idVereda
    this.visitaFilter.idDepartamento = event.idDepartamento
    this.visitaFilter.idMunicipio    = event.idMunicipio
    this.visitaFilter.Direccion      = event.Direccion
    this.visitaFilter.idTipoCultivo  = event.idTipoCultivo
    this.visitaFilter.pageNumber     = event.pageNumber
    this.visitaFilter.pageSize       = event.pageSize
    this.getVisita()
  }

  getVisita(): void {
    this.visitaService.getAllVisita(this.visitaFilter).subscribe({
      next:(response: any) => {
        this.visitaService.updateVisita(response)
      },error:(err: any) => {
        this.alertService.messageAlert({ message: "Por favor intente más tarde." });
      }
    });
  }
}
