import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
//Components
import { ModalVeredasComponents } from '../modal-veredas/modal-veredas.components';
//Interfaces
import { veredasFilter, veredasInterface } from '../../interface/veredas-interface';
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
  selector: 'app-table-veredas',
  templateUrl: './table-veredas.components.html',
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
export class TableVeredasComponents
{
  @Input() dataSource :CustomPagedResponse<veredasInterface>={};
  @Output() sendDataPagination = new EventEmitter<veredasFilter>();

  displayedColumns  : string[] = ['actions', 'nombre_vereda','iddepartamento', 'idciudad', 'area_ha', 'poblacion'];
  filterPagination  : veredasFilter={};

  opPag = { ...TABLE_PAGINATOR };

  constructor(private dialog: MatDialog) { }

  pageChanged(event: PageEvent): void {
    this.filterPagination.pageNumber=event.pageIndex+1
    this.filterPagination.pageSize=event.pageSize
    this.sendDataPagination.emit(this.filterPagination)
  }

  editPaises(paises: veredasInterface): void {
    const dialogRef = this.dialog.open(ModalVeredasComponents, {
      width: '70%',
      maxHeight: '80vh',
      disableClose: true,
      data: { editMode: true, paises }
    });

    dialogRef.afterClosed().subscribe(result => {});
  }
}
