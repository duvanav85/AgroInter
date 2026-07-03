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
import { parametrosFilter, ParametrosInterface } from '../../Interface/parametros-interface';
import { CustomPagedResponse } from 'src/app/core/models/dto/apiresponse.interface';

//interfaces
import { TABLE_PAGINATOR } from '../../../../shared/constants/table-paginator';
import { AlertService } from 'src/app/shared/services/Alert/alert.service';

//services
import { ExportService } from 'src/app/shared/helpers/export.service';
import { ParametrosServices } from '../../services/parametros-services';
import { ModalParametrosComponents } from '../modal-parametros/modal-parametros-components';

@Component({
  selector: 'app-table-parametros',
  templateUrl: './table-parametros-components.html',
  styleUrl: './table-parametros-components.scss',
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
export class TableParametrosComponents
{
  @Input() dataSource :CustomPagedResponse<ParametrosInterface>={};
  @Output() sendDataPagination = new EventEmitter<parametrosFilter>();

  parametros        : CustomPagedResponse<ParametrosInterface>={};
  displayedColumns  : string[] = ['actions', 'parametro', 'nombreParametro'];
  filterPagination  : parametrosFilter={};

  opPag = { ...TABLE_PAGINATOR };

  constructor(private dialog: MatDialog,
              private parametrosService: ParametrosServices,
              private alertService: AlertService) { }

  ngOnInit(): void {
    this.parametrosService.parametros.subscribe({
      next:(parametros) => {
      this.parametros = parametros;
    }, error:(err: any) => {
      this.alertService.messageAlert({ message: "Por favor intente más tarde." });
    }});
  }

  pageChanged(event: PageEvent): void {
    this.filterPagination.pageNumber=event.pageIndex+1
    this.filterPagination.pageSize=event.pageSize
    this.sendDataPagination.emit(this.filterPagination)
  }

  editParametros(parametros: ParametrosInterface): void {
    const dialogRef = this.dialog.open(ModalParametrosComponents, {
      width: '70%',
      maxHeight: '80vh',
      disableClose: true,
      data: { editMode: true, parametros }
    });

    dialogRef.afterClosed().subscribe(result => {});
  }

  getParametroName(paraId: number): string {
    const  prm = this.parametros.data?.find(p => p.parametro === paraId);
    return prm?.nombreParametro ?  prm.nombreParametro : '';
  }
}
