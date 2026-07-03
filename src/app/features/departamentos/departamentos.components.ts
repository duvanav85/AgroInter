import { Component } from '@angular/core';
import { AsyncPipe } from '@angular/common';
import { Observable } from 'rxjs';
//material
import { MatIconModule } from '@angular/material/icon';
//interfaces
import { CustomPagedResponse } from 'src/app/core/models/dto/apiresponse.interface';
import { departamentosInterface, departamentosFilter } from './interface/departamentos-interface';
//components
import { ModalSearchDepartamentosComponents } from './components/modal-search-departamentos/modal-search-departamentos.components';
import { TableDepartamentosComponents } from './components/table-departamentos/table-departamentos.components';
//services
import { departamentosService } from './services/departamentos-service';
import { AlertService } from 'src/app/shared/services/Alert/alert.service';
import { ExportService } from 'src/app/shared/helpers/export.service';


@Component({
  selector: 'app-departamentos.components',
  templateUrl: './departamentos.components.html',
  styles: ``,
  imports: [
    AsyncPipe,
    MatIconModule,
    ModalSearchDepartamentosComponents,
    TableDepartamentosComponents,
  ],
})
export class DepartamentosComponents
{
  departamentos : Observable<CustomPagedResponse<departamentosInterface>>
  departamentosFilter  : departamentosFilter = { pageNumber: 1, pageSize: 5 }
  departamentosTotal   : departamentosFilter = { pageNumber: 1, pageSize: 4444 }

  constructor(private departamentosService  : departamentosService,
              private exportService  : ExportService,
              private alertService   : AlertService){
    this.departamentos = departamentosService.departamentos
  }

  ngOnInit(): void {
    this.getDepartamentos();
  }

  addPagination(event: departamentosFilter): void {
    this.departamentosFilter.pageNumber = event.pageNumber
    this.departamentosFilter.pageSize = event.pageSize
    this.getDepartamentos()
  }

  addFilter(event: departamentosFilter): void {
    this.departamentosFilter.codigo          = event.codigo
    this.departamentosFilter.departamento    = event.departamento
    this.departamentosFilter.idpais          = event.idpais
    this.departamentosFilter.departamentoid  = event.departamentoid
    this.departamentosFilter.pageNumber      = event.pageNumber
    this.departamentosFilter.pageSize        = event.pageSize
    this.getDepartamentos()
  }

  getDepartamentos(): void {
    this.departamentosService.getAllDepartamentos(this.departamentosFilter).subscribe({
      next:(response: any) => {
        this.departamentosService.updateDepartamentos(response)
      },error:(err: any) => {
        this.alertService.messageAlert({ message: "Por favor intente más tarde." });
      }
    });
  }
}
