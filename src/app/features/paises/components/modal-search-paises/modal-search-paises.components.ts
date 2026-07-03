import { Component, EventEmitter, Output } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
//Components
import { ModalPaisesComponents } from '../modal-paises/modal-paises.components';
//Interfaces
import { paisesFilter } from '../../interface/paises-interface';
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
import { MAT_DIALOG_DATA, MatDialogRef, MatDialog } from '@angular/material/dialog';
//Function
import { getStatusValue } from '../../../../shared/helpers/getStatusValue';


@Component({
  selector: 'app-modal-search-paises',
  templateUrl: './modal-search-paises.components.html',
  standalone: true,
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
export class ModalSearchPaisesComponents
{
  @Output() setDataFiltro = new EventEmitter<paisesFilter>();
  @Output() downloadRequested = new EventEmitter<void>();

  filterPagination: paisesFilter = {};

  myForm: FormGroup = this._formBuilder.group({
    paisid:       [null],
    codigo:       [null],
    id_DIAN:      [null],
    descripcion:  [null],
    status:       [null],
  });

  constructor(private _formBuilder: FormBuilder,
              private dialog: MatDialog) { }

  addCause(): void {
    const dialogRef = this.dialog.open(ModalPaisesComponents, {
      width: '70%',
      maxHeight: '80vh',
      disableClose: true,
      data: { modoEdicion: false }
    });

    dialogRef.afterClosed().subscribe(result => {});
  }

  advancedSearch(): void {
    this.filterPagination={
      paisid          : this.myForm.get('paisid')?.value || '',
      codigo          : this.myForm.get('codigo')?.value || '',
      id_DIAN         : this.myForm.get('id_DIAN')?.value || '',
      descripcion     : this.myForm.get('descripcion')?.value || '',
      Active          : getStatusValue(this.myForm.get('status')?.value) ?? false,
      pageNumber: 1,
      pageSize  : 5
    }
    this.setDataFiltro.emit(this.filterPagination);
  }

  clearSearch(): void {
    this.myForm.reset();
    this.filterPagination={
      paisid          : '',
      codigo          : '',
      id_DIAN         : '',
      descripcion     : '',
      Active          : false,
      pageNumber      : 1,
      pageSize        : 5
    }
    this.setDataFiltro.emit(this.filterPagination);
  }

  downloadData(): void {
    this.downloadRequested.emit();
  }
}
