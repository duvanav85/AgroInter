import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
//Components
import { ModalAsgVisitasComponents } from '../modal-asg-visitas/modal-asg-visitas.components';
//Interfaces
import { asgvisitaFilter, asgvisitaInterface } from '../../interface/asg-visitas-interface';
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
  selector: 'app-table-asg-visitas',
  templateUrl: './table-asg-visitas.components.html',
  styles: ``,
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
export class TableAsgVisitasComponents
{
  @Input() dataSource :CustomPagedResponse<asgvisitaInterface>={};
  @Output() sendDataPagination = new EventEmitter<asgvisitaFilter>();

  displayedColumns  : string[] = ['actions', 'idTicket', 'fecha_visita', 'idTecnico', 'nro_convenio', 'fecha_agenda'];
  filterPagination  : asgvisitaFilter={};

  opPag = { ...TABLE_PAGINATOR };

  constructor(private dialog: MatDialog) { }

  pageChanged(event: PageEvent): void {
    this.filterPagination.pageNumber=event.pageIndex+1
    this.filterPagination.pageSize=event.pageSize
    this.sendDataPagination.emit(this.filterPagination)
  }

  editAsgVisitas(asgvisita: asgvisitaInterface): void {
    const dialogRef = this.dialog.open(ModalAsgVisitasComponents, {
      width: '70%',
      maxHeight: '80vh',
      disableClose: true,
      data: { editMode: true, asgvisita }
    });

    dialogRef.afterClosed().subscribe(result => {});
  }
}
