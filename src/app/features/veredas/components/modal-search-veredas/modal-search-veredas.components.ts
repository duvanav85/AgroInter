import { Component, EventEmitter, Output } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
//Components
import { ModalVeredasComponents } from '../modal-veredas/modal-veredas.components';
//Interfaces
import { veredasFilter } from '../../interface/veredas-interface';
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
  selector: 'app-modal-search-veredas',
  templateUrl: './modal-search-veredas.components.html',
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
export class ModalSearchVeredasComponents
{
  @Output() setDataFiltro = new EventEmitter<veredasFilter>();
  @Output() downloadRequested = new EventEmitter<void>();

  filterPagination: veredasFilter = {};

  myForm: FormGroup = this._formBuilder.group({
    nombre_vereda:      [null],
    idciudad:           [null],
    iddepartamento:     [null],
    area_ha:            [null],
    poblacion:          [null],
  });

  constructor(private _formBuilder: FormBuilder,
              private dialog: MatDialog) { }

  addCause(): void {
    const dialogRef = this.dialog.open(ModalVeredasComponents, {
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
      nombre_vereda   : this.myForm.get('nombre_vereda')?.value || '',
      area_ha         : this.myForm.get('area_ha')?.value || '',
      poblacion       : this.myForm.get('poblacion')?.value || '',
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
      nombre_vereda   : '',
      area_ha         : 0,
      poblacion       : 0,
      pageNumber      : 1,
      pageSize        : 5
    }
    this.setDataFiltro.emit(this.filterPagination);
  }

  downloadData(): void {
    this.downloadRequested.emit();
  }
}
