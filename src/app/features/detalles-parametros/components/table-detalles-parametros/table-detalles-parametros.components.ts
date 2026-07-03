import { AsyncPipe } from '@angular/common';
import { Component, EventEmitter, Input, OnInit, Output  } from '@angular/core';
import { Observable, lastValueFrom } from 'rxjs';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
//Material
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatDialog } from '@angular/material/dialog';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatPaginatorModule, PageEvent } from '@angular/material/paginator';
import { MatSelectModule } from '@angular/material/select';
import { MatTableModule } from '@angular/material/table';
import { MatTooltipModule } from '@angular/material/tooltip';
//interfaces
import { DetalleParametrosInterface, DetalleParametrosFilter } from '../../interface/detalle-parametros-interface';
import { CustomPagedResponse } from 'src/app/core/models/dto/apiresponse.interface';
import { TABLE_PAGINATOR } from '../../../../shared/constants/table-paginator';
//services
import { AlertService } from 'src/app/shared/services/Alert/alert.service';
import { ExportService } from 'src/app/shared/helpers/export.service';
import { DetalleParametrosService } from '../../services/detalle-parametros.service';
//components
import { ModalDetellesParametrosComponents } from '../modal-detalles-parametros/modal-detelles-parametros.components';

@Component({
  selector: 'app-table-detalles-parametros',
  templateUrl: './table-detalles-parametros.components.html',
  styleUrl: './table-detalles-parametros.components.scss',
  imports: [
    FormsModule,
    MatButtonModule,
    MatCardModule,
    MatExpansionModule,
    MatIconModule,
    MatInputModule,
    MatPaginatorModule,
    MatSelectModule,
    MatTableModule,
    MatTooltipModule,
    ReactiveFormsModule,
  ],
})
export class TableDetallesParametrosComponents
{
  @Input() dataSource :CustomPagedResponse<DetalleParametrosInterface>={};
  @Output() sendDataPagination = new EventEmitter<DetalleParametrosFilter>();

  detallesparametros  : CustomPagedResponse<DetalleParametrosInterface>={};
  displayedColumns    : string[] = ['actions', 'idparametro', 'idregistro', 'descripcion', 'activo'];
  filterPagination    : DetalleParametrosFilter={};

  opPag = { ...TABLE_PAGINATOR };

  constructor(private dialog: MatDialog) { }


  pageChanged(event: PageEvent): void {
    this.filterPagination.pageNumber=event.pageIndex+1
    this.filterPagination.pageSize=event.pageSize
    this.sendDataPagination.emit(this.filterPagination)
  }

  editDetalleParametros(detalleparametros: DetalleParametrosInterface): void {
    const dialogRef = this.dialog.open(ModalDetellesParametrosComponents, {
      width: '70%',
      maxHeight: '80vh',
      disableClose: true,
      data: { editMode: true, detalleparametros }
    });

    dialogRef.afterClosed().subscribe(result => {});
  }

  getParametroName(paraId: number): string {
    const parametro = this.detallesparametros.data?.find(p => p.idparametro === paraId);
    return parametro?.descripcion ?  parametro.descripcion : '';
  }
}
