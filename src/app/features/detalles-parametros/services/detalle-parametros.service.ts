import { BehaviorSubject, Observable, catchError, throwError } from 'rxjs';
import { Injectable } from '@angular/core';
//Interfaces
import { DetalleParametrosInterface, DetalleParametrosFilter } from '../interface/detalle-parametros-interface';
//Services
import { BaseService } from '../../../core/services/base.service';
import { ApiResponse, CustomPagedResponse } from '../../../core/models/dto/apiresponse.interface';
import { of } from 'rxjs';
import { delay } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class DetalleParametrosService {

  private urlGetAll = 'detalleparametros/get-all'
  private urlCreate = 'detalleparametros/create'
  private urlUpdate = 'detalleparametros/update'

  private _detallesParametros = new BehaviorSubject<CustomPagedResponse<DetalleParametrosInterface>>({data: [], pageNumber: 1, pageSize: 5});
  readonly detalleParametro = this._detallesParametros.asObservable();

  constructor(private http: BaseService) { }

  // 1. Datos falsos (dummy)
  private dummyItems: DetalleParametrosInterface[] = [
    { idparametro: 1, idregistro: 1, descripcion: 'Descripción del item 1', activo: true },
    { idparametro: 1, idregistro: 2, descripcion: 'Descripción del item 2', activo: true },
    { idparametro: 1, idregistro: 3, descripcion: 'Descripción del item 3', activo: true },
    { idparametro: 1, idregistro: 4, descripcion: 'Descripción del item 4', activo: true },
    { idparametro: 1, idregistro: 5, descripcion: 'Descripción del item 5', activo: true },
  ];

  getAllDetalleParametros(filters: DetalleParametrosFilter): Observable<CustomPagedResponse<DetalleParametrosInterface>> {
    const response: CustomPagedResponse<DetalleParametrosInterface> = {
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

  // getAllDetalleParametros(filters: DetalleParametrosFilter): Observable<CustomPagedResponse<DetalleParametrosInterface>> {
  //   return this.http.Post<CustomPagedResponse<DetalleParametrosInterface>>(this.urlGetAll, filters)
  //     .pipe(catchError(error => throwError(() => error)));
  // }

  updateDetalleParametrosObservable(detalleParametros: CustomPagedResponse<DetalleParametrosInterface>): void {
    this._detallesParametros.next(detalleParametros);
  }

  updateDetalleParametros(detalleParametros:DetalleParametrosInterface): Observable<ApiResponse<boolean>>{
    return this.http.Post<ApiResponse<boolean>>(this.urlUpdate, detalleParametros)
      .pipe(catchError(error => throwError(() => error)));
  }

  createDetalleParametros(detalleParametros:DetalleParametrosInterface): Observable<ApiResponse<boolean>>{
    return this.http.Post<ApiResponse<boolean>>(this.urlCreate, detalleParametros)
      .pipe(catchError(error => throwError(() => error)));
  }

}
