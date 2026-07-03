import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormsModule, ReactiveFormsModule } from '@angular/forms';
//Services
import { departamentosService } from '../../services/departamentos-service';
//Interfaces
import { departamentosInterface, departamentosFilter } from '../../interface/departamentos-interface';
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
import { threadId } from 'worker_threads';

@Component({
  selector: 'app-modal-departamentos',
  templateUrl: './modal-departamentos.components.html',
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
export class ModalDepartamentosComponents
{
  departamentos       : departamentosInterface = {};
  departamentosFilter : departamentosFilter={pageNumber:1,pageSize:5}
  editMode            : boolean;
  isModal             : boolean = true;
  myForm              : FormGroup;

  constructor(
    private departamentosService               : departamentosService,
    private formBuilder                 : FormBuilder,
    private dialogRef                   : MatDialogRef<ModalDepartamentosComponents>,
    private alertService                : AlertService,
    @Inject(MAT_DIALOG_DATA) public data: { editMode: boolean, departamentos: departamentosInterface }
  ) {
    this.myForm = this.formBuilder.group({
      departamentoid  : ['', Validators.required],
      codigo          : ['', Validators.required],
      departamento    : ['', Validators.required],
      idpais          : [''],
      Active          : [false],
    });

    this.editMode = data.editMode;
  }

  ngOnInit(): void {
    if (this.editMode) {
      this.myForm.patchValue(this.data.departamentos);
      this.myForm.get('departamentoid')?.setValidators([Validators.required])
      this.myForm.get('codigo')?.setValidators([Validators.required])
      this.myForm.get('departamento')?.setValidators([Validators.required])
      this.myForm.get('idpais')?.setValidators([Validators.required])
      this.myForm.get('activo')?.patchValue(this.data.departamentos.active ? "true" : "false");
      this.myForm.get('activo')?.setValidators([Validators.required])
    }
  }

  createUpdateCause(): void {
    if (this.myForm.invalid) {
      return;
    }

    this.departamentos = {
      departamentoid    : this.data.departamentos?.departamentoid,
      codigo            : this.data.departamentos?.codigo,
      departamento      : cleanAndCapitalizeFirstLettersOpt(this.myForm.get('descripcion')?.value),
      idpais            : this.data.departamentos?.idpais,
      active            : (!this.editMode) ? true : getStatusValue(this.myForm.get('active')?.value) ?? false,
    };

    let operation = this.editMode ?
      this.departamentosService.updateDepartamento(this.departamentos) :
      this.departamentosService.createDepartamentos(this.departamentos);

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
        this.getAlldepartamentos();

      },error:(err: any) => {
        this.dialogRef.close();
        this.clearForm();
        this.alertService.messageAlert({ message: "Por favor intente más tarde." });
      }
    });
  }

  getAlldepartamentos():void{
    this.departamentosService.getAllDepartamentos(this.departamentosFilter).subscribe({
      next:(response: any) => {
        this.departamentosService.updateDepartamentos(response)
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
    return this.editMode ? 'Editar Departamentos' : 'Crear Departamentos';
  }
}
