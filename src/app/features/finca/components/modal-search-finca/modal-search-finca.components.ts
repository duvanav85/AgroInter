import { Component, EventEmitter, Output } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
//Components
import { ModalFincaComponents } from '../modal-finca/modal-finca.components';
//Interfaces
import { fincaFilter } from '../../interface/finca-interface';
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
  selector: 'app-modal-search-finca',
  templateUrl: './modal-search-finca.components.html',
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
export class ModalSearchFincaComponents
{
  @Output() setDataFiltro = new EventEmitter<fincaFilter>();
  @Output() downloadRequested = new EventEmitter<void>();

  filterPagination: fincaFilter = {};

  myForm: FormGroup = this._formBuilder.group({
    identificacion:     [null],
    nombre_propietario: [null],
    idMunicipio:        [null],
    vereda:             [null],
    area:               [null],
    nro_Arboles:        [null],
    registro_ICA:       [null],
    gobal_Gap:          [null],
    rainforest:         [null],
    certificadoXX:      [null],
    certificadoYY:      [null],
  });

  constructor(private _formBuilder: FormBuilder,
              private dialog: MatDialog) { }

  addCause(): void {
    const dialogRef = this.dialog.open(ModalFincaComponents, {
      width: '70%',
      maxHeight: '80vh',
      disableClose: true,
      data: { modoEdicion: false }
    });

    dialogRef.afterClosed().subscribe(result => {});
  }

  advancedSearch(): void {
    this.filterPagination={
      identificacion:         this.myForm.get('identificacion')?.value || '',
      nombre_propietario:     this.myForm.get('nombre_propietario')?.value || '',
      idMunicipio:            this.myForm.get('idMunicipio')?.value || '',
      vereda:                 this.myForm.get('vereda')?.value || '',
      area:                   this.myForm.get('area')?.value || '',
      nro_Arboles:            this.myForm.get('nro_Arboles')?.value || '',
      registro_ICA:           this.myForm.get('registro_ICA')?.value || '',
      gobal_Gap:              this.myForm.get('gobal_Gap')?.value || '',
      rainforest:             this.myForm.get('rainforest')?.value || '',
      certificadoXX:          this.myForm.get('certificadoXX')?.value || '',
      certificadoYY:          this.myForm.get('certificadoYY')?.value || '',
      pageNumber: 1,
      pageSize  : 5
    }
    this.setDataFiltro.emit(this.filterPagination);
  }

  clearSearch(): void {
    this.myForm.reset();
    this.filterPagination={
      identificacion:       0,
      nombre_propietario:   '',
      idMunicipio:          0,
      vereda:               0,
      area:                 0,
      nro_Arboles:          0,
      registro_ICA:         0,
      gobal_Gap:            0,
      rainforest:           0,
      certificadoXX:        0,
      certificadoYY:        0,
    }
    this.setDataFiltro.emit(this.filterPagination);
  }

  downloadData(): void {
    this.downloadRequested.emit();
  }
}
