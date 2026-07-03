import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
//Components
import { ModalDepartamentosComponents } from '../modal-departamentos/modal-departamentos.components';
//Interfaces
import { departamentosInterface, departamentosFilter } from '../../interface/departamentos-interface';
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
  selector: 'app-table-departamentos',
  templateUrl: './table-departamentos.components.html',
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
export class TableDepartamentosComponents
{
  @Input() dataSource :CustomPagedResponse<departamentosInterface>={};
  @Output() sendDataPagination = new EventEmitter<departamentosFilter>();

  displayedColumns  : string[] = ['actions', 'departamentoid','codigo', 'departamento', 'idpais', 'active'];
  filterPagination  : departamentosFilter={};

  opPag = { ...TABLE_PAGINATOR };

  constructor(private dialog: MatDialog) { }

  pageChanged(event: PageEvent): void {
    this.filterPagination.pageNumber=event.pageIndex+1
    this.filterPagination.pageSize=event.pageSize
    this.sendDataPagination.emit(this.filterPagination)
  }

  editPaises(departamentos: departamentosInterface): void {
    const dialogRef = this.dialog.open(ModalDepartamentosComponents, {
      width: '70%',
      maxHeight: '80vh',
      disableClose: true,
      data: { editMode: true, departamentos }
    });

    dialogRef.afterClosed().subscribe(result => {});
  }
}
