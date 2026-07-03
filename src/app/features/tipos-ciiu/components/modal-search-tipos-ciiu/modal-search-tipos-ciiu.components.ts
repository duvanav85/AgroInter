import { Component, EventEmitter, Output } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
//Components
import { ModalTiposCiiuComponents } from '../modal-tipos-ciiu/modal-tipos-ciiu.components';
//Interfaces
import { tiposCiiuFilter } from '../../interface/tipos-ciiu-interface';
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
  selector: 'app-modal-search-tipos-ciiu',
  templateUrl: './modal-search-tipos-ciiu.components.html',
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
export class ModalSearchTiposCiiuComponents
{
  @Output() setDataFiltro = new EventEmitter<tiposCiiuFilter>();
  @Output() downloadRequested = new EventEmitter<void>();

  filterPagination: tiposCiiuFilter = {};

  myForm: FormGroup = this._formBuilder.group({
    division:      [null],
    grupo:         [null],
    clase:         [null],
    descripcion:   [null],
  });

  constructor(private _formBuilder: FormBuilder,
              private dialog: MatDialog) { }

  addTiposCiiu(): void {
    const dialogRef = this.dialog.open(ModalTiposCiiuComponents, {
      width: '70%',
      maxHeight: '80vh',
      disableClose: true,
      data: { modoEdicion: false }
    });

    dialogRef.afterClosed().subscribe(result => {});
  }

  advancedSearch(): void {
    this.filterPagination={
      division        : this.myForm.get('division')?.value || '',
      grupo           : this.myForm.get('grupo')?.value || '',
      clase           : this.myForm.get('clase')?.value || '',
      descripcion     : this.myForm.get('descripcion')?.value || '',
      pageNumber: 1,
      pageSize  : 5
    }
    this.setDataFiltro.emit(this.filterPagination);
  }

  clearSearch(): void {
    this.myForm.reset();
    this.filterPagination={
      division        : '',
      grupo           : '',
      clase           : '',
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
