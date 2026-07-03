import { Component } from '@angular/core';
import { AsyncPipe } from '@angular/common';
import { Observable } from 'rxjs';
//material
import { MatIconModule } from '@angular/material/icon';
//interfaces
import { CustomPagedResponse } from 'src/app/core/models/dto/apiresponse.interface';
import { veredasFilter, veredasInterface } from '../interface/veredas-interface';
//components
import { ModalSearchVeredasComponents } from './modal-search-veredas/modal-search-veredas.components';
import { TableVeredasComponents } from './table-veredas/table-veredas.components';
//services
import { veredasService } from '../service/veredas-service';
import { AlertService } from 'src/app/shared/services/Alert/alert.service';
import { ExportService } from 'src/app/shared/helpers/export.service';



@Component({
  selector: 'app-veredas.components',
  templateUrl: './veredas.components.html',
  styles: ``,
  imports: [
    AsyncPipe,
    MatIconModule,
    ModalSearchVeredasComponents,
    TableVeredasComponents,
  ],

})
export class VeredasComponents
{
  veredas        : Observable<CustomPagedResponse<veredasInterface>>
  veredasFilter  : veredasFilter = { pageNumber: 1, pageSize: 5 }
  veredasTotal   : veredasFilter = { pageNumber: 1, pageSize: 4444 }

  constructor(private veredasService  : veredasService,
              private exportService   : ExportService,
              private alertService    : AlertService){
              this.veredas = veredasService.veredas;
  }

  ngOnInit(): void {
    this.getVeredas();
  }

  addPagination(event: veredasFilter): void {
    this.veredasFilter.pageNumber = event.pageNumber
    this.veredasFilter.pageSize = event.pageSize
    this.getVeredas()
  }

  addFilter(event: veredasFilter): void {
    this.veredasFilter.idvereda          = event.idvereda
    this.veredasFilter.idciudad          = event.idciudad
    this.veredasFilter.nombre_vereda     = event.nombre_vereda
    this.veredasFilter.iddepartamento    = event.iddepartamento
    this.veredasFilter.area_ha           = event.area_ha
    this.veredasFilter.poblacion         = event.poblacion
    this.veredasFilter.pageNumber        = event.pageNumber
    this.veredasFilter.pageSize          = event.pageSize
    this.getVeredas()
  }

  getVeredas(): void {
    this.veredasService.getAllVeredas(this.veredasFilter).subscribe({
      next:(response: any) => {
        this.veredasService.updateVeredas(response)
      },error:(err: any) => {
        this.alertService.messageAlert({ message: "Por favor intente más tarde." });
      }
    });
  }
}
