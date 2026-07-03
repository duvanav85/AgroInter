import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
//Components
import { ModalBarriosComponents } from '../modal-barrios/modal-barrios.components';
//Interfaces
import { barriosFilter, barriosInterfaces } from '../../interfaces/barrios-interface';
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
  selector: 'app-table-barrios',
  templateUrl: './table-barrios.components.html',
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
export class TableBarriosComponents
{
  @Input() dataSource :CustomPagedResponse<barriosInterfaces>={};
  @Output() sendDataPagination = new EventEmitter<barriosFilter>();

  displayedColumns  : string[] = ['actions', 'idbarrio','idciudad', 'descripcion'];
  filterPagination  : barriosFilter={};

  opPag = { ...TABLE_PAGINATOR };

  constructor(private dialog: MatDialog) { }

  pageChanged(event: PageEvent): void {
    this.filterPagination.pageNumber=event.pageIndex+1
    this.filterPagination.pageSize=event.pageSize
    this.sendDataPagination.emit(this.filterPagination)
  }

  editBarrios(barrios: barriosInterfaces): void {
    const dialogRef = this.dialog.open(ModalBarriosComponents, {
      width: '70%',
      maxHeight: '80vh',
      disableClose: true,
      data: { editMode: true, barrios }
    });

    dialogRef.afterClosed().subscribe(result => {});
  }
}
