import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormsModule, ReactiveFormsModule } from '@angular/forms';
//Services
import { tecnicoService } from '../../service/tecnico-service';
//Interfaces
import { tecnicoInterface, tecnicoFilter } from '../../interface/tecnico-interface';
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
  selector: 'app-modal-tecnico.components',
  templateUrl: './modal-tecnico.components.html',
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
export class ModalTecnicoComponents
{
  tecnico     : tecnicoInterface = {};
  tecnicoFilter : tecnicoFilter={pageNumber:1,pageSize:5}
  editMode    : boolean;
  isModal     : boolean = true;
  myForm      : FormGroup;

  constructor(
    private tecnicoService              : tecnicoService,
    private formBuilder                 : FormBuilder,
    private dialogRef                   : MatDialogRef<ModalTecnicoComponents>,
    private alertService                : AlertService,
    @Inject(MAT_DIALOG_DATA) public data: { editMode: boolean, tecnico: tecnicoInterface }
  ) {
    this.myForm = this.formBuilder.group({
      identificacion      : ['', Validators.required],
      idtipo_tecnico      : ['', Validators.required],
      tarjeta_profecional : [''],
      nombre_tecnico      : ['', Validators.required],
      correo              : [''],
      telefono            : [''],
    });

    this.editMode = data.editMode;
  }

  ngOnInit(): void {
    if (this.editMode) {
      this.myForm.patchValue(this.data.tecnico);
      this.myForm.get('identificacion')?.setValidators([Validators.required])
      this.myForm.get('idtipo_tecnico')?.setValidators([Validators.required])
      this.myForm.get('nombre_tecnico')?.setValidators([Validators.required])
    }
  }

  createUpdateCause(): void {
    if (this.myForm.invalid) {
      return;
    }

    this.tecnico = {
      identificacion      : this.data.tecnico?.identificacion,
      idtipo_tecnico      : this.data.tecnico?.idtipo_tecnico,
      tarjeta_profecional : this.data.tecnico?.tarjeta_profecional,
      nombre_tecnico      : cleanAndCapitalizeFirstLettersOpt(this.myForm.get('nombre_tecnico')?.value),
      correo              : this.data.tecnico?.correo,
      telefono            : this.data.tecnico?.telefono,
    };

    let operation = this.editMode ?
      this.tecnicoService.updateTecnicos(this.tecnico) :
      this.tecnicoService.createTecnico(this.tecnico);

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
        this.getAllTecnico();

      },error:(err: any) => {
        this.dialogRef.close();
        this.clearForm();
        this.alertService.messageAlert({ message: "Por favor intente más tarde." });
      }
    });
  }

  getAllTecnico():void{
    this.tecnicoService.getAllTecnico(this.tecnicoFilter).subscribe({
      next:(response: any) => {
        this.tecnicoService.updateTecnico(response)
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
    return this.editMode ? 'Editar Tecnico' : 'Crear Tecnico';
  }
}
