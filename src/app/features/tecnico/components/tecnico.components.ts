import { Component } from '@angular/core';
import { AsyncPipe } from '@angular/common';
import { Observable } from 'rxjs';
//material
import { MatIconModule } from '@angular/material/icon';
//interfaces
import { CustomPagedResponse } from 'src/app/core/models/dto/apiresponse.interface';
import { tecnicoFilter, tecnicoInterface } from '../interface/tecnico-interface';
//components
import { ModalSearchTecnicoComponents } from './modal-search-tecnico/modal-search-tecnico.components';
import { TableTecnicoComponents } from './table-tecnico/table-tecnico.components';
//services
import { tecnicoService } from '../service/tecnico-service';
import { AlertService } from 'src/app/shared/services/Alert/alert.service';
import { ExportService } from 'src/app/shared/helpers/export.service';

@Component({
  selector: 'app-tecnico.components',
  templateUrl: './tecnico.components.html',
  styles: ``,
  imports: [
    AsyncPipe,
    MatIconModule,
    ModalSearchTecnicoComponents,
    TableTecnicoComponents
  ],
})
export class TecnicoComponents
{
  tecnico        : Observable<CustomPagedResponse<tecnicoInterface>>
  tecnicoFilter  : tecnicoFilter = { pageNumber: 1, pageSize: 5 }
  tecnicoTotal   : tecnicoFilter = { pageNumber: 1, pageSize: 4444 }

  constructor(private tecnicoService  : tecnicoService,
              private exportService   : ExportService,
              private alertService    : AlertService){
    this.tecnico = tecnicoService.tecnico
  }

  ngOnInit(): void {
    this.getTecnico();
  }

  addPagination(event: tecnicoFilter): void {
    this.tecnicoFilter.pageNumber = event.pageNumber
    this.tecnicoFilter.pageSize = event.pageSize
    this.getTecnico()
  }

  addFilter(event: tecnicoFilter): void {
    this.tecnicoFilter.identificacion       = event.identificacion
    this.tecnicoFilter.idtecnico            = event.idtecnico
    this.tecnicoFilter.idtipo_tecnico       = event.idtipo_tecnico
    this.tecnicoFilter.tarjeta_profecional  = event.tarjeta_profecional
    this.tecnicoFilter.pageNumber           = event.pageNumber
    this.tecnicoFilter.pageSize             = event.pageSize
    this.getTecnico()
  }

  getTecnico(): void {
    this.tecnicoService.getAllTecnico(this.tecnicoFilter).subscribe({
      next:(response: any) => {
        this.tecnicoService.updateTecnico(response)
      },error:(err: any) => {
        this.alertService.messageAlert({ message: "Por favor intente más tarde." });
      }
    });
  }
}
