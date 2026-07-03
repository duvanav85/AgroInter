import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormsModule, ReactiveFormsModule } from '@angular/forms';
//Services
import { visitaService } from '../../service/visita-services';
//Interfaces
import { visitaInterface, visitaFilter} from '../../interface/visita-interface';
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
  selector: 'app-modal-visita',
  templateUrl: './modal-visita.components.html',
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
export class ModalVisitaComponents
{
  visita              : visitaInterface = {};
  visitaFilter        : visitaFilter={pageNumber:1,pageSize:5}
  editMode            : boolean;
  isModal             : boolean = true;
  myForm              : FormGroup;

  constructor(
    private visitaService               : visitaService,
    private formBuilder                 : FormBuilder,
    private dialogRef                   : MatDialogRef<ModalVisitaComponents>,
    private alertService                : AlertService,
    @Inject(MAT_DIALOG_DATA) public data: { editMode: boolean, visita: visitaInterface }
  ) {
    this.myForm = this.formBuilder.group({
      //idAVisita             : ['', Validators.required],
      edo_ticket            : ['', Validators.required],
      productorId           : ['', Validators.required],
      idPredio              : ['', Validators.required],
      idDepartamento        : [''],
      idMunicipio           : [''],
      idVereda              : ['', Validators.required],
      Direccion             : [''],
      idTipoCultivo         : [''],
      requerimiento         : [''],
      adjunto               : [''],
      adjunto1              : [''],
      adjunto2              : [''],
    });

    this.editMode = data.editMode;
  }

  ngOnInit(): void {
    if (this.editMode) {
      this.myForm.patchValue(this.data.visita);
      //this.myForm.get('idAVisita')?.setValidators([Validators.required])
      this.myForm.get('edo_ticket')?.setValidators([Validators.required])
      this.myForm.get('productorId')?.setValidators([Validators.required])
      this.myForm.get('idPredio')?.setValidators([Validators.required])
      this.myForm.get('idVereda')?.setValidators([Validators.required])
    }
  }

  createUpdateVisita(): void {
    if (this.myForm.invalid) {
      return;
    }

    this.visita = {
      idAVisita             : this.data.visita?.idAVisita,
      edo_ticket            : this.data.visita?.edo_ticket,
      productorId           : this.data.visita?.productorId,
      idPredio              : this.data.visita?.idPredio,
      idDepartamento        : this.data.visita?.idDepartamento,
      idMunicipio           : this.data.visita?.idMunicipio,
      idVereda              : this.data.visita?.idVereda,
      Direccion             : this.data.visita?.Direccion,
      idTipoCultivo         : this.data.visita?.idTipoCultivo,
      requerimiento         : this.data.visita?.requerimiento,
      adjunto               : this.data.visita?.adjunto,
      adjunto1              : this.data.visita?.adjunto1,
      adjunto2              : this.data.visita?.adjunto2,
      //activo                : (!this.editMode) ? true : getStatusValue(this.myForm.get('activo')?.value) ?? false,
    };

    let operation = this.editMode ?
      this.visitaService.updateVisitas(this.visita) :
      this.visitaService.createVisita(this.visita);

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
        this.getAllVisita();

      },error:(err: any) => {
        this.dialogRef.close();
        this.clearForm();
        this.alertService.messageAlert({ message: "Por favor intente más tarde." });
      }
    });
  }

  getAllVisita():void{
    this.visitaService.getAllVisita(this.visitaFilter).subscribe({
      next:(response: any) => {
        this.visitaService.updateVisita(response)
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
    return this.editMode ? 'Editar Visita' : 'Crear Visita';
  }
}
