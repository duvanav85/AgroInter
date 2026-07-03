import { Component } from '@angular/core';
import { AsyncPipe } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import { ModalSearchParametrosComponents } from './modal-search-parametros/modal-search-parametros-components';
import { TableParametrosComponents } from './table-parametros/table-parametros-components';
import { AlertService } from 'src/app/shared/services/Alert/alert.service';
import { ParametrosInterface, parametrosFilter } from '../Interface/parametros-interface';
import { CustomPagedResponse } from 'src/app/core/models/dto/apiresponse.interface';
import { Observable } from 'rxjs';
import { ParametrosServices } from '../services/parametros-services';
import { ExportService } from '../../../shared/helpers/export.service';

@Component({
  selector: 'app-parametro.components',
  templateUrl: './parametro.components.html',
  styles: ``,
  imports: [
      AsyncPipe,
      MatIconModule,
      ModalSearchParametrosComponents,
      TableParametrosComponents,],
})
export class ParametroComponents
{
  parametros?       : Observable<CustomPagedResponse<ParametrosInterface>>
  parametrosFilter  : parametrosFilter = { pageNumber: 1, pageSize: 5 }
  parametrosTotal   : parametrosFilter = { pageNumber: 1, pageSize: 4444 }

  constructor(private parametrosService  : ParametrosServices,
              private exportService      : ExportService,
              private alertService       : AlertService){
    this.parametros = parametrosService.parametros
  }

  ngOnInit(): void {
    this.getParametros();
  }

  addPagination(event: parametrosFilter): void {
    this.parametrosFilter.pageNumber  = event.pageNumber
    this.parametrosFilter.pageSize    = event.pageSize
    this.getParametros()
  }

  addFilter(event: parametrosFilter): void {
    this.parametrosFilter.parametro       = event.parametro
    this.parametrosFilter.nombreParametro = event.nombreParametro
    this.parametrosFilter.pageNumber      = event.pageNumber
    this.parametrosFilter.pageSize        = event.pageSize
    this.getParametros()
  }

  getParametros(): void {
    this.parametrosService.getAllParametros(this.parametrosFilter).subscribe({
      next:(response: any) => {
        this.parametrosService.updateParametros(response)
      },error:(err: any) => {
        this.alertService.messageAlert({ message: "Por favor intente más tarde." });
      }
    });
  }
}
