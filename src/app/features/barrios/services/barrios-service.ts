import { BehaviorSubject, Observable, catchError, delay, of, throwError } from 'rxjs';
import { Injectable } from '@angular/core';
//Services
import { BaseService } from '../../../core/services/base.service';
//Interfaces
import { barriosInterfaces, barriosFilter } from '../interfaces/barrios-interface';
import { ApiResponse, CustomPagedResponse } from '../../../core/models/dto/apiresponse.interface';

@Injectable({
  providedIn: 'root'
})
export class barriosService {

  private urlGetAll   = 'Barrios/GetAll';
  private urlCreate   = 'Barrios/Create';
  private urlUpdate   = 'Barrios/Update'

  private _barrios = new BehaviorSubject<CustomPagedResponse<barriosInterfaces>>({ data: [], pageNumber: 1, pageSize: 5 })
  public readonly barrios = this._barrios.asObservable();

  constructor(private http: BaseService) { }

   private dummyItems: barriosInterfaces[] = [
    { idbarrio: 1, idciudad: 1, descripcion: 'Calazan' },
    { idbarrio: 2, idciudad: 1, descripcion: 'Robledo' },
    { idbarrio: 3, idciudad: 1, descripcion: 'Belen' },
    { idbarrio: 4, idciudad: 1, descripcion: 'Poblado' },
    { idbarrio: 5, idciudad: 1, descripcion: 'Laureles' },
  ];

  getAllBarrios(filters: barriosFilter): Observable<CustomPagedResponse<barriosInterfaces>> {
    const response: CustomPagedResponse<barriosInterfaces> = {
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

  updateBarrios(Barrios: CustomPagedResponse<barriosInterfaces>): void {
    this._barrios.next(Barrios);
  }

  updateBarrio(payload: barriosInterfaces): Observable<ApiResponse<boolean>> {
    return this.http.Post<ApiResponse<boolean>>(this.urlUpdate, payload)
      .pipe(catchError(error =>  throwError(() => error)));
  }

  createBarrios(payload: barriosInterfaces): Observable<ApiResponse<boolean>> {
    return this.http.Post<ApiResponse<boolean>>(this.urlCreate, payload)
      .pipe(catchError(error =>  throwError(() => error)));
  }
}
