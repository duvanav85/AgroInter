import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormsModule, ReactiveFormsModule } from '@angular/forms';
//Services
import { veredasService } from '../../service/veredas-service';
//Interfaces
import { veredasFilter, veredasInterface } from '../../interface/veredas-interface';
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
  selector: 'app-modal-veredas',
  templateUrl: './modal-veredas.components.html',
  styles: ``,
  imports: [FormsModule,
    MatButtonModule,
    MatCardModule,
    MatExpansionModule,
    MatIconModule,
    MatInputModule,
    MatPaginatorModule,
    MatSelectModule,
    MatTableModule,
    MatTooltipModule,
    ReactiveFormsModule,],
})
export class ModalVeredasComponents
{
  veredas       : veredasInterface = {};
  veredasFilter : veredasFilter={pageNumber:1,pageSize:5}
  editMode      : boolean;
  isModal       : boolean = true;
  myForm        : FormGroup;

  constructor(
    private veredasService              : veredasService,
    private formBuilder                 : FormBuilder,
    private dialogRef                   : MatDialogRef<ModalVeredasComponents>,
    private alertService                : AlertService,
    @Inject(MAT_DIALOG_DATA) public data: { editMode: boolean, veredas: veredasInterface }
  ) {
    this.myForm = this.formBuilder.group({
      nombre_vereda   : ['', Validators.required],
      idciudad        : ['', Validators.required],
      iddepartamento  : ['', Validators.required],
      area            : [''],
      poblacion       : [''],
    });

    this.editMode = data.editMode;
  }

  ngOnInit(): void {
    if (this.editMode) {
      this.myForm.patchValue(this.data.veredas);
      this.myForm.get('idciudad')?.setValidators([Validators.required])
      this.myForm.get('iddepartamento')?.setValidators([Validators.required])
      this.myForm.get('nombre_vereda')?.setValidators([Validators.required])
    }
  }

  createUpdateCause(): void {
    if (this.myForm.invalid) {
      return;
    }

    this.veredas = {
      idciudad        : this.data.veredas?.idciudad,
      iddepartamento  : this.data.veredas?.iddepartamento,
      nombre_vereda   : cleanAndCapitalizeFirstLettersOpt(this.myForm.get('nombre_vereda')?.value),
      area_ha         : this.myForm.get('area')?.value,
      poblacion       : this.myForm.get('poblacion')?.value,
    };

    let operation = this.editMode ?
      this.veredasService.updateVereda(this.veredas) :
      this.veredasService.createVeredas(this.veredas);

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
        this.getAllVeredas();

      },error:(err: any) => {
        this.dialogRef.close();
        this.clearForm();
        this.alertService.messageAlert({ message: "Por favor intente más tarde." });
      }
    });
  }

  getAllVeredas():void{
    this.veredasService.getAllVeredas(this.veredasFilter).subscribe({
      next:(response: any) => {
        this.veredasService.updateVeredas(response)
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
    return this.editMode ? 'Editar Veredas' : 'Crear Veredas';
  }
}
