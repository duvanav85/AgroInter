import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormsModule, ReactiveFormsModule } from '@angular/forms';
//Services
//import { AirportService } from '../../services/airport-service.service';
import { AlertService } from '../../../../shared/services/Alert/alert.service';
//Interfaces
//import { Airport, AirportFilter } from '../../interfaces/airport-interface';
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
import { DetalleParametrosFilter, DetalleParametrosInterface } from '../../interface/detalle-parametros-interface';
import { DetalleParametrosService } from '../../services/detalle-parametros.service';

@Component({
  selector: 'app-modal-detelles-parametros',
  templateUrl: './modal-detelles-parametros.components.html',
  styleUrl: './modal-detelles-parametros.components.scss',
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
export class ModalDetellesParametrosComponents
{
  detalleparametros       : DetalleParametrosInterface = {};
  detalleparametrosFilter : DetalleParametrosFilter = { pageNumber: 1, pageSize: 5 }
  editMode                : boolean;
  isModal                 : boolean = true;
  myForm                  : FormGroup;

  constructor(
    private detalleParametrosService: DetalleParametrosService,
    private formBuilder: FormBuilder,
    private dialogRef: MatDialogRef<ModalDetellesParametrosComponents>,
    private alertService: AlertService,
    @Inject(MAT_DIALOG_DATA) public data: { editMode: boolean, detalleparametros: DetalleParametrosInterface }
  ) {
    this.myForm = this.formBuilder.group({
      parametro: ['', Validators.required],
      idregistro: ['', Validators.required],
      descripcion: ['', Validators.required],
      activo: ['', [Validators.required,Validators.pattern('^[a-zA-Z]+$'),Validators.maxLength(3),Validators.minLength(3)]]
    });
    this.editMode = data.editMode;
  }

  ngOnInit(): void {
    if (this.editMode) {
      this.myForm.patchValue(this.data.detalleparametros);
      // this.myForm.get('shortName').disable();
      // this.myForm.get('city').disable();
      this.myForm.get('parametro')?.patchValue(this.data.detalleparametros.idparametro);
      this.myForm.get('idregistro')?.patchValue(this.data.detalleparametros.idregistro);
      this.myForm.get('descripcion')?.patchValue(this.data.detalleparametros.descripcion?.toUpperCase());
      this.myForm.get('activo')?.patchValue(this.data.detalleparametros.activo?.toString().toUpperCase());
    }
  }

  createUpdatedetalleParametros(): void {
    if (this.myForm.invalid) {
      return;
    }

    this.detalleparametros = {
      //detalleParametrosId: this.data.detalleparametros?.detalleParametrosId,
      idparametro: this.myForm.get('parametro')?.value.toUpperCase(),
      idregistro: this.myForm.get('idregistro')?.value.toUpperCase(),
      descripcion: this.myForm.get('descripcion')?.value.toUpperCase(),
      activo: this.myForm.get('activo')?.value.toUpperCase()
    }

    let operation = this.editMode ?
      this.detalleParametrosService.updateDetalleParametros(this.detalleparametros) :
      this.detalleParametrosService.createDetalleParametros(this.detalleparametros);

    operation.subscribe({
      next:(response) => {
        if (!response.succeeded) {
          this.alertService.messageAlert({ message: "Por favor intente más tarde." });
        } else {
          this.dialogRef.close();
          this.clearForm();
          this.alertService.messageSuccess({});

          this.updateTable();
        }
      }, error: (err: any) => {
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

  updateTable(): void {
    this.detalleParametrosService.getAllDetalleParametros(this.detalleparametrosFilter).subscribe({
      next: response => {
        if (!response.succeeded) {
          this.alertService.messageAlert({ message: "Por favor intente más tarde." });
        }else{
          this.detalleParametrosService.updateDetalleParametrosObservable(response)
        }
      },error: (err: any) => {
        this.alertService.messageAlert({ message: "Por favor intente más tarde." });
      }
    });
  }

  getTitle(): string {
    return this.editMode ? 'Editar Detalle de Parámetro' : 'Crear Detalle de Parámetro';
  }
}
