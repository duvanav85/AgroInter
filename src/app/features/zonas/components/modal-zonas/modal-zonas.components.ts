import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormsModule, ReactiveFormsModule } from '@angular/forms';
//Services
import { zonasService } from '../../services/zonas-service';
//Interfaces
import { zonasInterface, zonasFilter } from '../../interface/zonas-interface';
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
  selector: 'app-modal-zonas.components',
  templateUrl: './modal-zonas.components.html',
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
export class ModalZonasComponents
{
  zonas       : zonasInterface = {};
  zonasFilter : zonasFilter={pageNumber:1,pageSize:5}
  editMode    : boolean;
  isModal     : boolean = true;
  myForm      : FormGroup;

  constructor(
    private zonasService                : zonasService,
    private formBuilder                 : FormBuilder,
    private dialogRef                   : MatDialogRef<ModalZonasComponents>,
    private alertService                : AlertService,
    @Inject(MAT_DIALOG_DATA) public data: { editMode: boolean, zonas: zonasInterface }
  ) {
    this.myForm = this.formBuilder.group({
      idzona        : ['', Validators.required],
      idbarrio      : ['', Validators.required],
      descripcion   : [''],
    });

    this.editMode = data.editMode;
  }

  ngOnInit(): void {
    if (this.editMode) {
      this.myForm.patchValue(this.data.zonas);
      this.myForm.get('idbarrio')?.setValidators([Validators.required])
      this.myForm.get('descipcion')?.setValidators([Validators.required])
    }
  }

  createUpdateZonas(): void {
    if (this.myForm.invalid) {
      return;
    }

    this.zonas = {
      idzona        : this.data.zonas?.idzona,
      idbarrio      : this.data.zonas?.idbarrio,
      descripcion   : cleanAndCapitalizeFirstLettersOpt(this.myForm.get('descripcion')?.value),
    };

    let operation = this.editMode ?
      this.zonasService.updateZona(this.zonas) :
      this.zonasService.createZonas(this.zonas);

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
        this.getAllZonas();

      },error:(err: any) => {
        this.dialogRef.close();
        this.clearForm();
        this.alertService.messageAlert({ message: "Por favor intente más tarde." });
      }
    });
  }

  getAllZonas():void{
    this.zonasService.getAllZonas(this.zonasFilter).subscribe({
      next:(response: any) => {
        this.zonasService.updateZonas(response)
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
    return this.editMode ? 'Editar Zonas' : 'Crear Zonas';
  }
}
