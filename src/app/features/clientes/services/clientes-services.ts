import { BehaviorSubject, Observable, catchError, delay, of, throwError } from 'rxjs';
import { Injectable } from '@angular/core';
//Services
import { BaseService } from '../../../core/services/base.service';
//Interfaces
import { clientesInterface, clientesFilter } from '../interface/clientes-interface';
import { ApiResponse, CustomPagedResponse } from '../../../core/models/dto/apiresponse.interface';

@Injectable({
  providedIn: 'root'
})

export class clientesService {

  private urlGetAll   = 'Clientes/GetAll';
  private urlCreate   = 'Clientes/Create';
  private urlUpdate   = 'Clientes/Update'

  private _clientes = new BehaviorSubject<CustomPagedResponse<clientesInterface>>({ data: [], pageNumber: 1, pageSize: 5 })
  public readonly clientes = this._clientes.asObservable();

  constructor(private http: BaseService) { }

  private dummyItems: clientesInterface[] = [
    {clienteId:'01', cedula:10111035, digito:0, nombre: 'Juan', apellidos:'Velez', idtipo_iden: 1, idtipo_contacto: 1, idtipo_ciiu: 1, idagencia: 1, idejec_cuenta:2, idzona:4, idtipo_tercero:3, gran_contribuyente:false, autoretenedor: false, email:'jvelez@correo.com', email1: '', email2:'', foto: '' },
    {clienteId:'02', cedula:10111034, digito:0, nombre: 'Pedro', apellidos:'Suarez', idtipo_iden: 1, idtipo_contacto: 1, idtipo_ciiu: 1, idagencia: 1, idejec_cuenta:2, idzona:4, idtipo_tercero:3, gran_contribuyente:false, autoretenedor: false, email:'psuarez@correo.com', email1: '', email2:'', foto: '' },
    {clienteId:'03', cedula:10111032, digito:0, nombre: 'Andres', apellidos:'Rios', idtipo_iden: 1, idtipo_contacto: 1, idtipo_ciiu: 1, idagencia: 1, idejec_cuenta:2, idzona:4, idtipo_tercero:3, gran_contribuyente:false, autoretenedor: false, email:'arios@correo.com', email1: '', email2:'', foto: '' },
    {clienteId:'04', cedula:10111031, digito:0, nombre: 'Jenny', apellidos:'Fernandez', idtipo_iden: 1, idtipo_contacto: 1, idtipo_ciiu: 1, idagencia: 1, idejec_cuenta:2, idzona:4, idtipo_tercero:3, gran_contribuyente:false, autoretenedor: false, email:'jfernandez@correo.com', email1: '', email2:'', foto: '' },
    {clienteId:'05', cedula:10111037, digito:0, nombre: 'Vanessa', apellidos:'Campo', idtipo_iden: 1, idtipo_contacto: 1, idtipo_ciiu: 1, idagencia: 1, idejec_cuenta:2, idzona:4, idtipo_tercero:3, gran_contribuyente:false, autoretenedor: false, email:'vcampos@correo.com', email1: '', email2:'', foto: '' },
  ];

  getAllClientes(filters: clientesFilter): Observable<CustomPagedResponse<clientesInterface>> {
    const response: CustomPagedResponse<clientesInterface> = {
      data: this.dummyItems,
      succeeded: true,
      message: 'OK',
      totalItems: this.dummyItems.length,
      pageNumber: 1,
      pageSize: this.dummyItems.length,
      totalPages: 1,
      hasNextPage: false,
      hasPreviousPage: false
    };

    return of(response).pipe(delay(1000));
  }

  // getAllClientes(filters: clientesFilter): Observable<CustomPagedResponse<clientesInterface>> {
  //   return this.http.Post<CustomPagedResponse<clientesInterface>>(this.urlGetAll, filters)
  //     .pipe(catchError(error =>  throwError(() => error)));
  // }

  updateCliente(Clientes: CustomPagedResponse<clientesInterface>): void {
    this._clientes.next(Clientes);
  }

  updateClientes(payload: clientesInterface): Observable<ApiResponse<boolean>> {
    return this.http.Post<ApiResponse<boolean>>(this.urlUpdate, payload)
      .pipe(catchError(error =>  throwError(() => error)));
  }

  createClientes(payload: clientesInterface): Observable<ApiResponse<boolean>> {
    return this.http.Post<ApiResponse<boolean>>(this.urlCreate, payload)
      .pipe(catchError(error =>  throwError(() => error)));
  }
}
