import { BehaviorSubject, Observable, catchError, throwError, of, delay } from 'rxjs';
import { Injectable } from '@angular/core';
//Services
import { BaseService } from '../../../core/services/base.service';
//Interfaces
import { parametrosFilter, ParametrosInterface } from '../Interface/parametros-interface';
import { ApiResponse, CustomPagedResponse } from '../../../core/models/dto/apiresponse.interface';

@Injectable({
  providedIn: 'root'
})

export class ParametrosServices {

  private urlGetAll   = 'Parametros/GetAll';
  private urlCreate   = 'Parametros/Create';
  private urlUpdate   = 'Parametros/Update'

  private _parametros = new BehaviorSubject<CustomPagedResponse<parametrosFilter>>({ data: [], pageNumber: 1, pageSize: 5 })
  public readonly parametros = this._parametros.asObservable();

  constructor(private http: BaseService) { }

  private dummyItems: ParametrosInterface[] = [
    {parametro:1, nombreParametro:"Tipos Terceros" },
    {parametro:2, nombreParametro:"Tipos Identificaicon" },
    {parametro:3, nombreParametro:"Agendas" },
    {parametro:4, nombreParametro:"Tipos Clientes" },
    {parametro:5, nombreParametro:"Lineas" },
  ];

  getAllParametros(filters: parametrosFilter): Observable<CustomPagedResponse<ParametrosInterface>> {
    const response: CustomPagedResponse<ParametrosInterface> = {
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


  // getAllParametros(filters: parametrosFilter): Observable<CustomPagedResponse<ParametrosInterface>> {
  //   return this.http.Post<CustomPagedResponse<ParametrosInterface>>(this.urlGetAll, filters)
  //     .pipe(catchError(error =>  throwError(() => error)));
  // }

  updateParametros(parametros: CustomPagedResponse<ParametrosInterface>): void {
    this._parametros.next(parametros);
  }

  updateParametro(payload: ParametrosInterface): Observable<ApiResponse<boolean>> {
    return this.http.Post<ApiResponse<boolean>>(this.urlUpdate, payload)
      .pipe(catchError(error =>  throwError(() => error)));
  }

  createParametro(payload: ParametrosInterface): Observable<ApiResponse<boolean>> {
    return this.http.Post<ApiResponse<boolean>>(this.urlCreate, payload)
      .pipe(catchError(error =>  throwError(() => error)));
  }
}
