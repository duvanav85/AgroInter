import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Observable } from 'rxjs';
//Material
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSelectModule } from '@angular/material/select';
import { MatTableModule } from '@angular/material/table';
import { MatTooltipModule } from '@angular/material/tooltip';
//Services
import { AlertService } from 'src/app/shared/services/Alert/alert.service';
import { ParametrosServices } from '../../services/parametros-services';
import { ExportService } from '../../../../shared/helpers/export.service';
//Interfaces
import { ParametrosInterface, parametrosFilter } from '../../Interface/parametros-interface';
import { CustomPagedResponse } from 'src/app/core/models/dto/apiresponse.interface';


@Component({
  selector: 'app-modal-parametros',
  templateUrl: './modal-parametros-components.html',
  styleUrl: './modal-parametros-components.scss',
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
export class ModalParametrosComponents
{
  parametros            : ParametrosInterface = {};
  parametrosFilter      : parametrosFilter = { pageNumber: 1, pageSize: 5 }
  editMode              : boolean;
  isModal               : boolean = true;
  myForm                : FormGroup;

  constructor(
      private ParametrosServices: ParametrosServices,
      private formBuilder:        FormBuilder,
      private dialogRef:          MatDialogRef<ModalParametrosComponents>,
      private alertService:       AlertService,
      @Inject(MAT_DIALOG_DATA) public data: { editMode: boolean, parametros: ParametrosInterface }
    )
  {
      this.myForm = this.formBuilder.group({
      parametro:       ['', Validators.required],
      nombreParametro: ['', Validators.required],
    });
    this.editMode = data.editMode;
    this.parametros = data.parametros;
  }

  ngOnInit(): void {
    if (this.editMode) {
      this.myForm.patchValue(this.data.parametros);
      this.myForm.get('parametro')?.patchValue(this.data.parametros.parametro);
      this.myForm.get('nombreParametro')?.patchValue(this.data.parametros.nombreParametro?.toUpperCase());
    }
  }

  createUpdateParametro(): void {
    if (this.myForm.invalid) {
      return;
    }

    this.parametros = {
      parametro: this.data.parametros?.parametro,
      nombreParametro: this.myForm.get('nombreParametro')?.value.toUpperCase(),
    };

    let operation = this.editMode ?
      this.ParametrosServices.updateParametro(this.parametros) :
      this.ParametrosServices.createParametro(this.parametros);

    operation.subscribe({
      next:(res) => {
        if (!res.succeeded) {
          if (res.errors) {
            this.alertService.messageWarn({ message: "Ya hay un parametro registrado con estos datos." });
            return;
          }
          this.alertService.messageAlert({ message: "Por favor intente más tarde." });
          return;
        }
        this.dialogRef.close();
        this.clearForm();
        this.getAllParametros()

      },error:(err: any) => {
        this.dialogRef.close();
        this.clearForm();
        this.alertService.messageAlert({ message: "Por favor intente más tarde." });
      }
    });
  }

  getAllParametros():void{
    this.ParametrosServices.getAllParametros(this.parametrosFilter).subscribe({
      next:(response: any) => {
        this.ParametrosServices.updateParametros(response)
        if (!response.succeeded) {
          this.alertService.messageAlert({ message: "Por favor intente más tarde." });
        } else {
          this.dialogRef.close();
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
    return this.editMode ? 'Editar Parametros' : 'Crear Parametros';
  }

}
