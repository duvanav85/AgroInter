import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
//Components
import { ModalTiposCiiuComponents } from '../modal-tipos-ciiu/modal-tipos-ciiu.components';
//Interfaces
import { tiposCiiuFilter, tiposCiiuInterface } from '../../interface/tipos-ciiu-interface';
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
  selector: 'app-table-tipos-ciiu',
  templateUrl: './table-tipos-ciiu.components.html',
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
export class TableTiposCiiuComponents
{
  @Input() dataSource :CustomPagedResponse<tiposCiiuInterface>={};
  @Output() sendDataPagination = new EventEmitter<tiposCiiuFilter>();

  displayedColumns  : string[] = ['actions', 'division', 'grupo', 'clase', 'descripcion'];
  filterPagination  : tiposCiiuFilter={};

  opPag = { ...TABLE_PAGINATOR };

  constructor(private dialog: MatDialog) { }

  pageChanged(event: PageEvent): void {
    this.filterPagination.pageNumber=event.pageIndex+1
    this.filterPagination.pageSize=event.pageSize
    this.sendDataPagination.emit(this.filterPagination)
  }

  editTiposCiiu(tiposCiiu: tiposCiiuInterface): void {
    const dialogRef = this.dialog.open(ModalTiposCiiuComponents, {
      width: '70%',
      maxHeight: '80vh',
      disableClose: true,
      data: { editMode: true, tiposCiiu }
    });

    dialogRef.afterClosed().subscribe(result => {});
  }
}
