import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
//Components
import { ModalFincaComponents } from '../modal-finca/modal-finca.components';
//Interfaces
import { fincaInterface, fincaFilter } from '../../interface/finca-interface';
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
  selector: 'app-table-finca',
  templateUrl: './table-finca.components.html',
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
export class TableFincaComponents
{
  @Input() dataSource :CustomPagedResponse<fincaInterface>={};
  @Output() sendDataPagination = new EventEmitter<fincaFilter>();

  displayedColumns  : string[] = ['actions', 'identificacion','nombre_propietario', 'telefono', 'direccion', 'idMunicipio', 'vereda', 'area', 'sistema_Productivo',
                                  'variedad', 'desindad_Siembra', 'distribucion_planta', 'nro_Arboles', 'registro_ICA', 'gobal_Gap', 'rainforest', 'certificadoXX',
                                  'certificadoYY'
                                 ];
  filterPagination  : fincaFilter={};

  opPag = { ...TABLE_PAGINATOR };

  constructor(private dialog: MatDialog) { }

  pageChanged(event: PageEvent): void {
    this.filterPagination.pageNumber=event.pageIndex+1
    this.filterPagination.pageSize=event.pageSize
    this.sendDataPagination.emit(this.filterPagination)
  }

  editPaises(paises: fincaInterface): void {
    const dialogRef = this.dialog.open(ModalFincaComponents, {
      width: '70%',
      maxHeight: '80vh',
      disableClose: true,
      data: { editMode: true, paises }
    });

    dialogRef.afterClosed().subscribe(result => {});
  }
}
