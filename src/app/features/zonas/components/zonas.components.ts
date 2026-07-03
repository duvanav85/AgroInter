import { Component } from '@angular/core';
import { AsyncPipe } from '@angular/common';
import { Observable } from 'rxjs';
//material
import { MatIconModule } from '@angular/material/icon';
//interfaces
import { CustomPagedResponse } from 'src/app/core/models/dto/apiresponse.interface';
import { zonasFilter, zonasInterface } from '../interface/zonas-interface';
//components
import { ModalSearchZonasComponents } from './modal-search-zonas/modal-search-zonas.components';
import { TableZonasComponents } from './table-zonas/table-zonas.components';
//services
import { zonasService } from '../services/zonas-service';
import { AlertService } from 'src/app/shared/services/Alert/alert.service';
import { ExportService } from 'src/app/shared/helpers/export.service';


@Component({
  selector: 'app-zonas',
  templateUrl: './zonas.components.html',
  styles: ``,
  imports: [
    AsyncPipe,
    MatIconModule,
    ModalSearchZonasComponents,
    TableZonasComponents,
  ],
})
export class ZonasComponents
{
  zonas        : Observable<CustomPagedResponse<zonasInterface>>
  zonasFilter  : zonasFilter = { pageNumber: 1, pageSize: 5 }
  zonasTotal   : zonasFilter = { pageNumber: 1, pageSize: 4444 }

  constructor(private barriosService  : zonasService,
              private exportService   : ExportService,
              private alertService    : AlertService){
    this.zonas = barriosService.zonas
  }

  ngOnInit(): void {
    this.getZonas();
  }

  addPagination(event: zonasFilter): void {
    this.zonasFilter.pageNumber = event.pageNumber
    this.zonasFilter.pageSize = event.pageSize
    this.getZonas()
  }

  addFilter(event: zonasFilter): void {
    this.zonasFilter.idzona         = event.idzona
    this.zonasFilter.idbarrio       = event.idbarrio
    this.zonasFilter.descripcion    = event.descripcion
    this.zonasFilter.pageNumber     = event.pageNumber
    this.zonasFilter.pageSize       = event.pageSize
    this.getZonas()
  }

  getZonas(): void {
    this.barriosService.getAllZonas(this.zonasFilter).subscribe({
      next:(response: any) => {
        this.barriosService.updateZonas(response)
      },error:(err: any) => {
        this.alertService.messageAlert({ message: "Por favor intente más tarde." });
      }
    });
  }
}
