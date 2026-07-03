import { BehaviorSubject, Observable, catchError, delay, of, throwError } from 'rxjs';
import { Injectable } from '@angular/core';
//Services
import { BaseService } from '../../../core/services/base.service';
//Interfaces
import { zonasInterface, zonasFilter } from '../interface/zonas-interface';
import { ApiResponse, CustomPagedResponse } from '../../../core/models/dto/apiresponse.interface';

@Injectable({
  providedIn: 'root'
})
export class zonasService {

  private urlGetAll   = 'Zonas/GetAll';
  private urlCreate   = 'Zonas/Create';
  private urlUpdate   = 'Zonas/Update'

  private _zonas = new BehaviorSubject<CustomPagedResponse<zonasInterface>>({ data: [], pageNumber: 1, pageSize: 5 })
  public readonly zonas = this._zonas.asObservable();

  constructor(private http: BaseService) { }

   private dummyItems: zonasInterface[] = [
    { idzona: 1, idbarrio: 1, descripcion: 'Calazan' },
    { idzona: 2, idbarrio: 1, descripcion: 'Robledo' },
    { idzona: 3, idbarrio: 1, descripcion: 'Belen' },
    { idzona: 4, idbarrio: 1, descripcion: 'Poblado' },
    { idzona: 5, idbarrio: 1, descripcion: 'Laureles' },
  ];

  getAllZonas(filters: zonasFilter): Observable<CustomPagedResponse<zonasInterface>> {
    const response: CustomPagedResponse<zonasInterface> = {
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

  // getAllZonas(filters: zonasFilter): Observable<CustomPagedResponse<zonasInterface>> {
  //   return this.http.Post<CustomPagedResponse<zonasInterface>>(this.urlGetAll, filters)
  //     .pipe(catchError(error =>  throwError(() => error)));
  // }

  updateZonas(Zonas: CustomPagedResponse<zonasInterface>): void {
    this._zonas.next(Zonas);
  }

  updateZona(payload: zonasInterface): Observable<ApiResponse<boolean>> {
    return this.http.Post<ApiResponse<boolean>>(this.urlUpdate, payload)
      .pipe(catchError(error =>  throwError(() => error)));
  }

  createZonas(payload: zonasInterface): Observable<ApiResponse<boolean>> {
    return this.http.Post<ApiResponse<boolean>>(this.urlCreate, payload)
      .pipe(catchError(error =>  throwError(() => error)));
  }
}
