import { Injectable } from '@angular/core';
import { SweetAlertOptions, SweetAlertResult } from 'sweetalert2';
import Swal from 'sweetalert2';
//Interfaces
import { ParametersAlert } from '../../../core/models/dto/alert.interface';

@Injectable({
  providedIn: 'root'
})

export class AlertService {

  public errorTitle!      : string
  public imgTipeMessage   : any;
  public important!       : string;
  public nonReversible!   : string;
  public tipeMessage      : any;

  width       = '520px';
  customClass = {
    container    : 'swal-custom',
    popup        : 'swal-custom-popup',
    header       : 'ant-modal-header',
    title        : 'ant-modal-title text-dark',
    closeButton  : 'ant-modal-close',
    icon         : 'swal-custom-icon',
    image        : 'swal-custom-image',
    content      : 'ant-modal-body',
    input        : 'mat-input-element mat-form-field-autofill-control form-control',
    actions      : 'swal-custom-actions',
    confirmButton: 'swal-custom-confirm-button',
    cancelButton : 'swal-custom-cancel-button',
    footer       : 'ant-modal-footer'
  };

  constructor() {}

  alert(options: any): Promise<any> {
    const swalOpts = {
      title: '',
      width: this.width,
      confirmButtonText: !options.confirmButtonText && options.confirmButtonText !== '' && options.confirmButtonText !== undefined ? options.confirmButtonText : 'Aceptar',
      allowOutsideClick: false,
      allowEscapeKey: false,
      customClass: this.customClass,
      ...options
    };

    swalOpts.html = `
        <div class="text-center">
            <img
                class="modal-img"
                src="../../../assets/img/error.png"
                alt="Mensaje de Alerta"
            />
            <p class="modal-text">
                ${swalOpts.text}
            </p>
        </div>
    `;
    return this.fire(swalOpts);
  }

  successMessage(swalOpts: SweetAlertOptions = {}): Promise<any> {
    swalOpts.html = `
            <div class="text-center">
                <img
                    class="modal-img"
                    src="../../../assets/img/exito.png"
                    alt="Operación Exitosa"
                />
                <p class="modal-text">
                    ${swalOpts.text}
                </p>
            </div>
        `;
    const nswalOpts = {
      showCloseButton  : true,
      width            : this.width,
      allowOutsideClick: false,
      allowEscapeKey   : false,
      confirmButtonText: swalOpts.confirmButtonText !== null && swalOpts.confirmButtonText !== '' ? swalOpts.confirmButtonText: 'Volver',
      confirmButton    : 'modal-btn',
      customClass      : this.customClass,
      ...swalOpts
    };
    return this.fire(nswalOpts);
  }

  warn(swalOpts: SweetAlertOptions = {}): Promise<any> {
    swalOpts.html = `
        <div class='alert alert-warning container-fluid'>
            <div class='col-xs-2 align-middle'>
                <i class='material-icons big'>&#xE002;</i>
            </div>
            <div class='col-xs-10 align-middle'>
                <h4>"${this.important}"</h4>
                <p>${this.nonReversible}</p>
            </div>
        </div>
        <p class='m-0'>${swalOpts.text}</p>`;
    const options = {
      title: '',
      width: this.width,
      allowOutsideClick: false,
      allowEscapeKey: false,
      showCancelButton: true,
      confirmButtonText: swalOpts.confirmButtonText !== null && swalOpts.confirmButtonText !== '' ? swalOpts.confirmButtonText : 'Sí',
      cancelButtonText: swalOpts.cancelButtonText !== null && swalOpts.cancelButtonText !== '' ? swalOpts.confirmButtonText : 'No',
      reverseButtons: true,
      customClass: this.customClass,
      ...swalOpts
    };
    return this.fire(options);
  }

  customWarn(swalOpts: SweetAlertOptions= {}): Promise<any> {
    swalOpts.html = `
        <div class="text-center">
                <img
                    class="modal-img"
                    src="../../../assets/img/warning.png"
                    alt="Warning"
                />
                <p class="modal-text">
                    ${swalOpts.text}
                </p>
        </div>`;
    const swalOptions = {
      title: '',
      width: this.width,
      allowOutsideClick: false,
      allowEscapeKey: false,
      showCancelButton: true,
      reverseButtons: true,
      customClass: this.customClass,
      ...swalOpts
    };
    return Swal.fire(swalOptions);
  }

  error(swalOpts: SweetAlertOptions = {}): Promise<any> {
    swalOpts.html = `
            <div class="text-center">
                <img
                    class="modal-img"
                    src="../../../assets/img/error.png"
                    alt="Error"
                />
                <p class="modal-text">
                    ${swalOpts.text}
                </p>
            </div>
        `;
    const nswalOpts = {
      showCloseButton: true,
      width: this.width,
      confirmButtonText: swalOpts.confirmButtonText !== null && swalOpts.confirmButtonText !== '' ? swalOpts.confirmButtonText : 'Volver',
      allowOutsideClick: false,
      allowEscapeKey: false,
      confirmButton: 'modal-btn',
      customClass: this.customClass,
      ...swalOpts
    };
    return this.fire(nswalOpts);
  }

