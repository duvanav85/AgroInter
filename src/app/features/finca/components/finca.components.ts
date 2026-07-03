import { Component } from '@angular/core';
import { AsyncPipe } from '@angular/common';
import { Observable } from 'rxjs';
//material
import { MatIconModule } from '@angular/material/icon';
//interfaces
import { CustomPagedResponse } from 'src/app/core/models/dto/apiresponse.interface';
import { fincaInterface, fincaFilter } from '../interface/finca-interface';
//components
import { ModalSearchFincaComponents } from './modal-search-finca/modal-search-finca.components';
import { TableFincaComponents } from './table-finca/table-finca.components';
//services
import { fincaService } from '../service/finca-service';
import { AlertService } from 'src/app/shared/services/Alert/alert.service';
import { ExportService } from 'src/app/shared/helpers/export.service';

@Component({
  selector: 'app-finca.components',
  templateUrl: './finca.components.html',
  styles: ``,
  imports: [
    AsyncPipe,
    MatIconModule,
    ModalSearchFincaComponents,
    TableFincaComponents,
  ],
})
export class FincaComponents
{
  finca           : Observable<CustomPagedResponse<fincaInterface>>
  fincaFilter  : fincaFilter = { pageNumber: 1, pageSize: 5 }
  fincaTotal   : fincaFilter = { pageNumber: 1, pageSize: 4444 }

  constructor(private fincaService  : fincaService,
              private exportService  : ExportService,
              private alertService   : AlertService){
    this.finca = fincaService.finca;
  }

  ngOnInit(): void {
    this.getFinca();
  }

  addPagination(event: fincaFilter): void {
    this.fincaFilter.pageNumber = event.pageNumber
    this.fincaFilter.pageSize = event.pageSize
    this.getFinca()
  }

  addFilter(event: fincaFilter): void {
    this.fincaFilter.identificacion          = event.identificacion
    this.fincaFilter.nombre_propietario      = event.nombre_propietario
    this.fincaFilter.idMunicipio             = event.idMunicipio
    this.fincaFilter.vereda                  = event.idMunicipio
    this.fincaFilter.area                    = event.area
    this.fincaFilter.nro_Arboles             = event.nro_Arboles
    this.fincaFilter.registro_ICA            = event.registro_ICA
    this.fincaFilter.gobal_Gap               = event.gobal_Gap
    this.fincaFilter.gobal_Gap               = event.rainforest
    this.fincaFilter.gobal_Gap               = event.certificadoXX
    this.fincaFilter.gobal_Gap               = event.certificadoYY
    this.fincaFilter.pageNumber              = event.pageNumber
    this.fincaFilter.pageSize                = event.pageSize
    this.getFinca()
  }

  getFinca(): void {
    this.fincaService.getAllFinca(this.fincaFilter).subscribe({
      next:(response: any) => {
        this.fincaService.updateFinca(response)
      },error:(err: any) => {
        this.alertService.messageAlert({ message: "Por favor intente más tarde." });
      }
    });
  }
}
