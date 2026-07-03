import { Component, EventEmitter, Output } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
//Components
import { ModalTecnicoComponents } from '../modal-tecnico/modal-tecnico.components';
//Interfaces
import { tecnicoFilter } from '../../interface/tecnico-interface';
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
  selector: 'app-modal-search-tecnico',
  templateUrl: './modal-search-tecnico.components.html',
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
export class ModalSearchTecnicoComponents
{
  @Output() setDataFiltro = new EventEmitter<tecnicoFilter>();
  @Output() downloadRequested = new EventEmitter<void>();

  filterPagination: tecnicoFilter = {};

  myForm: FormGroup = this._formBuilder.group({
    identificacion:       [null],
    idtipo_tecnico:       [null],
    tarjeta_profecional:  [null],
    nombre_tecnico:       [null],
    correo:               [null],
    telefono:             [null],
  });

  constructor(private _formBuilder: FormBuilder,
              private dialog: MatDialog) { }

  addCause(): void {
    const dialogRef = this.dialog.open(ModalTecnicoComponents, {
      width: '70%',
      maxHeight: '80vh',
      disableClose: true,
      data: { modoEdicion: false }
    });

    dialogRef.afterClosed().subscribe(result => {});
  }

  advancedSearch(): void {
    this.filterPagination={
      identificacion        : this.myForm.get('barrioid')?.value || '',
      idtipo_tecnico        : this.myForm.get('ciudadid')?.value || '',
      tarjeta_profecional   : this.myForm.get('ciudadid')?.value || '',
      pageNumber: 1,
      pageSize  : 5
    }
    this.setDataFiltro.emit(this.filterPagination);
  }

  clearSearch(): void {
    this.myForm.reset();
    this.filterPagination={
      identificacion        : 0,
      idtipo_tecnico        : 0,
      tarjeta_profecional   : 0,
      pageNumber            : 1,
      pageSize              : 5
    }
    this.setDataFiltro.emit(this.filterPagination);
  }

  downloadData(): void {
    this.downloadRequested.emit();
  }
}
