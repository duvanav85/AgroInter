import { Component, EventEmitter, Output } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
//Components
import { ModalDepartamentosComponents } from '../modal-departamentos/modal-departamentos.components';
//Interfaces
import { departamentosFilter } from '../../interface/departamentos-interface';
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
  selector: 'app-modal-search-departamentos',
  templateUrl: './modal-search-departamentos.components.html',
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
export class ModalSearchDepartamentosComponents
{
  @Output() setDataFiltro = new EventEmitter<departamentosFilter>();
  @Output() downloadRequested = new EventEmitter<void>();

  filterPagination: departamentosFilter = {};

  myForm: FormGroup = this._formBuilder.group({
    dptoid:       [null],
    codigo:       [null],
    dpto:         [null],
    paisid:       [null],
    status:       [null],
  });

  constructor(private _formBuilder: FormBuilder,
              private dialog: MatDialog) { }

  addCause(): void {
    const dialogRef = this.dialog.open(ModalDepartamentosComponents, {
      width: '70%',
      maxHeight: '80vh',
      disableClose: true,
      data: { modoEdicion: false }
    });

    dialogRef.afterClosed().subscribe(result => {});
  }

  advancedSearch(): void {
    this.filterPagination={
      departamentoid  : this.myForm.get('dptoid')?.value || '',
      codigo          : this.myForm.get('codigo')?.value || '',
      idpais          : this.myForm.get('dpto')?.value || '',
      departamento    : this.myForm.get('paisid')?.value || '',
      active          : getStatusValue(this.myForm.get('status')?.value) ?? false,
      pageNumber: 1,
      pageSize  : 5
    }
    this.setDataFiltro.emit(this.filterPagination);
  }

  clearSearch(): void {
    this.myForm.reset();
    this.filterPagination={
      departamentoid  : '',
      codigo          : '',
      idpais          : '',
      departamento    : '',
      active          : false,
      pageNumber      : 1,
      pageSize        : 5
    }
    this.setDataFiltro.emit(this.filterPagination);
  }

  downloadData(): void {
    this.downloadRequested.emit();
  }
}
