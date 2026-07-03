import { Component, EventEmitter, Output } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
//Components
import { ModalSectoresComponents } from '../modal-sectores/modal-sectores.components';
//Interfaces
import { sectoresFilter } from '../../interface/sectores-interface';
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
  selector: 'app-modal-search-sectores',
  templateUrl: './modal-search-sectores.components.html',
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
export class ModalSearchSectoresComponents
{
  @Output() setDataFiltro = new EventEmitter<sectoresFilter>();
  @Output() downloadRequested = new EventEmitter<void>();

  filterPagination: sectoresFilter = {};

  myForm: FormGroup = this._formBuilder.group({
    nombre:       [null],
    descripcion:  [null],
    codsector:    [null],
    activo:       [null],
  });

  constructor(private _formBuilder: FormBuilder,
              private dialog: MatDialog) { }

  addCause(): void {
    const dialogRef = this.dialog.open(ModalSectoresComponents, {
      width: '70%',
      maxHeight: '80vh',
      disableClose: true,
      data: { modoEdicion: false }
    });

    dialogRef.afterClosed().subscribe(result => {});
  }

  advancedSearch(): void {
    this.filterPagination={
      nombre          : this.myForm.get('nombre')?.value || '',
      descripcion     : this.myForm.get('descripcion')?.value || '',
      codsector       : this.myForm.get('codsector')?.value || '',
      activo          : this.myForm.get('activo')?.value || '',
      pageNumber: 1,
      pageSize  : 5
    }
    this.setDataFiltro.emit(this.filterPagination);
  }

  clearSearch(): void {
    this.myForm.reset();
    this.filterPagination={
      nombre          : '',
      descripcion     : '',
      codsector       : '',
      activo          : false,
      pageNumber      : 1,
      pageSize        : 5
    }
    this.setDataFiltro.emit(this.filterPagination);
  }

  downloadData(): void {
    this.downloadRequested.emit();
  }
}
