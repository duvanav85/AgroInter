import { BehaviorSubject, Observable, catchError, delay, of, throwError } from 'rxjs';
import { Injectable } from '@angular/core';
//Services
import { BaseService } from '../../../core/services/base.service';
//Interfaces
import { paisesInterface, paisesFilter } from '../interface/paises-interface';
import { ApiResponse, CustomPagedResponse } from '../../../core/models/dto/apiresponse.interface';

@Injectable({
  providedIn: 'root'
})
export class paisesService {

  private urlGetAll   = 'Paises/GetAll';
  private urlCreate   = 'Paises/Create';
  private urlUpdate   = 'Paises/Update'

  private _paises = new BehaviorSubject<CustomPagedResponse<paisesInterface>>({ data: [], pageNumber: 1, pageSize: 5 })
  public readonly paises = this._paises.asObservable();

  constructor(private http: BaseService) { }

  private dummyItems: paisesInterface[] = [
    {paisid:"1", codigo:"001", id_DIAN: "001", descripcion:"Colombia",  Active:true },
    {paisid:"2", codigo:"002", id_DIAN: "002", descripcion:"Ecuador",   Active:true },
    {paisid:"3", codigo:"003", id_DIAN: "003", descripcion:"Venezuela", Active:true },
  ];

  getAllPaises(filters: paisesFilter): Observable<CustomPagedResponse<paisesInterface>> {
    const response: CustomPagedResponse<paisesInterface> = {
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

  // getAllPaises(filters: paisesFilter): Observable<CustomPagedResponse<paisesInterface>> {
  //   return this.http.Post<CustomPagedResponse<paisesInterface>>(this.urlGetAll, filters)
  //     .pipe(catchError(error =>  throwError(() => error)));
  // }

  updatePaises(Paises: CustomPagedResponse<paisesInterface>): void {
    this._paises.next(Paises);
  }

  updatePaise(payload: paisesInterface): Observable<ApiResponse<boolean>> {
    return this.http.Post<ApiResponse<boolean>>(this.urlUpdate, payload)
      .pipe(catchError(error =>  throwError(() => error)));
  }

  createPaises(payload: paisesInterface): Observable<ApiResponse<boolean>> {
    return this.http.Post<ApiResponse<boolean>>(this.urlCreate, payload)
      .pipe(catchError(error =>  throwError(() => error)));
  }
}
