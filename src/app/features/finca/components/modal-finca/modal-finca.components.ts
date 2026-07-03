import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormsModule, ReactiveFormsModule } from '@angular/forms';
//Services
import { fincaService } from '../../service/finca-service';
//Interfaces
import { fincaInterface, fincaFilter } from '../../interface/finca-interface';
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
  selector: 'app-modal-finca',
  templateUrl: './modal-finca.components.html',
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
export class ModalFincaComponents
{
  finca       : fincaInterface = {};
  causeFilter : fincaFilter={pageNumber:1,pageSize:5}
  editMode    : boolean;
  isModal     : boolean = true;
  myForm      : FormGroup;

  constructor(
    private fincaService             : fincaService,
    private formBuilder                 : FormBuilder,
    private dialogRef                   : MatDialogRef<ModalFincaComponents>,
    private alertService                : AlertService,
    @Inject(MAT_DIALOG_DATA) public data: { editMode: boolean, finca: fincaInterface }
  ) {
    this.myForm = this.formBuilder.group({
      identificacion        : ['', Validators.required],
      nombre_propietario    : ['', Validators.required],
      telefono              : ['', Validators.required],
      direccion             : ['', Validators.required],
      idMunicipio           : ['', Validators.required],
      vereda                : ['', Validators.required],
      area                  : [''],
      sistema_Productivo    : [''],
      variedad              : [''],
      desindad_Siembra      : [''],
      distribucion_planta   : [''],
      nro_Arboles           : [''],
      registro_ICA          : [''],
      gobal_Gap             : [''],
      rainforest            : [''],
      certificadoXX         : [''],
      certificadoYY         : [''],
    });

    this.editMode = data.editMode;
  }

  ngOnInit(): void {
    if (this.editMode) {
      this.myForm.patchValue(this.data.finca);
      this.myForm.get('identificacion')?.setValidators([Validators.required])
      this.myForm.get('nombre_propietario')?.setValidators([Validators.required])
      this.myForm.get('telefono')?.setValidators([Validators.required])
      this.myForm.get('direccion')?.setValidators([Validators.required])
      this.myForm.get('idMunicipio')?.setValidators([Validators.required])
      this.myForm.get('vereda')?.setValidators([Validators.required])
    }
  }

  createUpdateCause(): void {
    if (this.myForm.invalid) {
      return;
    }

    this.finca = {
      identificacion      : this.data.finca?.identificacion,
      nombre_propietario  : cleanAndCapitalizeFirstLettersOpt(this.myForm.get('nombre_propietario')?.value),
      telefono            : this.data.finca?.telefono,
      direccion           : this.data.finca?.direccion,
      idMunicipio         : this.data.finca?.idMunicipio,
      vereda              : this.data.finca?.vereda,
      area                : this.data.finca?.area,
      sistema_Productivo  : this.data.finca?.sistema_Productivo,
      variedad            : this.data.finca?.variedad,
      desindad_Siembra    : this.data.finca?.desindad_Siembra,
      distribucion_planta : this.data.finca?.distribucion_planta,
      nro_Arboles         : this.data.finca?.nro_Arboles,
      registro_ICA        : this.data.finca?.registro_ICA,
      gobal_Gap           : this.data.finca?.gobal_Gap,
      rainforest          : this.data.finca?.rainforest,
      certificadoXX       : this.data.finca?.certificadoXX,
      certificadoYY       : this.data.finca?.certificadoYY,
    };

    let operation = this.editMode ?
      this.fincaService.updateFincas(this.finca) :
      this.fincaService.createFinca(this.finca);

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
        this.getAllFinca();

      },error:(err: any) => {
        this.dialogRef.close();
        this.clearForm();
        this.alertService.messageAlert({ message: "Por favor intente más tarde." });
      }
    });
  }

  getAllFinca():void{
    this.fincaService.getAllFinca(this.causeFilter).subscribe({
      next:(response: any) => {
        this.fincaService.updateFinca(response)
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
    return this.editMode ? 'Editar Fincas' : 'Crear Fincas';
  }
}
