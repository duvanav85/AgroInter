import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormsModule, ReactiveFormsModule } from '@angular/forms';
//Services
import { ciudadesService } from '../../services/ciudades-service';
//Interfaces
import { ciudadesInterface, ciudadesFilter } from '../../interfaces/ciudades-interface';
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

@Component({
  selector: 'app-modal-ciudades',
  templateUrl: './modal-ciudades.components.html',
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
export class ModalCiudadesComponents
{
  ciudades    : ciudadesInterface = {};
  causeFilter : ciudadesFilter={pageNumber:1,pageSize:5}
  editMode    : boolean;
  isModal     : boolean = true;
  myForm      : FormGroup;

  constructor(
    private ciudadesService             : ciudadesService,
    private formBuilder                 : FormBuilder,
    private dialogRef                   : MatDialogRef<ModalCiudadesComponents>,
    private alertService                : AlertService,
    @Inject(MAT_DIALOG_DATA) public data: { editMode: boolean, ciudades: ciudadesInterface }
  ) {
    this.myForm = this.formBuilder.group({
      idciudad        : ['', Validators.required],
      iddepartamento  : ['', Validators.required],
      descripcion     : [''],
    });

    this.editMode = data.editMode;
  }

  ngOnInit(): void {
    if (this.editMode) {
      this.myForm.patchValue(this.data.ciudades);
      this.myForm.get('idciudad')?.setValidators([Validators.required])
      this.myForm.get('iddepartamento')?.setValidators([Validators.required])
      this.myForm.get('descripcion')?.setValidators([Validators.required])
    }
  }

  createUpdateCiudad(): void {
    if (this.myForm.invalid) {
      return;
    }

    this.ciudades = {
      idciudad        : this.data.ciudades?.idciudad,
      iddepartamento  : this.data.ciudades?.iddepartamento,
      descripcion     : cleanAndCapitalizeFirstLettersOpt(this.myForm.get('descripcion')?.value),
    };

    let operation = this.editMode ?
      this.ciudadesService.updateCiudad(this.ciudades) :
      this.ciudadesService.createCiudades(this.ciudades);

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
    this.ciudadesService.getAllCiudades(this.causeFilter).subscribe({
      next:(response: any) => {
        this.ciudadesService.updateCiudades(response)
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
    return this.editMode ? 'Editar Ciudades' : 'Crear Ciudades';
  }
}
