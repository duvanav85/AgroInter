import { BehaviorSubject, Observable, catchError, delay, of, throwError } from 'rxjs';
import { Injectable } from '@angular/core';
//Services
import { BaseService } from '../../../core/services/base.service';
//Interfaces
import { tecnicoInterface, tecnicoFilter } from '../interface/tecnico-interface';
import { ApiResponse, CustomPagedResponse } from '../../../core/models/dto/apiresponse.interface';

@Injectable({
  providedIn: 'root'
})
export class tecnicoService {

  private urlGetAll   = 'Tecnico/GetAll';
  private urlCreate   = 'Tecnico/Create';
  private urlUpdate   = 'Tecnico/Update'

  private _tecnico = new BehaviorSubject<CustomPagedResponse<tecnicoInterface>>({ data: [], pageNumber: 1, pageSize: 5 })
  public readonly tecnico = this._tecnico.asObservable();

  constructor(private http: BaseService) { }

   private dummyItems: tecnicoInterface[] = [
     { identificacion:1015142493, nombre_tecnico:'Juan Manuel Serrat', idtipo_tecnico:1, telefono:3005841516, correo:'jserrat@correo.com',    tarjeta_profecional:1015142493},
     { identificacion:1018942402, nombre_tecnico:'Carlos Sepulveda',   idtipo_tecnico:1, telefono:3009781523, correo:'csepulveda@correo.com', tarjeta_profecional:1018942402},
     { identificacion:1106122453, nombre_tecnico:'Andres Stiven Calderon', idtipo_tecnico:1, telefono:3105845219, correo:'acalderon@correo.com',    tarjeta_profecional:1106122453},
     { identificacion:1014525954, nombre_tecnico:'Liliana Andrea Perez', idtipo_tecnico:1, telefono:3216327585, correo:'lperez@correo.com',     tarjeta_profecional:1014525954},
     { identificacion:1101356412, nombre_tecnico:'Laura Gomez', idtipo_tecnico:1, telefono:31748511923, correo:'lgomez@correo.com', tarjeta_profecional:1101356412},
  ];

  getAllTecnico(filters: tecnicoFilter): Observable<CustomPagedResponse<tecnicoInterface>> {
    const response: CustomPagedResponse<tecnicoInterface> = {
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

  // getAllBarrios(filters: barriosFilter): Observable<CustomPagedResponse<barriosInterfaces>> {
  //   return this.http.Post<CustomPagedResponse<barriosInterfaces>>(this.urlGetAll, filters)
  //     .pipe(catchError(error =>  throwError(() => error)));
  // }

  updateTecnico(Tecnico: CustomPagedResponse<tecnicoInterface>): void {
    this._tecnico.next(Tecnico);
  }

  updateTecnicos(payload: tecnicoInterface): Observable<ApiResponse<boolean>> {
    return this.http.Post<ApiResponse<boolean>>(this.urlUpdate, payload)
      .pipe(catchError(error =>  throwError(() => error)));
  }

  createTecnico(payload: tecnicoInterface): Observable<ApiResponse<boolean>> {
    return this.http.Post<ApiResponse<boolean>>(this.urlCreate, payload)
      .pipe(catchError(error =>  throwError(() => error)));
  }
}
