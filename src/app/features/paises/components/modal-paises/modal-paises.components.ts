import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormsModule, ReactiveFormsModule } from '@angular/forms';
//Services
import { paisesService } from '../../services/paises-service';
//Interfaces
import { paisesInterface, paisesFilter } from '../../interface/paises-interface';
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
  selector: 'app-modal-paises',
  templateUrl: './modal-paises.components.html',
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
export class ModalPaisesComponents
{
  paises      : paisesInterface = {};
  causeFilter : paisesFilter={pageNumber:1,pageSize:5}
  editMode    : boolean;
  isModal     : boolean = true;
  myForm      : FormGroup;

  constructor(
    private paisesService               : paisesService,
    private formBuilder                 : FormBuilder,
    private dialogRef                   : MatDialogRef<ModalPaisesComponents>,
    private alertService                : AlertService,
    @Inject(MAT_DIALOG_DATA) public data: { editMode: boolean, paises: paisesInterface }
  ) {
    this.myForm = this.formBuilder.group({
      paisid        : ['', Validators.required],
      codigo        : ['', Validators.required],
      id_DIAN       : ['', Validators.required],
      descripcion   : [''],
      Active        : [false],
    });

    this.editMode = data.editMode;
  }

  ngOnInit(): void {
    if (this.editMode) {
      this.myForm.patchValue(this.data.paises);
      this.myForm.get('paisid')?.setValidators([Validators.required])
      this.myForm.get('registroid')?.setValidators([Validators.required])
      this.myForm.get('codigo')?.setValidators([Validators.required])
      this.myForm.get('id_DIAN')?.setValidators([Validators.required])
      this.myForm.get('activo')?.patchValue(this.data.paises.Active ? "true" : "false");
      this.myForm.get('activo')?.setValidators([Validators.required])
    }
  }

  createUpdateCause(): void {
    if (this.myForm.invalid) {
      return;
    }

    this.paises = {
      paisid      : this.data.paises?.paisid,
      codigo      : this.data.paises?.codigo,
      descripcion : cleanAndCapitalizeFirstLettersOpt(this.myForm.get('descripcion')?.value),
      Active      : (!this.editMode) ? true : getStatusValue(this.myForm.get('active')?.value) ?? false,
    };

    let operation = this.editMode ?
      this.paisesService.updatePaise(this.paises) :
      this.paisesService.createPaises(this.paises);

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
        this.getAllpaises();

      },error:(err: any) => {
        this.dialogRef.close();
        this.clearForm();
        this.alertService.messageAlert({ message: "Por favor intente más tarde." });
      }
    });
  }

  getAllpaises():void{
    this.paisesService.getAllPaises(this.causeFilter).subscribe({
      next:(response: any) => {
        this.paisesService.updatePaise(response)
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
    return this.editMode ? 'Editar Paises' : 'Crear Paises';
  }
}
