import { Component, EventEmitter, Output } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
//Components
import { ModalReporteAgendamientosComponents } from '../modal-reporte-agendamientos/modal-reporte-agendamientos.components';
//Interfaces
import { reporteAgendamientoFilter } from '../../interface/reporte-agendamientos-interface';
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
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MAT_DATE_LOCALE, provideNativeDateAdapter } from '@angular/material/core';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-modal-search-reporte-agendamientos',
  templateUrl: './modal-search-reporte-agendamientos.components.html',
  styles: ``,
  providers: [provideNativeDateAdapter(),
    { provide: MAT_DATE_LOCALE, useValue: 'es-ES' } // 'es-ES' fuerza el formato DD/MM/YYYY
  ],
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
    MatDatepickerModule,
    MatFormFieldModule,
  ],
})
export class ModalSearchReporteAgendamientosComponents
{
  @Output() setDataFiltro = new EventEmitter<reporteAgendamientoFilter>();
  @Output() downloadRequested = new EventEmitter<void>();

  filterPagination: reporteAgendamientoFilter = {};

  myForm: FormGroup = this._formBuilder.group({
    idPropietario     :[null],
    idCultivo         :[null],
    idTicket          :[null],
    fecha_visita      :[null],
    idEstadoTicket    :[null],
    idTecnico         :[null],
    idMunicipio       :[null],
    idVereda          :[null],
  });

  constructor(private _formBuilder: FormBuilder,
              private dialog: MatDialog) { }

  addReporteAgendamiento(): void {
    const dialogRef = this.dialog.open(ModalReporteAgendamientosComponents, {
      width         : '70%',
      maxHeight     : '80vh',
      disableClose  : true,
      data          : { modoEdicion: false }
    });

    dialogRef.afterClosed().subscribe(result => {});
  }

  advancedSearch(): void {
    this.filterPagination={
      idpropietario     : this.myForm.get('idPropietario')?.value || '',
      idtipo_cultivo    : this.myForm.get('idCultivo')?.value || '',
      idTicket          : this.myForm.get('idTicket')?.value || '',
      fecha_visita      : this.myForm.get('fecha_visita')?.value || '',
      estado_ticket     : this.myForm.get('idEstadoTicket')?.value || '',
      idTecnico         : this.myForm.get('idTecnico')?.value || '',
      municipio         : this.myForm.get('idMunicipio')?.value || '',
      vereda            : this.myForm.get('idVereda')?.value || '',
      pageNumber        : 1,
      pageSize          : 5
    }
    this.setDataFiltro.emit(this.filterPagination);
  }

  clearSearch(): void {
    this.myForm.reset();
    this.filterPagination={
      idpropietario     : 0,
      idtipo_cultivo    : 0,
      idTicket          : 0,
      fecha_visita      : '',
      idTecnico         : 0,
      estado_ticket     : '',
      municipio         : 0,
      vereda            : 0,
      pageNumber        : 1,
      pageSize          : 5
    }
    this.setDataFiltro.emit(this.filterPagination);
  }

  downloadData(): void {
    this.downloadRequested.emit();
  }
}
