import { Component } from '@angular/core';
import { AsyncPipe } from '@angular/common';
import { Observable } from 'rxjs';
//material
import { MatIconModule } from '@angular/material/icon';
//interfaces
import { CustomPagedResponse } from 'src/app/core/models/dto/apiresponse.interface';
import { tiposCiiuInterface, tiposCiiuFilter } from '../interface/tipos-ciiu-interface';
//components
import { ModalSearchTiposCiiuComponents } from './modal-search-tipos-ciiu/modal-search-tipos-ciiu.components';
import { TableTiposCiiuComponents } from './table-tipos-ciiu/table-tipos-ciiu.components';
//services
import { tiposCiiuService } from '../services/tipos-ciiu-services';
import { AlertService } from 'src/app/shared/services/Alert/alert.service';
import { ExportService } from 'src/app/shared/helpers/export.service';

@Component({
  selector: 'app-tipos-ciiu.components',
  templateUrl: './tipos-ciiu.components.html',
  styles: ``,
  imports: [
    AsyncPipe,
    MatIconModule,
    ModalSearchTiposCiiuComponents,
    TableTiposCiiuComponents,
],
})
export class TiposCiiuComponents
{
  tiposCiiu        : Observable<CustomPagedResponse<tiposCiiuInterface>>
  tiposCiiuFilter  : tiposCiiuFilter = { pageNumber: 1, pageSize: 5 }
  tiposCiiuTotal   : tiposCiiuFilter = { pageNumber: 1, pageSize: 4444 }

  constructor(private tiposCiiuService  : tiposCiiuService,
              private exportService   : ExportService,
              private alertService    : AlertService){
    this.tiposCiiu = tiposCiiuService.tiposCiiu
  }

  ngOnInit(): void {
    this.getTiposCiiu();
  }

  addPagination(event: tiposCiiuFilter): void {
    this.tiposCiiuFilter.pageNumber = event.pageNumber
    this.tiposCiiuFilter.pageSize = event.pageSize
    this.getTiposCiiu()
  }

  addFilter(event: tiposCiiuFilter): void {
    this.tiposCiiuFilter.division       = event.division
    this.tiposCiiuFilter.grupo          = event.grupo
    this.tiposCiiuFilter.clase          = event.clase
    this.tiposCiiuFilter.descripcion    = event.descripcion
    this.tiposCiiuFilter.pageNumber     = event.pageNumber
    this.tiposCiiuFilter.pageSize       = event.pageSize
    this.getTiposCiiu()
  }

  getTiposCiiu(): void {
    this.tiposCiiuService.getAllTiposCiiu(this.tiposCiiuFilter).subscribe({
      next:(response: any) => {
        this.tiposCiiuService.updateTiposCiiu(response)
      },error:(err: any) => {
        this.alertService.messageAlert({ message: "Por favor intente más tarde." });
      }
    });
  }
}
