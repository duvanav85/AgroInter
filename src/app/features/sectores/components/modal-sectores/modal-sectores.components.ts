import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormsModule, ReactiveFormsModule } from '@angular/forms';
//Services
import { sectoresService } from '../../services/sectores-services';
//Interfaces
import { sectoresInterface, sectoresFilter } from '../../interface/sectores-interface';
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
  selector: 'app-modal-sectores.components',
  templateUrl: './modal-sectores.components.html',
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
export class ModalSectoresComponents
{
  sectores            : sectoresInterface = {};
  sectoresFilter      : sectoresFilter={pageNumber:1,pageSize:5}
  editMode            : boolean;
  isModal             : boolean = true;
  myForm              : FormGroup;

  constructor(
    private sectoresService             : sectoresService,
    private formBuilder                 : FormBuilder,
    private dialogRef                   : MatDialogRef<ModalSectoresComponents>,
    private alertService                : AlertService,
    @Inject(MAT_DIALOG_DATA) public data: { editMode: boolean, sectores: sectoresInterface }
  ) {
    this.myForm = this.formBuilder.group({
      nombre              : ['', Validators.required],
      descripcion         : ['', Validators.required],
      codsector           : ['', Validators.required],
      activo              : [false],
    });

    this.editMode = data.editMode;
  }

  ngOnInit(): void {
    if (this.editMode) {
      this.myForm.patchValue(this.data.sectores);
      this.myForm.get('nombre')?.setValidators([Validators.required])
      this.myForm.get('descripcion')?.setValidators([Validators.required])
      this.myForm.get('codsector')?.setValidators([Validators.required])
      this.myForm.get('activo')?.patchValue(this.data.sectores.activo ? "true" : "false");
      this.myForm.get('activo')?.setValidators([Validators.required])
    }
  }

  createUpdateSectores(): void {
    if (this.myForm.invalid) {
      return;
    }

    this.sectores = {
      nombre          : this.data.sectores?.nombre,
      descripcion     : this.data.sectores?.descripcion,
      codsector       : this.data.sectores?.codsector,
      activo          : (!this.editMode) ? true : getStatusValue(this.myForm.get('activo')?.value) ?? false,
    };

    let operation = this.editMode ?
      this.sectoresService.updateSectores(this.sectores) :
      this.sectoresService.createSectores(this.sectores);

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
        this.getAllSectores();

      },error:(err: any) => {
        this.dialogRef.close();
        this.clearForm();
        this.alertService.messageAlert({ message: "Por favor intente más tarde." });
      }
    });
  }

  getAllSectores():void{
    this.sectoresService.getAllSectores(this.sectoresFilter).subscribe({
      next:(response: any) => {
        this.sectoresService.updateSectores(response)
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
    return this.editMode ? 'Editar Sectores' : 'Crear Sectores';
  }
}
