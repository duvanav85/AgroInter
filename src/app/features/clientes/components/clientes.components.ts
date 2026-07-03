import { Component } from '@angular/core';
import { AsyncPipe } from '@angular/common';
import { Observable } from 'rxjs';
//material
import { MatIconModule } from '@angular/material/icon';
//interfaces
import { CustomPagedResponse } from 'src/app/core/models/dto/apiresponse.interface';
import { clientesInterface, clientesFilter } from '../interface/clientes-interface';
//components
import { ModalSearchClientesComponents } from './modal-search-clientes/modal-search-clientes.components';
import { TableClientesComponents } from './table-clientes/table-clientes.components';
//services
import { clientesService } from '../services/clientes-services';
import { AlertService } from 'src/app/shared/services/Alert/alert.service';
import { ExportService } from 'src/app/shared/helpers/export.service';

@Component({
  selector: 'app-clientes.components',
  templateUrl: './clientes.components.html',
  styles: ``,
  imports: [
    AsyncPipe,
    MatIconModule,
    ModalSearchClientesComponents,
    TableClientesComponents,
  ],
})
export class ClientesComponents
{
  clientes        : Observable<CustomPagedResponse<clientesInterface>>
  clientesFilter  : clientesFilter = { pageNumber: 1, pageSize: 5 }
  clientesTotal   : clientesFilter = { pageNumber: 1, pageSize: 4444 }

  constructor(private clientesService   : clientesService,
              private exportService     : ExportService,
              private alertService      : AlertService){
    this.clientes = clientesService.clientes
  }

  ngOnInit(): void {
    this.getClientes();
  }

  addPagination(event: clientesFilter): void {
    this.clientesFilter.pageNumber = event.pageNumber
    this.clientesFilter.pageSize = event.pageSize
    this.getClientes()
  }

  addFilter(event: clientesFilter): void {
    this.clientesFilter.cedula              = event.cedula
    this.clientesFilter.nombre              = event.nombre
    this.clientesFilter.apellidos           = event.apellidos
    this.clientesFilter.idtipo_iden         = event.idtipo_iden
    this.clientesFilter.idtipo_contacto     = event.idtipo_contacto
    this.clientesFilter.idtipo_ciiu         = event.idtipo_ciiu
    this.clientesFilter.idagencia           = event.idagencia
    this.clientesFilter.idejec_cuenta       = event.idejec_cuenta
    this.clientesFilter.idzona              = event.idzona
    this.clientesFilter.idtipo_tercero      = event.idtipo_tercero
    this.clientesFilter.gran_contribuyente  = event.gran_contribuyente
    this.clientesFilter.autoretenedor       = event.autoretenedor
    this.clientesFilter.pageNumber          = event.pageNumber
    this.clientesFilter.pageSize            = event.pageSize
    this.getClientes()
  }

  getClientes(): void {
    this.clientesService.getAllClientes(this.clientesFilter).subscribe({
      next:(response: any) => {
        this.clientesService.updateCliente(response)
      },error:(err: any) => {
        this.alertService.messageAlert({ message: "Por favor intente más tarde." });
      }
    });
  }
}
