import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormsModule, ReactiveFormsModule } from '@angular/forms';
//Services
import { asgvisitaService } from '../../service/asg-visitas-service';
//Interfaces
import { asgvisitaInterface, asgvisitaFilter } from '../../interface/asg-visitas-interface';
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
  selector: 'app-modal-asg-visitas',
  templateUrl: './modal-asg-visitas.components.html',
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
export class ModalAsgVisitasComponents
{
  asgvisita       : asgvisitaInterface = {};
  asgvisitaFilter : asgvisitaFilter={pageNumber:1,pageSize:5}
  editMode        : boolean;
  isModal         : boolean = true;
  myForm          : FormGroup;

  constructor(
    private asgvisitaService            : asgvisitaService,
    private formBuilder                 : FormBuilder,
    private dialogRef                   : MatDialogRef<ModalAsgVisitasComponents>,
    private alertService                : AlertService,
    @Inject(MAT_DIALOG_DATA) public data: { editMode: boolean, asgvisita: asgvisitaInterface }
  ) {
    this.myForm = this.formBuilder.group({
      visitaid        : [''],
      idTicket        : ['', Validators.required],
      fecha_visita    : [''],
      idTecnico       : ['', Validators.required],
      nro_convenio    : ['', Validators.required],
      fecha_agenda    : [''],
    });

    this.editMode = data.editMode;
  }

  ngOnInit(): void {
    if (this.editMode) {
      this.myForm.patchValue(this.data.asgvisita);
      this.myForm.get('idTicket')?.setValidators([Validators.required])
      this.myForm.get('fecha_visita')?.setValidators([Validators.required])
      this.myForm.get('idTecnico')?.setValidators([Validators.required])
      this.myForm.get('nro_convenio')?.setValidators([Validators.required])
      this.myForm.get('fecha_agenda')?.setValidators([Validators.required])
    }
  }

  createUpdateAsgVisita(): void {
    if (this.myForm.invalid) {
      return;
    }

    this.asgvisita = {
      idTicket        : this.data.asgvisita?.idTicket,
      idTecnico       : this.data.asgvisita?.idTecnico,
      nro_convenio    : this.data.asgvisita?.nro_convenio,
      fecha_agenda    : this.data.asgvisita?.fecha_agenda,
    };

    let operation = this.editMode ?
      this.asgvisitaService.updateAsgVisitas(this.asgvisita) :
      this.asgvisitaService.createAsgVisita(this.asgvisita);

    operation.subscribe({
      next:(res: ApiResponse<boolean>) => {
        if (!res.succeeded) {
          const errors = res.errors ?? [];
          if (errors[0].includes("already exist")) {
            this.alertService.messageWarn({ message: "Ya existe otra asignación de visita con estos datos" });
            return;
          }
          this.alertService.messageAlert({ message: "Por favor intente más tarde." });
          return;
        }
        this.dialogRef.close();
        this.clearForm();
        this.getAllAsgVisitas();

      },error:(err: any) => {
        this.dialogRef.close();
        this.clearForm();
        this.alertService.messageAlert({ message: "Por favor intente más tarde." });
      }
    });
  }

  getAllAsgVisitas():void{
    this.asgvisitaService.getAllAsgVisita(this.asgvisitaFilter).subscribe({
      next:(response: any) => {
        this.asgvisitaService.updateAsgVisitas(response)
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
    return this.editMode ? 'Editar Asignación de Visitas' : 'Crear Asignación de Visitas';
  }
}
