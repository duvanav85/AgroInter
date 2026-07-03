import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
//Components
import { ModalClientesComponents } from '../modal-clientes/modal-clientes.components';
//Interfaces
import { clientesInterface, clientesFilter } from '../../interface/clientes-interface';
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
  selector: 'app-table-clientes',
  templateUrl: './table-clientes.components.html',
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
export class TableClientesComponents
{
  @Input() dataSource :CustomPagedResponse<clientesInterface>={};
  @Output() sendDataPagination = new EventEmitter<clientesFilter>();

  displayedColumns  : string[] = ['actions', 'clienteId', 'cedula', 'digito', 'nombre', 'apellidos', 'idtipo_iden', 'idtipo_contacto','idtipo_ciiu', 'idagencia', 'idejec_cuenta'
                                , 'idzona', 'idtipo_tercero', 'gran_contribuyente', 'autoretenedor', 'email', 'email1', 'email2', 'foto'];
  filterPagination  : clientesFilter={};

  opPag = { ...TABLE_PAGINATOR };

  constructor(private dialog: MatDialog) { }

  pageChanged(event: PageEvent): void {
    this.filterPagination.pageNumber=event.pageIndex+1
    this.filterPagination.pageSize=event.pageSize
    this.sendDataPagination.emit(this.filterPagination)
  }

  editClientes(clientes: clientesInterface): void {
    const dialogRef = this.dialog.open(ModalClientesComponents, {
      width         : '70%',
      maxHeight     : '80vh',
      disableClose  : true,
      data          : { editMode: true, clientes }
    });

    dialogRef.afterClosed().subscribe(result => {});
  }
}
