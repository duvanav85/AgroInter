import { BehaviorSubject, Observable, catchError, delay, of, throwError } from 'rxjs';
import { Injectable } from '@angular/core';
//Services
import { BaseService } from '../../../core/services/base.service';
//Interfaces
import { visitaInterface, visitaFilter } from '../interface/visita-interface';
import { ApiResponse, CustomPagedResponse } from '../../../core/models/dto/apiresponse.interface';

@Injectable({
  providedIn: 'root'
})

export class visitaService {

  private urlGetAll   = 'Visita/GetAll';
  private urlCreate   = 'Visita/Create';
  private urlUpdate   = 'Visita/Update'

  private _visita = new BehaviorSubject<CustomPagedResponse<visitaInterface>>({ data: [], pageNumber: 1, pageSize: 5 })
  public readonly visita = this._visita.asObservable();

  constructor(private http: BaseService) { }

   private dummyItems: visitaInterface[] = [
    {visitaId:'01', idAVisita: 1, edo_ticket:'Pendiente Agenda', productorId:1022, idPredio: 1, idDepartamento: 1, idMunicipio: 2 , idVereda: 1, Direccion: 'Muy lejos jajaja', idTipoCultivo:1},
    {visitaId:'02', idAVisita: 2, edo_ticket:'Pendiente Agenda', productorId:1023, idPredio: 1, idDepartamento: 1, idMunicipio: 2 , idVereda: 1, Direccion: 'Muy serca jajaja', idTipoCultivo:1},
    {visitaId:'03', idAVisita: 3, edo_ticket:'Pendiente Agenda', productorId:1024, idPredio: 1, idDepartamento: 1, idMunicipio: 2 , idVereda: 1, Direccion: 'Muy allá jajaja', idTipoCultivo:1},
    {visitaId:'04', idAVisita: 4, edo_ticket:'Pendiente Agenda', productorId:1026, idPredio: 1, idDepartamento: 1, idMunicipio: 2 , idVereda: 1, Direccion: 'Muy pronto jajaja', idTipoCultivo:1},
    {visitaId:'05', idAVisita: 5, edo_ticket:'Pendiente Agenda', productorId:1029, idPredio: 1, idDepartamento: 1, idMunicipio: 2 , idVereda: 1, Direccion: 'Muy jajaja', idTipoCultivo:1},
  ];

  getAllVisita(filters: visitaFilter): Observable<CustomPagedResponse<visitaInterface>> {
    const response: CustomPagedResponse<visitaInterface> = {
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

  // getAllVisita(filters: visitaFilter): Observable<CustomPagedResponse<visitaInterface>> {
  //   return this.http.Post<CustomPagedResponse<visitaInterface>>(this.urlGetAll, filters)
  //     .pipe(catchError(error =>  throwError(() => error)));
  // }

  updateVisita(Visita: CustomPagedResponse<visitaInterface>): void {
    this._visita.next(Visita);
  }

  updateVisitas(payload: visitaInterface): Observable<ApiResponse<boolean>> {
    return this.http.Post<ApiResponse<boolean>>(this.urlUpdate, payload)
      .pipe(catchError(error =>  throwError(() => error)));
  }

  createVisita(payload: visitaInterface): Observable<ApiResponse<boolean>> {
    return this.http.Post<ApiResponse<boolean>>(this.urlCreate, payload)
      .pipe(catchError(error =>  throwError(() => error)));
  }
}
