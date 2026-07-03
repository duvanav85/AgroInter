import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
//Components
import { ModalVisitaComponents } from '../modal-visita/modal-visita.components';
//Interfaces
import { visitaInterface, visitaFilter } from '../../interface/visita-interface';
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
  selector: 'app-table-visita',
  templateUrl: './table-visita.components.html',
  styles: ``,
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
export class TableVisitaComponents
{
  @Input() dataSource :CustomPagedResponse<visitaInterface>={};
  @Output() sendDataPagination = new EventEmitter<visitaFilter>();

  displayedColumns  : string[] = ['actions', 'visitaId', 'idAVisita', 'edo_ticket', 'productorId', 'idPredio', 'idDepartamento', 'idMunicipio', 'idVereda', 'Direccion', 'idTipoCultivo'];
  filterPagination  : visitaFilter={};

  opPag = { ...TABLE_PAGINATOR };

  constructor(private dialog: MatDialog) { }

  pageChanged(event: PageEvent): void {
    this.filterPagination.pageNumber=event.pageIndex+1
    this.filterPagination.pageSize=event.pageSize
    this.sendDataPagination.emit(this.filterPagination)
  }

  editVisita(visita: visitaInterface): void {
    const dialogRef = this.dialog.open(ModalVisitaComponents, {
      width         : '70%',
      maxHeight     : '80vh',
      disableClose  : true,
      data          : { editMode: true, visita }
    });

    dialogRef.afterClosed().subscribe(result => {});
  }
}
