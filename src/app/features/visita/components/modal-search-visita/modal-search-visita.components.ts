import { Component, EventEmitter, Output } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
//Components
import { ModalVisitaComponents } from '../modal-visita/modal-visita.components';
//Interfaces
import { visitaFilter } from '../../interface/visita-interface';
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
  selector: 'app-modal-search-visita',
  templateUrl: './modal-search-visita.components.html',
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
export class ModalSearchVisitaComponents
{
  @Output() setDataFiltro = new EventEmitter<visitaFilter>();
  @Output() downloadRequested = new EventEmitter<void>();

  filterPagination: visitaFilter = {};

  myForm: FormGroup = this._formBuilder.group({
    edo_ticket          :[null],
    productorId         :[null],
    idPredio            :[null],
    idVereda            :[null],
    idDepartamento      :[null],
    idMunicipio         :[null],
    Direccion           :[null],
    idTipoCultivo       :[null],
  });

  constructor(private _formBuilder: FormBuilder,
              private dialog: MatDialog) { }

  addCause(): void {
    const dialogRef = this.dialog.open(ModalVisitaComponents, {
      width         : '70%',
      maxHeight     : '80vh',
      disableClose  : true,
      data          : { modoEdicion: false }
    });

    dialogRef.afterClosed().subscribe(result => {});
  }

  advancedSearch(): void {
    this.filterPagination={
      edo_ticket          : this.myForm.get('edo_ticket')?.value || '',
      productorId         : this.myForm.get('productorId')?.value || '',
      idPredio            : this.myForm.get('idPredio')?.value || '',
      idVereda            : this.myForm.get('idVereda')?.value || '',
      idDepartamento      : this.myForm.get('idDepartamento')?.value || '',
      idMunicipio         : this.myForm.get('idMunicipio')?.value || '',
      Direccion           : this.myForm.get('Direccion')?.value || '',
      idTipoCultivo       : this.myForm.get('idTipoCultivo')?.value || '',
      pageNumber: 1,
      pageSize  : 5
    }
    this.setDataFiltro.emit(this.filterPagination);
  }

  clearSearch(): void {
    this.myForm.reset();
    this.filterPagination={
      edo_ticket          : '',
      productorId         : 0,
      idPredio            : 0,
      idVereda            : 0,
      idDepartamento      : 0,
      idMunicipio         : 0,
      Direccion           : '',
      idTipoCultivo       : 0,
      pageNumber          : 1,
      pageSize            : 5
    }
    this.setDataFiltro.emit(this.filterPagination);
  }

  downloadData(): void {
    this.downloadRequested.emit();
  }
}
