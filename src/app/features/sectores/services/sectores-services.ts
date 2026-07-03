import { BehaviorSubject, Observable, catchError, delay, of, throwError } from 'rxjs';
import { Injectable } from '@angular/core';
//Services
import { BaseService } from '../../../core/services/base.service';
//Interfaces
import { sectoresInterface, sectoresFilter } from '../interface/sectores-interface';
import { ApiResponse, CustomPagedResponse } from '../../../core/models/dto/apiresponse.interface';

@Injectable({
  providedIn: 'root'
})
export class sectoresService {

  private urlGetAll   = 'Sectores/GetAll';
  private urlCreate   = 'Sectores/Create';
  private urlUpdate   = 'Sectores/Update'

  private _sectores = new BehaviorSubject<CustomPagedResponse<sectoresInterface>>({ data: [], pageNumber: 1, pageSize: 5 })
  public readonly sectores = this._sectores.asObservable();

  constructor(private http: BaseService) { }

   private dummyItems: sectoresInterface[] = [
    { idsector: 1, nombre:'Agropecuario', descripcion: 'engloba a la actividad agricola y la actividad ganadera o pecuaria, explotaciòn o cosecha de bosques', codsector: '01', activo: true },
    { idsector: 1, nombre:'Industrial', descripcion: 'actividades que tienen como finalidad transformar las materias primas en productos elaborados', codsector: '02', activo: true},
    { idsector: 1, nombre:'Servicios', descripcion: 'todas aquellas actividades identificables, intangibles, que se concibe para proporcionar la satisfacción de necesidades de los consumidores', codsector: '03', activo: true},
    { idsector: 1, nombre:'Comercio', descripcion: 'comercio de bienes de capital y bienes de utilización intermedia propios, sin transformación, nuevos o usados.', codsector: '04', activo: false },
    { idsector: 1, nombre:'transporte', descripcion: 'incluye todos los medios e infraestructuras implicados en el movimiento de las personas o bienes. así como los servicios de recepción. entrega y manipulación de tales bienes.', codsector: '05', activo: false},
  ];

  getAllSectores(filters: sectoresFilter): Observable<CustomPagedResponse<sectoresInterface>> {
    const response: CustomPagedResponse<sectoresInterface> = {
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

  // getAllSectores(filters: sectoresFilter): Observable<CustomPagedResponse<sectoresInterface>> {
  //   return this.http.Post<CustomPagedResponse<sectoresInterface>>(this.urlGetAll, filters)
  //     .pipe(catchError(error =>  throwError(() => error)));
  // }

  updateSector(Sectores: CustomPagedResponse<sectoresInterface>): void {
    this._sectores.next(Sectores);
  }

  updateSectores(payload: sectoresInterface): Observable<ApiResponse<boolean>> {
    return this.http.Post<ApiResponse<boolean>>(this.urlUpdate, payload)
      .pipe(catchError(error =>  throwError(() => error)));
  }

  createSectores(payload: sectoresInterface): Observable<ApiResponse<boolean>> {
    return this.http.Post<ApiResponse<boolean>>(this.urlCreate, payload)
      .pipe(catchError(error =>  throwError(() => error)));
  }
}
