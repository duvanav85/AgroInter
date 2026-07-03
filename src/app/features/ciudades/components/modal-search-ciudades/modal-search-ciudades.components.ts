import { Component, EventEmitter, Output } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
//Components
import { ModalCiudadesComponents } from '../modal-ciudades/modal-ciudades.components';
//Interfaces
import { ciudadesFilter } from '../../interfaces/ciudades-interface';
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

@Component({
  selector: 'app-modal-search-ciudades',
  templateUrl: './modal-search-ciudades.components.html',
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
export class ModalSearchCiudadesComponents
{
  @Output() setDataFiltro = new EventEmitter<ciudadesFilter>();
  @Output() downloadRequested = new EventEmitter<void>();

  filterPagination: ciudadesFilter = {};

  myForm: FormGroup = this._formBuilder.group({
    idciudad:         [null],
    iddepartamento:   [null],
    descripcion:      [null],
  });

  constructor(private _formBuilder: FormBuilder,
              private dialog: MatDialog) { }

  addCause(): void {
    const dialogRef = this.dialog.open(ModalCiudadesComponents, {
      width: '70%',
      maxHeight: '80vh',
      disableClose: true,
      data: { modoEdicion: false }
    });

    dialogRef.afterClosed().subscribe(result => {});
  }

  advancedSearch(): void {
    this.filterPagination={
      idciudad        : this.myForm.get('idciudad')?.value || '',
      iddepartamento  : this.myForm.get('iddepartamento')?.value || '',
      descripcion     : this.myForm.get('descripcion')?.value || '',
      pageNumber: 1,
      pageSize  : 5
    }
    this.setDataFiltro.emit(this.filterPagination);
  }

  clearSearch(): void {
    this.myForm.reset();
    this.filterPagination={
      idciudad        : 0,
      iddepartamento  : 0,
      descripcion     : '',
      pageNumber      : 1,
      pageSize        : 5
    }
    this.setDataFiltro.emit(this.filterPagination);
  }

  downloadData(): void {
    this.downloadRequested.emit();
  }
}
