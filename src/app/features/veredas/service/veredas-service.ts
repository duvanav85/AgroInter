import { BehaviorSubject, Observable, catchError, delay, of, throwError } from 'rxjs';
import { Injectable } from '@angular/core';
//Services
import { BaseService } from '../../../core/services/base.service';
//Interfaces
import {veredasFilter, veredasInterface } from '../interface/veredas-interface';
import { ApiResponse, CustomPagedResponse } from '../../../core/models/dto/apiresponse.interface';
import { ciudadesFilter, ciudadesInterface } from '../../ciudades/interfaces/ciudades-interface';

@Injectable({
  providedIn: 'root'
})
export class veredasService
{
  private urlGetAll   = 'Veredas/GetAll';
  private urlCreate   = 'Veredas/Create';
  private urlUpdate   = 'Veredas/Update'

  private _veredas = new BehaviorSubject<CustomPagedResponse<veredasInterface>>({ data: [], pageNumber: 1, pageSize: 5 })
  public readonly veredas = this._veredas.asObservable();

  constructor(private http: BaseService) { }

  private dummyItems:veredasInterface[]= [
    {nombre_vereda:"Medellin", idciudad: 1, iddepartamento:2,  area_ha: 100, poblacion: 500},
    {nombre_vereda:"Bogota", idciudad: 2, iddepartamento:3, area_ha: 200, poblacion: 1000},
    {nombre_vereda:"Cali", idciudad: 3, iddepartamento:5, area_ha: 150, poblacion: 750},
    {nombre_vereda:"Baranquilla", idciudad: 4, iddepartamento:8, area_ha: 120, poblacion: 600},
    {nombre_vereda:"Bucaramanga", idciudad: 5, iddepartamento:9, area_ha: 180, poblacion: 900},
  ];

  getAllVeredas(filters: veredasFilter): Observable<CustomPagedResponse<veredasInterface>> {
    const response: CustomPagedResponse<veredasInterface> = {
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

  // getAllVeredas(filters: veredasFilter): Observable<CustomPagedResponse<veredasInterface>> {
  //   return this.http.Post<CustomPagedResponse<veredasInterface>>(this.urlGetAll, filters)
  //     .pipe(catchError(error =>  throwError(() => error)));
  // }

  updateVeredas(Veredas: CustomPagedResponse<veredasInterface>): void {
    this._veredas.next(Veredas);
  }

  updateVereda(payload: veredasInterface): Observable<ApiResponse<boolean>> {
    return this.http.Post<ApiResponse<boolean>>(this.urlUpdate, payload)
      .pipe(catchError(error =>  throwError(() => error)));
  }

  createVeredas(payload: veredasInterface): Observable<ApiResponse<boolean>> {
    return this.http.Post<ApiResponse<boolean>>(this.urlCreate, payload)
      .pipe(catchError(error =>  throwError(() => error)));
  }
}
