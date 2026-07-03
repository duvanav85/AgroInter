import { BehaviorSubject, Observable, catchError, delay, of, throwError } from 'rxjs';
import { Injectable } from '@angular/core';
//Services
import { BaseService } from '../../../core/services/base.service';
//Interfaces
import { tiposCiiuInterface, tiposCiiuFilter } from '../interface/tipos-ciiu-interface';
import { ApiResponse, CustomPagedResponse } from '../../../core/models/dto/apiresponse.interface';

@Injectable({
  providedIn: 'root'
})
export class tiposCiiuService {

  private urlGetAll   = 'TiposCiiu/GetAll';
  private urlCreate   = 'TiposCiiu/Create';
  private urlUpdate   = 'TiposCiiu/Update'

  private _tiposCiiu = new BehaviorSubject<CustomPagedResponse<tiposCiiuInterface>>({ data: [], pageNumber: 1, pageSize: 5 })
  public readonly tiposCiiu = this._tiposCiiu.asObservable();

  constructor(private http: BaseService) { }

   private dummyItems: tiposCiiuInterface[] = [
     { division:'01', grupo:'011', clase:'0111', descripcion:'Cultivo de cereales (excepto arroz), legumbres y semillas oleaginosas' },
     { division:'01', grupo:'011', clase:'0112', descripcion:'Cultivo de arroz' },
     { division:'01', grupo:'011', clase:'0113', descripcion:'Cultivo de hortalizas, raíces y tubérculos' },
     { division:'01', grupo:'011', clase:'0114', descripcion:'Cultivo de tabaco' },
     { division:'01', grupo:'011', clase:'0115', descripcion:'Cultivo de plantas textiles' },
  ];

  getAllTiposCiiu(filters: tiposCiiuFilter): Observable<CustomPagedResponse<tiposCiiuInterface>> {
    const response: CustomPagedResponse<tiposCiiuInterface> = {
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

  // getAllTiposCiiu(filters: tiposCiiuFilter): Observable<CustomPagedResponse<tiposCiiuInterface>> {
  //   return this.http.Post<CustomPagedResponse<tiposCiiuInterface>>(this.urlGetAll, filters)
  //     .pipe(catchError(error =>  throwError(() => error)));
  // }

  updateTiposCiiu(tiposCiiu: CustomPagedResponse<tiposCiiuInterface>): void {
    this._tiposCiiu.next(tiposCiiu);
  }

  updateTiposCiius(payload: tiposCiiuInterface): Observable<ApiResponse<boolean>> {
    return this.http.Post<ApiResponse<boolean>>(this.urlUpdate, payload)
      .pipe(catchError(error =>  throwError(() => error)));
  }

  createTiposCiiu(payload: tiposCiiuInterface): Observable<ApiResponse<boolean>> {
    return this.http.Post<ApiResponse<boolean>>(this.urlCreate, payload)
      .pipe(catchError(error =>  throwError(() => error)));
  }
}
