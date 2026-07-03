import { Component } from '@angular/core';
import { AsyncPipe } from '@angular/common';
import { Observable } from 'rxjs';
//material
import { MatIconModule } from '@angular/material/icon';
//interfaces
import { CustomPagedResponse } from 'src/app/core/models/dto/apiresponse.interface';
import { sectoresFilter, sectoresInterface } from '../interface/sectores-interface';
//components
import { ModalSearchSectoresComponents } from './modal-search-sectores/modal-search-sectores.components';
import { TableSectoresComponents } from './table-sectores/table-sectores.components';
//services
import { sectoresService } from '../services/sectores-services';
import { AlertService } from 'src/app/shared/services/Alert/alert.service';
import { ExportService } from 'src/app/shared/helpers/export.service';

@Component({
  selector: 'app-sectores.components',
  templateUrl: './sectores.components.html',
  styles: ``,
  imports: [
    AsyncPipe,
    MatIconModule,
    ModalSearchSectoresComponents,
    TableSectoresComponents,
  ],
})
export class SectoresComponents
{
  sectores        : Observable<CustomPagedResponse<sectoresInterface>>
  sectoresFilter  : sectoresFilter = { pageNumber: 1, pageSize: 5 }
  sectoresTotal   : sectoresFilter = { pageNumber: 1, pageSize: 4444 }

  constructor(private sectoresService  : sectoresService,
              private exportService    : ExportService,
              private alertService     : AlertService){
    this.sectores = sectoresService.sectores
  }

  ngOnInit(): void {
    this.getSectores();
  }

  addPagination(event: sectoresFilter): void {
    this.sectoresFilter.pageNumber = event.pageNumber
    this.sectoresFilter.pageSize = event.pageSize
    this.getSectores()
  }

  addFilter(event: sectoresFilter): void {
    this.sectoresFilter.nombre         = event.nombre
    this.sectoresFilter.descripcion    = event.descripcion
    this.sectoresFilter.codsector      = event.codsector
    this.sectoresFilter.activo         = event.activo
    this.sectoresFilter.pageNumber     = event.pageNumber
    this.sectoresFilter.pageSize       = event.pageSize
    this.getSectores()
  }

  getSectores(): void {
    this.sectoresService.getAllSectores(this.sectoresFilter).subscribe({
      next:(response: any) => {
        this.sectoresService.updateSector(response)
      },error:(err: any) => {
        this.alertService.messageAlert({ message: "Por favor intente más tarde." });
      }
    });
  }
}
