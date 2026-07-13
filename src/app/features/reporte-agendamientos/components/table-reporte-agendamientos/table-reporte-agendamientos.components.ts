import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
//Components
import { ModalReporteAgendamientosComponents } from '../modal-reporte-agendamientos/modal-reporte-agendamientos.components';
//Interfaces
import { allreporteAgendamientoInterface, reporteAgendamientoInterface, reporteAgendamientoFilter } from '../../interface/reporte-agendamientos-interface';
import { CustomPagedResponse } from '../../../../core/models/dto/apiresponse.interface';
import { TABLE_PAGINATOR } from '../../../../shared/constants/table-paginator';
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

@Component({
  selector: 'app-table-reporte-agendamientos',
  templateUrl: './table-reporte-agendamientos.components.html',
  styleUrl: './table-reporte-agendamientos.components.scss',
  imports: [
    FormsModule,
    ReactiveFormsModule,
    MatButtonModule,
    MatCardModule,
    MatExpansionModule,
    MatIconModule,
    MatInputModule,
    MatPaginatorModule,
    MatSelectModule,
    MatTableModule,
    MatTooltipModule,
  ],
})
export class TableReporteAgendamientosComponents
{
  @Input() dataSource :CustomPagedResponse<allreporteAgendamientoInterface>={};
  @Output() sendDataPagination = new EventEmitter<reporteAgendamientoFilter>();
                                  //'actions',
  displayedColumns  : string[] = [ 'semaforo','idTicket','estado_ticket','fecha_visita', 'idTecnico',
                                  'nombre_tecnico', 'apellido_tecnico','nro_convenio','fecha_agenda','horario_agenda',
                                  'id_productor','nombre_productor','apellido_productor','tipo_documento','celular','correo'];
  filterPagination  : reporteAgendamientoFilter={};

  opPag = { ...TABLE_PAGINATOR };

  constructor(private dialog: MatDialog) { }

  pageChanged(event: PageEvent): void {
    this.filterPagination.pageNumber=event.pageIndex+1
    this.filterPagination.pageSize=event.pageSize
    this.sendDataPagination.emit(this.filterPagination)
  }

  editReporteAgendamientos(reporteagendamientos: reporteAgendamientoInterface): void {
      const dialogRef = this.dialog.open(ModalReporteAgendamientosComponents, {
      width: '70%',
      maxHeight: '80vh',
      disableClose: true,
      data: { editMode: true, reporteagendamientos }
    });

    dialogRef.afterClosed().subscribe(result => {});
  }
}
