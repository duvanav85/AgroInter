import { Component, EventEmitter, Output } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
//Components
import { ModalDetellesParametrosComponents } from '../modal-detalles-parametros/modal-detelles-parametros.components';
//Interfaces
import { DetalleParametrosInterface, DetalleParametrosFilter } from './../../interface/detalle-parametros-interface';
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
  selector: 'app-modal-search-detalles-parametros',
  templateUrl: './modal-search-detalles-parametros.components.html',
  styleUrl: './modal-search-detalles-parametros.components.scss',
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
export class ModalSearchDetallesParametrosComponents
{
  @Output() setDataFiltro = new EventEmitter<DetalleParametrosFilter>();
  @Output() downloadRequested = new EventEmitter<void>();

  filterPagination: DetalleParametrosFilter = {};

  myForm: FormGroup = this._formBuilder.group({
    idparametro: [null],
    idregistro: [null],
    descripcion: [null],
    activo: [null]
  });

  constructor(private _formBuilder: FormBuilder,
              private dialog: MatDialog) { }

  addAirport(): void {
    const dialogRef = this.dialog.open(ModalDetellesParametrosComponents, {
      width: '70%',
      maxHeight: '80vh',
      disableClose: true,
      data: { modoEdicion: false }
    });

    dialogRef.afterClosed().subscribe(result => {});
  }

  advancedSearch(): void {
    this.filterPagination={
      idparametro:this.myForm.get('idparametro')?.value || '',
      idregistro:this.myForm.get('idregistro')?.value || '',
      descripcion:this.myForm.get('descripcion')?.value || '',
      activo:this.myForm.get('activo')?.value || '',
      pageNumber: 1,
      pageSize: 5
    }
    this.setDataFiltro.emit(this.filterPagination);
  }

  clearSearch(): void {
    this.myForm.reset();
    this.filterPagination={
      idparametro:0,
      idregistro:0,
      descripcion:'',
      activo:false,
      pageNumber: 1,
      pageSize: 5
    }
    this.setDataFiltro.emit(this.filterPagination);
  }

  downloadData(): void {
    this.downloadRequested.emit();
  }
}
