import { BehaviorSubject, Observable, catchError, delay, of, throwError } from 'rxjs';
import { Injectable } from '@angular/core';
//Services
import { BaseService } from '../../../core/services/base.service';
//Interfaces
import { asgvisitaInterface, asgvisitaFilter } from '../interface/asg-visitas-interface';
import { ApiResponse, CustomPagedResponse } from '../../../core/models/dto/apiresponse.interface';

@Injectable({
  providedIn: 'root'
})

export class asgvisitaService
{
  private urlGetAll   = 'Visita/GetAll';
  private urlCreate   = 'Visita/Create';
  private urlUpdate   = 'Visita/Update'

  private _visita = new BehaviorSubject<CustomPagedResponse<asgvisitaInterface>>({ data: [], pageNumber: 1, pageSize: 5 })
  public readonly visita = this._visita.asObservable();

  constructor(private http: BaseService) { }

  private dummyItems: asgvisitaInterface[] = [
    {idTicket: 1, fecha_visita:'2024-06-01', idTecnico: 101, nro_convenio: 1001, fecha_agenda: '2024-06-05'},
    {idTicket: 2, fecha_visita:'2024-06-02', idTecnico: 102, nro_convenio: 1002, fecha_agenda: '2024-06-06'},
    {idTicket: 3, fecha_visita:'2024-06-03', idTecnico: 103, nro_convenio: 1003, fecha_agenda: '2024-06-07'},
    {idTicket: 4, fecha_visita:'2024-06-04', idTecnico: 104, nro_convenio: 1004, fecha_agenda: '2024-06-08'},
    {idTicket: 5, fecha_visita:'2024-06-05', idTecnico: 105, nro_convenio: 1005, fecha_agenda: '2024-06-09'}
  ];

  getAllAsgVisita(filters: asgvisitaFilter): Observable<CustomPagedResponse<asgvisitaInterface>> {
      const response: CustomPagedResponse<asgvisitaInterface> = {
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

    // getAllAsgVisita(filters: asgvisitaFilter): Observable<CustomPagedResponse<asgvisitaInterface>> {
    //   return this.http.Post<CustomPagedResponse<asgvisitaInterface>>(this.urlGetAll, filters)
    //     .pipe(catchError(error =>  throwError(() => error)));
    // }

    updateAsgVisita(Visita: CustomPagedResponse<asgvisitaInterface>): void {
      this._visita.next(Visita);
    }

    updateAsgVisitas(payload: asgvisitaInterface): Observable<ApiResponse<boolean>> {
      return this.http.Post<ApiResponse<boolean>>(this.urlUpdate, payload)
        .pipe(catchError(error =>  throwError(() => error)));
    }

    createAsgVisita(payload: asgvisitaInterface): Observable<ApiResponse<boolean>> {
      return this.http.Post<ApiResponse<boolean>>(this.urlCreate, payload)
        .pipe(catchError(error =>  throwError(() => error)));
    }

}
