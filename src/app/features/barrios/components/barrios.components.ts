import { Component } from '@angular/core';
import { AsyncPipe } from '@angular/common';
import { Observable } from 'rxjs';
//material
import { MatIconModule } from '@angular/material/icon';
//interfaces
import { CustomPagedResponse } from 'src/app/core/models/dto/apiresponse.interface';
import { barriosFilter, barriosInterfaces } from '../interfaces/barrios-interface';
//components
import { ModalSearchBarriosComponents } from './modal-search-barrios/modal-search-barrios.components';
import { TableBarriosComponents } from './table-barrios/table-barrios.components';
//services
import { barriosService } from '../services/barrios-service';
import { AlertService } from 'src/app/shared/services/Alert/alert.service';
import { ExportService } from 'src/app/shared/helpers/export.service';

@Component({
  selector: 'app-barrios.components',
  templateUrl: './barrios.components.html',
  styles: ``,
  imports: [
    AsyncPipe,
    MatIconModule,
    ModalSearchBarriosComponents,
    TableBarriosComponents,
  ],
})
export class BarriosComponents
{
  barrios       : Observable<CustomPagedResponse<barriosInterfaces>>
  barriosFilter  : barriosFilter = { pageNumber: 1, pageSize: 5 }
  barriosTotal   : barriosFilter = { pageNumber: 1, pageSize: 4444 }

  constructor(private barriosService  : barriosService,
              private exportService   : ExportService,
              private alertService    : AlertService){
    this.barrios = barriosService.barrios
  }

  ngOnInit(): void {
    this.getBarrios();
  }

  addPagination(event: barriosFilter): void {
    this.barriosFilter.pageNumber = event.pageNumber
    this.barriosFilter.pageSize = event.pageSize
    this.getBarrios()
  }

  addFilter(event: barriosFilter): void {
    this.barriosFilter.idbarrio       = event.idbarrio
    this.barriosFilter.idciudad       = event.idciudad
    this.barriosFilter.descripcion    = event.descripcion
    this.barriosFilter.pageNumber     = event.pageNumber
    this.barriosFilter.pageSize       = event.pageSize
    this.getBarrios()
  }

  getBarrios(): void {
    this.barriosService.getAllBarrios(this.barriosFilter).subscribe({
      next:(response: any) => {
        this.barriosService.updateBarrios(response)
      },error:(err: any) => {
        this.alertService.messageAlert({ message: "Por favor intente más tarde." });
      }
    });
  }
}
