import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormsModule, ReactiveFormsModule } from '@angular/forms';
//Services
import { barriosService } from '../../services/barrios-service';
//Interfaces
import { barriosInterfaces, barriosFilter } from '../../interfaces/barrios-interface';
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
  selector: 'app-modal-barrios',
  templateUrl: './modal-barrios.components.html',
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
export class ModalBarriosComponents
{
  barrios     : barriosInterfaces = {};
  causeFilter : barriosFilter={pageNumber:1,pageSize:5}
  editMode    : boolean;
  isModal     : boolean = true;
  myForm      : FormGroup;

  constructor(
    private barriosService              : barriosService,
    private formBuilder                 : FormBuilder,
    private dialogRef                   : MatDialogRef<ModalBarriosComponents>,
    private alertService                : AlertService,
    @Inject(MAT_DIALOG_DATA) public data: { editMode: boolean, barrios: barriosInterfaces }
  ) {
    this.myForm = this.formBuilder.group({
      idbarrio      : ['', Validators.required],
      idciudad      : ['', Validators.required],
      descripcion   : [''],
    });

    this.editMode = data.editMode;
  }

  ngOnInit(): void {
    if (this.editMode) {
      this.myForm.patchValue(this.data.barrios);
      this.myForm.get('idbarrio')?.setValidators([Validators.required])
      this.myForm.get('idciudad')?.setValidators([Validators.required])
    }
  }

  createUpdateBarrios(): void {
    if (this.myForm.invalid) {
      return;
    }

    this.barrios = {
      idbarrio      : this.data.barrios?.idbarrio,
      idciudad      : this.data.barrios?.idciudad,
      descripcion   : cleanAndCapitalizeFirstLettersOpt(this.myForm.get('descripcion')?.value),
    };

    let operation = this.editMode ?
      this.barriosService.updateBarrio(this.barrios) :
      this.barriosService.createBarrios(this.barrios);

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
        this.getAllBarrios();

      },error:(err: any) => {
        this.dialogRef.close();
        this.clearForm();
        this.alertService.messageAlert({ message: "Por favor intente más tarde." });
      }
    });
  }

  getAllBarrios():void{
    this.barriosService.getAllBarrios(this.causeFilter).subscribe({
      next:(response: any) => {
        this.barriosService.updateBarrios(response)
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
    return this.editMode ? 'Editar Barrios' : 'Crear Barrios';
  }
}
