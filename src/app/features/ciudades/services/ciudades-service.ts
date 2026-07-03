import { BehaviorSubject, Observable, catchError, delay, of, throwError } from 'rxjs';
import { Injectable } from '@angular/core';
//Services
import { BaseService } from '../../../core/services/base.service';
//Interfaces
import { ciudadesInterface, ciudadesFilter } from '../interfaces/ciudades-interface';
import { ApiResponse, CustomPagedResponse } from '../../../core/models/dto/apiresponse.interface';

@Injectable({
  providedIn: 'root'
})
export class ciudadesService {

  private urlGetAll   = 'Ciudades/GetAll';
  private urlCreate   = 'Ciudades/Create';
  private urlUpdate   = 'Ciudades/Update'

  private _ciudades = new BehaviorSubject<CustomPagedResponse<ciudadesInterface>>({ data: [], pageNumber: 1, pageSize: 5 })
  public readonly ciudades = this._ciudades.asObservable();

  constructor(private http: BaseService) { }

  private dummyItems:ciudadesInterface[]= [
    {idciudad: 1, iddepartamento:2, descripcion:"Medellin"},
    {idciudad: 2, iddepartamento:3, descripcion:"Bogota"},
    {idciudad: 3, iddepartamento:5, descripcion:"Cali"},
    {idciudad: 4, iddepartamento:8, descripcion:"Baranquilla"},
    {idciudad: 5, iddepartamento:9, descripcion:"Bucaramanga"},
  ];

  getAllCiudades(filters: ciudadesFilter): Observable<CustomPagedResponse<ciudadesInterface>> {
    const response: CustomPagedResponse<ciudadesInterface> = {
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

  // getAllCiudades(filters: ciudadesFilter): Observable<CustomPagedResponse<ciudadesInterface>> {
  //   return this.http.Post<CustomPagedResponse<ciudadesInterface>>(this.urlGetAll, filters)
  //     .pipe(catchError(error =>  throwError(() => error)));
  // }

  updateCiudades(Ciudades: CustomPagedResponse<ciudadesInterface>): void {
    this._ciudades.next(Ciudades);
  }

  updateCiudad(payload: ciudadesInterface): Observable<ApiResponse<boolean>> {
    return this.http.Post<ApiResponse<boolean>>(this.urlUpdate, payload)
      .pipe(catchError(error =>  throwError(() => error)));
  }

  createCiudades(payload: ciudadesInterface): Observable<ApiResponse<boolean>> {
    return this.http.Post<ApiResponse<boolean>>(this.urlCreate, payload)
      .pipe(catchError(error =>  throwError(() => error)));
  }
}
