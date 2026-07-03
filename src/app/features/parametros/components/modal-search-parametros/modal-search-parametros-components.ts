import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { lastValueFrom } from 'rxjs';
//Components
import { ModalParametrosComponents } from '../modal-parametros/modal-parametros-components';
//Interfaces
import { ParametrosInterface, parametrosFilter } from '../../Interface/parametros-interface';
import { CustomPagedResponse } from '../../../../core/models/dto/apiresponse.interface';
//Service
import { ParametrosServices } from '../../services/parametros-services';
import { AlertService } from  '../../../../shared/services/Alert/alert.service'
//Enum
import { ExportFormats } from 'src/app/shared/enums/exportFormat.enum';
//Helper
import { ExportService } from 'src/app/shared/helpers/export.service';
//Material
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatCardModule } from '@angular/material/card';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatIconModule } from '@angular/material/icon';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatButtonModule } from '@angular/material/button';
import { MatTableModule } from '@angular/material/table';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-modal-search-parametros',
  templateUrl: './modal-search-parametros-components.html',
  styleUrl: './modal-search-parametros-components.scss',
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
export class ModalSearchParametrosComponents
{
  @Input() dataSource: CustomPagedResponse<ParametrosInterface> = {};
  @Output() setDataFiltro = new EventEmitter<any>();
  @Output() downloadRequested = new EventEmitter<void>();

  filterPagination: parametrosFilter = {};

  myForm: FormGroup = this._formBuilder.group({
    parametro       : [null],
    nombreParametro : [null],
  });

  constructor(private  paramtrosServices: ParametrosServices,
              private  alertService:      AlertService,
              private  exportService:     ExportService,
              private  _formBuilder:      FormBuilder,
              private  dialog: MatDialog) { }

  addParametros(): void {
    const dialogRef = this.dialog.open(ModalParametrosComponents, {
      width: '70%',
      maxHeight: '80vh',
      disableClose: true,
      data: { modoEdicion: false }
    });

    dialogRef.afterClosed().subscribe(result => { });
  }

  advancedSearch(): void {
    let filterPagination = {
      parametro:        this.myForm.get('paramentro')?.value || undefined,
      nombreParametro:  this.myForm.get('nombreParametro')?.value || undefined,
      pageNumber: 1,
      pageSize: 5,
    };
    this.setDataFiltro.emit(filterPagination);
  }

  clearSearch(): void {
    this.myForm.reset();
    this.filterPagination = {
      pageNumber: 1,
      pageSize: 5
    }
    this.setDataFiltro.emit(this.filterPagination);
  }

  downloadData(): void {
    this.downloadRequested.emit();
  }

  async getParametrosDownload(): Promise<void> {

    const today    = new Date().toISOString().slice(0, 10).replace(/-/g, '');
    const filename = `parametros_${today}.xlsx`;
    const columns  = ['Paramentros', 'NombreParametros'];

    try {
      let getAllParametros$ = this.paramtrosServices.getAllParametros(this.filterPagination);
      let  data = (await lastValueFrom(getAllParametros$)).data;
      let dataDownload: any = data?.map((parametro: ParametrosInterface) => [parametro.parametro, parametro.nombreParametro]);
      this.exportService.export(filename, ExportFormats.EXCEL, columns, dataDownload);
    } catch (err) {
      this.alertService.messageAlert({ message: "Por favor intente más tarde." })
    }
  }

}
