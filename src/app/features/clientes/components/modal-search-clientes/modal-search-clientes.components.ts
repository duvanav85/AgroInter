import { Component, EventEmitter, Output } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
//Components
import { ModalClientesComponents } from '../modal-clientes/modal-clientes.components';
//Interfaces
import { clientesFilter } from '../../interface/clientes-interface';
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
  selector: 'app-modal-search-clientes',
  templateUrl: './modal-search-clientes.components.html',
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
export class ModalSearchClientesComponents
{
  @Output() setDataFiltro = new EventEmitter<clientesFilter>();
  @Output() downloadRequested = new EventEmitter<void>();

  filterPagination: clientesFilter = {};

  myForm: FormGroup = this._formBuilder.group({
    cedula              :[null],
    nombre              :[null],
    apellidos           :[null],
    idtipo_iden         :[null],
    idtipo_contacto     :[null],
    idtipo_ciiu         :[null],
    idagencia           :[null],
    idejec_cuenta       :[null],
    idzona              :[null],
    idtipo_tercero      :[null],
    gran_contribuyente  :[null],
    autoretenedor       :[null],
  });

  constructor(private _formBuilder: FormBuilder,
              private dialog: MatDialog) { }

  addClientes(): void {
    const dialogRef = this.dialog.open(ModalClientesComponents, {
      width         : '70%',
      maxHeight     : '80vh',
      disableClose  : true,
      data          : { modoEdicion: false }
    });

    dialogRef.afterClosed().subscribe(result => {});
  }

  advancedSearch(): void {
    this.filterPagination={
      cedula              : this.myForm.get('cedula')?.value || '',
      nombre              : this.myForm.get('nombre')?.value || '',
      apellidos           : this.myForm.get('apellidos')?.value || '',
      idtipo_iden         : this.myForm.get('idtipo_iden')?.value || '',
      idtipo_contacto     : this.myForm.get('idtipo_contacto')?.value || '',
      idtipo_ciiu         : this.myForm.get('idtipo_ciiu')?.value || '',
      idagencia           : this.myForm.get('idagencia')?.value || '',
      idejec_cuenta       : this.myForm.get('idejec_cuenta')?.value || '',
      idzona              : this.myForm.get('idzona')?.value || '',
      idtipo_tercero      : this.myForm.get('idtipo_tercero')?.value || '',
      gran_contribuyente  : this.myForm.get('gran_contribuyente')?.value || '',
      autoretenedor       : this.myForm.get('autoretenedor')?.value || '',
      pageNumber: 1,
      pageSize  : 5
    }
    this.setDataFiltro.emit(this.filterPagination);
  }

  clearSearch(): void {
    this.myForm.reset();
    this.filterPagination={
      cedula              :0,
      nombre              :'',
      apellidos           :'',
      idtipo_iden         :0,
      idtipo_contacto     :0,
      idtipo_ciiu         :0,
      idagencia           :0,
      idejec_cuenta       :0,
      idzona              :0,
      idtipo_tercero      :0,
      gran_contribuyente  :false,
      autoretenedor       :false,
      pageNumber          : 1,
      pageSize            : 5
    }
    this.setDataFiltro.emit(this.filterPagination);
  }

  downloadData(): void {
    this.downloadRequested.emit();
  }
}
