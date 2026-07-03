import { Component } from '@angular/core';
import { AsyncPipe } from '@angular/common';
import { Observable } from 'rxjs';
//material
import { MatIconModule } from '@angular/material/icon';
//interfaces
import { CustomPagedResponse } from 'src/app/core/models/dto/apiresponse.interface';
import { paisesFilter, paisesInterface } from '../interface/paises-interface';
//components
import { ModalSearchPaisesComponents } from './modal-search-paises/modal-search-paises.components';
import { TablePaisesComponents } from './table-paises/table-paises.components';
//services
import { paisesService } from '../services/paises-service';
import { AlertService } from 'src/app/shared/services/Alert/alert.service';
import { ExportService } from 'src/app/shared/helpers/export.service';

@Component({
  selector: 'app-paises.components',
  templateUrl: './paises.components.html',
  styles: ``,
  imports: [
    AsyncPipe,
    MatIconModule,
    ModalSearchPaisesComponents,
    TablePaisesComponents,
  ],
})
export class PaisesComponents
{
  paises       : Observable<CustomPagedResponse<paisesInterface>>
  paisesFilter  : paisesFilter = { pageNumber: 1, pageSize: 5 }
  paisesTotal   : paisesFilter = { pageNumber: 1, pageSize: 4444 }

  constructor(private paisesService  : paisesService,
              private exportService  : ExportService,
              private alertService   : AlertService){
    this.paises = paisesService.paises
  }

  ngOnInit(): void {
    this.getPaises();
  }

  addPagination(event: paisesFilter): void {
    this.paisesFilter.pageNumber = event.pageNumber
    this.paisesFilter.pageSize = event.pageSize
    this.getPaises()
  }

  addFilter(event: paisesFilter): void {
    this.paisesFilter.codigo          = event.codigo
    this.paisesFilter.descripcion     = event.descripcion
    this.paisesFilter.id_DIAN         = event.id_DIAN
    this.paisesFilter.paisid          = event.paisid
    this.paisesFilter.pageNumber      = event.pageNumber
    this.paisesFilter.pageSize        = event.pageSize
    this.getPaises()
  }

  getPaises(): void {
    this.paisesService.getAllPaises(this.paisesFilter).subscribe({
      next:(response: any) => {
        this.paisesService.updatePaises(response)
      },error:(err: any) => {
        this.alertService.messageAlert({ message: "Por favor intente más tarde." });
      }
    });
  }
}
