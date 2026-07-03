import { Component, EventEmitter, Output } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
//Components
import { ModalAsgVisitasComponents } from '../modal-asg-visitas/modal-asg-visitas.components';
//Interfaces
import { asgvisitaFilter } from '../../interface/asg-visitas-interface';
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
  selector: 'app-modal-search-asg-visitas',
  templateUrl: './modal-search-asg-visitas.components.html',
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
export class ModalSearchAsgVisitasComponents
{
  @Output() setDataFiltro = new EventEmitter<asgvisitaFilter>();
  @Output() downloadRequested = new EventEmitter<void>();

  filterPagination: asgvisitaFilter = {};

  myForm: FormGroup = this._formBuilder.group({
    visitaid          :[null],
    idTicket          :[null],
    fecha_visita      :[null],
    idTecnico         :[null],
    nro_convenio      :[null],
    fecha_agenda      :[null],
  });

  constructor(private _formBuilder: FormBuilder,
              private dialog: MatDialog) { }

  addCause(): void {
    const dialogRef = this.dialog.open(ModalAsgVisitasComponents, {
      width         : '70%',
      maxHeight     : '80vh',
      disableClose  : true,
      data          : { modoEdicion: false }
    });

    dialogRef.afterClosed().subscribe(result => {});
  }

  advancedSearch(): void {
    this.filterPagination={
      visitaid          : this.myForm.get('visitaid')?.value || '',
      idTicket          : this.myForm.get('idTicket')?.value || '',
      fecha_visita      : this.myForm.get('fecha_visita')?.value || '',
      idTecnico         : this.myForm.get('idTecnico')?.value || '',
      nro_convenio      : this.myForm.get('nro_convenio')?.value || '',
      fecha_agenda      : this.myForm.get('fecha_agenda')?.value || '',
      pageNumber: 1,
      pageSize  : 5
    }
    this.setDataFiltro.emit(this.filterPagination);
  }

  clearSearch(): void {
    this.myForm.reset();
    this.filterPagination={
      visitaid          : '',
      idTicket          : 0,
      fecha_visita      : '',
      idTecnico         : 0,
      nro_convenio      : 0,
      fecha_agenda      : '',
      pageNumber: 1,
      pageSize  : 5
    }
    this.setDataFiltro.emit(this.filterPagination);
  }

  downloadData(): void {
    this.downloadRequested.emit();
  }
}
