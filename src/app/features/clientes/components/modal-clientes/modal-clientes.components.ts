import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormsModule, ReactiveFormsModule } from '@angular/forms';
//Services
import { clientesService } from '../../services/clientes-services';
//Interfaces
import { clientesInterface, clientesFilter } from '../../interface/clientes-interface';
import { ApiResponse } from '../../../../core/models/dto/apiresponse.interface';
import { AlertService } from '../../../../shared/services/Alert/alert.service';

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
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { cleanAndCapitalizeFirstLettersOpt } from 'src/app/shared/helpers/textProcessingUtils';
import { getStatusValue } from 'src/app/shared/helpers/getStatusValue';


@Component({
  selector: 'app-modal-clientes',
  templateUrl: './modal-clientes.components.html',
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
export class ModalClientesComponents
{
  clientes        : clientesInterface = {};
  clientesFilter  : clientesFilter={pageNumber:1,pageSize:5}
  editMode        : boolean;
  isModal         : boolean = true;
  myForm          : FormGroup;

  constructor(
    private clientesService               : clientesService,
    private formBuilder                   : FormBuilder,
    private dialogRef                     : MatDialogRef<ModalClientesComponents>,
    private alertService                  : AlertService,
    @Inject(MAT_DIALOG_DATA) public data: { editMode: boolean, clientes: clientesInterface }
  ) {
    this.myForm = this.formBuilder.group({
      clienteId           : ['', Validators.required],
      cedula              : ['', Validators.required],
      digito              : ['', Validators.required],
      nombre              : [''],
      apellidos           : [''],
      idtipo_iden         : [''],
      idtipo_contacto     : [''],
      idtipo_ciiu         : [''],
      idagencia           : [''],
      idejec_cuenta       : [''],
      idzona              : [''],
      idtipo_tercero      : [''],
      gran_contribuyente  : [false],
      autoretenedor       : [false],
      email               : ['', Validators.required],
      email1              : [''],
      email2              : [''],
      foto                : [''],
    });

    this.editMode = data.editMode;
  }

  ngOnInit(): void {
    if (this.editMode) {
      this.myForm.patchValue(this.data.clientes);
      this.myForm.get('clienteId')?.setValidators([Validators.required])
      this.myForm.get('cedula')?.setValidators([Validators.required])
      this.myForm.get('digito')?.setValidators([Validators.required])
      this.myForm.get('nombre')?.setValidators([Validators.required])
      // this.myForm.get('apellidos')?.setValidators([Validators.required])
      // this.myForm.get('idtipo_iden')?.setValidators([Validators.required])
      // this.myForm.get('idtipo_contacto')?.setValidators([Validators.required])
      // this.myForm.get('idtipo_ciiu')?.setValidators([Validators.required])
      // this.myForm.get('idagencia')?.setValidators([Validators.required])
      // this.myForm.get('idejec_cuenta')?.setValidators([Validators.required])
      // this.myForm.get('idzona')?.setValidators([Validators.required])
      // this.myForm.get('idtipo_tercero')?.setValidators([Validators.required])
      // this.myForm.get('gran_contribuyente')?.patchValue(this.data.clientes.gran_contribuyente ? "true" : "false");
      // this.myForm.get('autoretenedor')?.patchValue(this.data.clientes.autoretenedor ? "true" : "false");
      this.myForm.get('correo')?.setValidators([Validators.required])
    }
  }

  createUpdateCiudades(): void {
    if (this.myForm.invalid) {
      return;
    }

    this.clientes = {
      clienteId           : this.data.clientes?.clienteId,
      cedula              : this.data.clientes?.cedula,
      digito              : this.data.clientes?.digito,
      nombre              : cleanAndCapitalizeFirstLettersOpt(this.myForm.get('nombre')?.value),
      apellidos           : cleanAndCapitalizeFirstLettersOpt(this.myForm.get('apellidos')?.value),
      idtipo_iden         : this.data.clientes?.idtipo_iden,
      idtipo_contacto     : this.data.clientes?.cedula,
      idtipo_ciiu         : this.data.clientes?.idtipo_iden,
      idagencia           : this.data.clientes?.cedula,
      idejec_cuenta       : this.data.clientes?.idtipo_iden,
      idzona              : this.data.clientes?.cedula,
      idtipo_tercero      : this.data.clientes?.idtipo_iden,
      gran_contribuyente  : (!this.editMode) ? true : getStatusValue(this.myForm.get('gran_contribuyente')?.value) ?? false,
      autoretenedor       : (!this.editMode) ? true : getStatusValue(this.myForm.get('autoretenedor')?.value) ?? false,
      email               : this.data.clientes?.email,
      email1              : this.data.clientes?.email1,
      email2              : this.data.clientes?.email2,
      foto                : this.data.clientes?.foto,
    };

    let operation = this.editMode ?
      this.clientesService.updateClientes(this.clientes) :
      this.clientesService.createClientes(this.clientes);

    operation.subscribe({
      next:(res: ApiResponse<boolean>) => {
        if (!res.succeeded) {
          const errors = res.errors ?? [];
          if (errors[0].includes("already exist")) {
            this.alertService.messageWarn({ message: "Ya existe otra causa con estos datos" });
            return;
          }
          this.alertService.messageAlert({ message: "Por favor intente más tarde." });
          return;
        }
        this.dialogRef.close();
        this.clearForm();
        this.getAllCiudades();

      },error:(err: any) => {
        this.dialogRef.close();
        this.clearForm();
        this.alertService.messageAlert({ message: "Por favor intente más tarde." });
      }
    });
  }

  getAllCiudades():void{
    this.clientesService.getAllClientes(this.clientesFilter).subscribe({
      next:(response: any) => {
        this.clientesService.updateCliente(response)
        if (!response.succeeded) {
          this.alertService.messageAlert({ message: "Por favor intente más tarde." });
        } else {
          this.dialogRef.close();
          this.clearForm();
          this.alertService.messageSuccess({});
        }
      },error:(err: any) => {
        this.alertService.messageAlert({ message: "Por favor intente más tarde." });
      }
  });
  }


  private clearForm(): void {
    this.myForm.reset();
  }

  close(): void {
    this.dialogRef.close();
  }

  getTitle(): string {
    return this.editMode ? 'Editar Clientes' : 'Crear Clientes';
  }
}