  errorAuth(swalOpts: SweetAlertOptions = {}): Promise<any> {
    swalOpts.html = `
            <div class="text-center">
                <h2 class="modal-title">${this.errorTitle}</h2>
                <img
                    class="modal-img"
                    src="../../../assets/img/error.png"
                    alt="Acceso denegado"
                />
                <p class="modal-text">
                    ${swalOpts.text}
                </p>
            </div>
        `;
    const nswalOpts = {
      showCloseButton: true,
      width: this.width,
      allowOutsideClick: false,
      allowEscapeKey: false,
      confirmButtonText: swalOpts.confirmButtonText !== null && swalOpts.confirmButtonText !== '' ? swalOpts.confirmButtonText : 'Volver',
      confirmButton: 'modal-btn',
      customClass: this.customClass,
      ...swalOpts
    };
    return this.fire(nswalOpts, false);
  }



  fire(swalOpts: SweetAlertOptions, Auth: boolean = true): Promise<any> {
    return new Promise((resolve, reject) => {
      Swal.fire(swalOpts).then((data) => {
        if (!data.dismiss) {
          if (Auth) {
            resolve(data);
          } else {

          }

        } else if (Swal.DismissReason.close) {
          if (!Auth) {

          }
        } else {
          reject(data);
        }
      });
    });
  }

  modalMessageInformative(swalOpts: SweetAlertOptions, messageOpts: any): Promise<any> {
    if (messageOpts === 'successMessage') {
      this.imgTipeMessage = '../../../assets/img/exito.png';
      this.tipeMessage = "Operación realizada con éxito"
    } else if (messageOpts === 'customWarn') {
      this.imgTipeMessage = '../../../assets/img/warning.png';
      this.tipeMessage = "Algo ocurrió, Advertencia!"
    } else if (messageOpts === 'alert') {
      this.imgTipeMessage = '../../../assets/img/error.png';
      this.tipeMessage = "Se presentó un error interno"
    } else if (messageOpts === 'alert2') {
      this.imgTipeMessage = '../../../assets/img/alertr.png';
      this.tipeMessage = "Se presentó un error interno"
    } else if (messageOpts === 'error') {
      this.imgTipeMessage = '../../../assets/img/404.png';
      this.tipeMessage = "Se presentó un error interno"
    } else {
      this.imgTipeMessage = '';
      this.tipeMessage = '';
    }

    const swalOptions = {
      title: swalOpts.title ? swalOpts.title : this.tipeMessage,
      text: swalOpts.text,
      html: swalOpts.html,
      imageUrl: this.imgTipeMessage,
      imageWidth: 400,
      imageHeight: 300,
      imageAlt: 'Custom image',
      width: swalOpts.width || '40%',
      showCloseButton: swalOpts.showCloseButton === true,
      showCancelButton: swalOpts.showCancelButton === true,
      focusConfirm: false,
      focusCancel: true,
      confirmButtonText: swalOpts.confirmButtonText ? swalOpts.confirmButtonText : 'Ok',
      cancelButtonText: swalOpts.cancelButtonText ? swalOpts.cancelButtonText : 'Cancel',
      allowOutsideClick: swalOpts.allowOutsideClick === true
    };
    return Swal.fire(swalOptions);
  }


  messageSuccess(param: ParametersAlert) {
    this.modalMessageInformative({
      title: param.title,
      html: param.message,
      showCancelButton: false,
      confirmButtonText: "Cerrar",
      showCloseButton: false,
      width: this.width
    }, 'successMessage').then((result: SweetAlertResult) => {
      if (result.isConfirmed && param.methodOk) {
        param.methodOk();
      }
    });
  }

  messageWarn(param: ParametersAlert) {
    this.modalMessageInformative({
      title: param.title ,
      html: param.message,
      showCancelButton: false,
      confirmButtonText: "OK",
      showCloseButton: false,
      width: this.width
    }, 'customWarn').then((result: SweetAlertResult) => {
      if (result.isConfirmed && param.methodOk) {
        param.methodOk();
      }
    });
  }

  alertCustomError(data: any) {
    this.modalMessageInformative({
      title: data.title,
      text: data.message,
      confirmButtonText:"OK",
      showCancelButton: false,
      showCloseButton: false,
      width: this.width
    }, 'error').then((result) => {
      if (result.isConfirmed && data.method) {
        data.method();
      }
    });
  }

  messageAlert(data: any) {
    this.modalMessageInformative({
      title: data.title,
      text: data.message,
      confirmButtonText:"OK",
      showCancelButton: false,
      showCloseButton: false,
      width: this.width
    }, 'alert').then((result) => {
      if (result.isConfirmed && data.method) {
        data.method();
      }
    });
  }

  alertCustomSuccess(data: any) {
    this.modalMessageInformative({
      title: data.title,
      text: data.message,
      confirmButtonText: "OK",
      showCancelButton: false,
      showCloseButton: false,
      html: data.html,
      width: this.width
    }, 'successMessage').then((result) => {
      if (result.isConfirmed && data.method) {
        data.method();
      }
    });
  }

  messageError(param: ParametersAlert) {
    this.modalMessageInformative({
      title: param.title,
      html: param.message ,
      showCancelButton: false,
      confirmButtonText:"Cerrar",
      showCloseButton: false,
      width: this.width
    }, 'error').then((result: SweetAlertResult) => {
      if (result.isConfirmed && param.methodOk) {
        param.methodOk();
      }
    });
  }

  messageQuestion(param: ParametersAlert) {
    this.modalMessageInformative({
      title: param.title,
      html: param.message ,
      showCancelButton: true,
      confirmButtonText: "Ok",
      cancelButtonText: "Cancelar",
      showCloseButton: false,
      width: this.width
    }, 'customWarn').then((result: SweetAlertResult) => {
      if (result.isConfirmed && param.methodOk) {
        param.methodOk();
      }
    });
  }

}
