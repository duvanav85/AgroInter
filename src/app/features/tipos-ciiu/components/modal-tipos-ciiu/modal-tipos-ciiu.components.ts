import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormsModule, ReactiveFormsModule } from '@angular/forms';
//Services
import { tiposCiiuService } from '../../services/tipos-ciiu-services';
//Interfaces
import { tiposCiiuInterface, tiposCiiuFilter } from '../../interface/tipos-ciiu-interface';
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
  selector: 'app-modal-tipos-ciiu',
  templateUrl: './modal-tipos-ciiu.components.html',
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
export class ModalTiposCiiuComponents
{
  tiposCiiu        : tiposCiiuInterface = {};
  tiposCiiuFilter  : tiposCiiuFilter={pageNumber:1,pageSize:5}
  editMode         : boolean;
  isModal          : boolean = true;
  myForm           : FormGroup;

  constructor(
    private tiposCiiuService            : tiposCiiuService,
    private formBuilder                 : FormBuilder,
    private dialogRef                   : MatDialogRef<ModalTiposCiiuComponents>,
    private alertService                : AlertService,
    @Inject(MAT_DIALOG_DATA) public data: { editMode: boolean, tiposCiiu: tiposCiiuInterface }
  ) {
    this.myForm = this.formBuilder.group({
      division      : ['', Validators.required],
      grupo         : ['', Validators.required],
      clase         : ['', Validators.required],
      descripcion   : [''],
    });

    this.editMode = data.editMode;
  }

  ngOnInit(): void {
    if (this.editMode) {
      this.myForm.patchValue(this.data.tiposCiiu);
      this.myForm.get('division')?.setValidators([Validators.required])
      this.myForm.get('grupo')?.setValidators([Validators.required])
      this.myForm.get('clase')?.setValidators([Validators.required])
      this.myForm.get('descripcion')?.setValidators([Validators.required])
    }
  }

  createUpdateTiposCiiu(): void {
    if (this.myForm.invalid) {
      return;
    }

    this.tiposCiiu = {
      division      : this.data.tiposCiiu?.division,
      grupo         : this.data.tiposCiiu?.grupo,
      clase         : this.data.tiposCiiu?.clase,
      descripcion   : cleanAndCapitalizeFirstLettersOpt(this.myForm.get('descripcion')?.value),
    };

    let operation = this.editMode ?
      this.tiposCiiuService.updateTiposCiius(this.tiposCiiu) :
      this.tiposCiiuService.createTiposCiiu(this.tiposCiiu);

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
        this.getAllTiposCiiu();

      },error:(err: any) => {
        this.dialogRef.close();
        this.clearForm();
        this.alertService.messageAlert({ message: "Por favor intente más tarde." });
      }
    });
  }

  getAllTiposCiiu():void{
    this.tiposCiiuService.getAllTiposCiiu(this.tiposCiiuFilter).subscribe({
      next:(response: any) => {
        this.tiposCiiuService.updateTiposCiius(response)
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
    return this.editMode ? 'Editar Tipos Ciiu' : 'Crear Tipos Ciiu';
  }
}
