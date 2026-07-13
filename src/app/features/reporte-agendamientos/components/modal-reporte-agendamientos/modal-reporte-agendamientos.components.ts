import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormsModule, ReactiveFormsModule } from '@angular/forms';
//Services
import { reporteAgendamientosService } from '../../services/reporte-agendamientos-services';
//Interfaces
import { reporteAgendamientoInterface, reporteAgendamientoFilter } from '../../interface/reporte-agendamientos-interface';
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
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MAT_DATE_LOCALE, provideNativeDateAdapter } from '@angular/material/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-modal-reporte-agendamientos',
  templateUrl: './modal-reporte-agendamientos.components.html',
  styleUrl: './modal-reporte-agendamientos.components.scss',
  providers: [provideNativeDateAdapter(),
    { provide: MAT_DATE_LOCALE, useValue: 'es-ES' } // 'es-ES' fuerza el formato DD/MM/YYYY
  ],
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
    MatDatepickerModule,
    MatFormFieldModule,
  ],
})
export class ModalReporteAgendamientosComponents
{
  reporteAgendamientos        : reporteAgendamientoInterface = {};
  reporteAgendamientosFilter  : reporteAgendamientoFilter={pageNumber:1,pageSize:5}
  editMode                    : boolean;
  isModal                     : boolean = true;
  myForm                      : FormGroup;

  constructor(
    private reporteAgendamientosService : reporteAgendamientosService,
    private formBuilder                 : FormBuilder,
    private dialogRef                   : MatDialogRef<ModalReporteAgendamientosComponents>,
    private alertService                : AlertService,
    @Inject(MAT_DIALOG_DATA) public data: { editMode: boolean, reporteAgendamientos: reporteAgendamientoInterface }
  ) {
    this.myForm = this.formBuilder.group({
      semaforo        : ['', Validators.required],
      idTicket        : ['', Validators.required],
      estado_ticket   : ['', Validators.required],
      fecha_visita    : ['', Validators.required],
      idTecnico       : ['', Validators.required],
      nro_convenio    : ['', Validators.required],
      fecha_agenda    : ['', Validators.required],
      horario_agenda  : ['', Validators.required],
      idpropietario   : ['', Validators.required],
      iddepartamento  : ['', Validators.required],
      idmunicipio     : ['', Validators.required],
      idvereda        : ['', Validators.required],
      idpredio        : ['', Validators.required],
      idtipo_cultivo  : ['', Validators.required],
    });

    this.editMode = data.editMode;
  }

  ngOnInit(): void {
    if (this.editMode) {
      this.myForm.patchValue(this.data.reporteAgendamientos);
      this.myForm.get('semaforo')?.setValidators([Validators.required])
      this.myForm.get('idTicket')?.setValidators([Validators.required])
      this.myForm.get('estado_ticket')?.setValidators([Validators.required])
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

    this.reporteAgendamientos = {
      semaforo        : this.data.reporteAgendamientos?.semaforo,
      idTicket        : this.data.reporteAgendamientos?.idTicket,
      estado_ticket   : this.data.reporteAgendamientos?.estado_ticket,
      fecha_visita    : this.data.reporteAgendamientos?.fecha_visita,
      idTecnico       : this.data.reporteAgendamientos?.idTecnico,
      nro_convenio    : this.data.reporteAgendamientos?.nro_convenio,
      fecha_agenda    : this.data.reporteAgendamientos?.fecha_agenda,
      horario_agenda  : this.data.reporteAgendamientos?.horario_agenda,
      idpropietario   : this.data.reporteAgendamientos?.idpropietario,
      iddepartamento  : this.data.reporteAgendamientos?.iddepartamento,
      idmunicipio     : this.data.reporteAgendamientos?.idmunicipio,
      idvereda        : this.data.reporteAgendamientos?.idvereda,
      idpredio        : this.data.reporteAgendamientos?.idpredio,
      idtipo_cultivo  : this.data.reporteAgendamientos?.idtipo_cultivo,
    };

    let operation = this.editMode ?
      this.reporteAgendamientosService.updateReporteAgendamiento(this.reporteAgendamientos) :
      this.reporteAgendamientosService.createReporteAgendamiento(this.reporteAgendamientos);

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
        this.getAllReporteAgendamiento();

      },error:(err: any) => {
        this.dialogRef.close();
        this.clearForm();
        this.alertService.messageAlert({ message: "Por favor intente más tarde." });
      }
    });
  }

  getAllReporteAgendamiento():void{
    this.reporteAgendamientosService.getAllReporteAgendamientos(this.reporteAgendamientosFilter).subscribe({
      next:(response: any) => {
        this.reporteAgendamientosService.updateReporteAgendamientos(response)
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
    return this.editMode ? 'Editar Reporte Agendamientos' : 'Crear Reporte Agendamientos';
  }
}
