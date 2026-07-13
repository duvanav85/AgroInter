import { BehaviorSubject, Observable, catchError, delay, of, throwError } from 'rxjs';
import { Injectable } from '@angular/core';
//Services
import { BaseService } from '../../../core/services/base.service';
//Interfaces
import { reporteAgendamientoInterface, reporteAgendamientoFilter, allreporteAgendamientoInterface } from '../interface/reporte-agendamientos-interface';
import { ApiResponse, CustomPagedResponse } from '../../../core/models/dto/apiresponse.interface';

@Injectable({
  providedIn: 'root'
})

export class reporteAgendamientosService
{
  private urlGetAll   = 'ReporteAgendamiento/GetAll';
  private urlCreate   = 'ReporteAgendamiento/Create';
  private urlUpdate   = 'ReporteAgendamiento/Update'

  private _visita = new BehaviorSubject<CustomPagedResponse<reporteAgendamientoInterface>>({ data: [], pageNumber: 1, pageSize: 5 })
  public readonly visita = this._visita.asObservable();

  constructor(private http: BaseService) { }

  private dummyItems: allreporteAgendamientoInterface[] = [
    {semaforo: 'verde', idTicket: 1, estado_ticket: 'abierto', fecha_visita:'2024-06-01', idTecnico: 101, nro_convenio: 1001, nombre_tecnico: 'Juan', apellido_tecnico: 'Perez', fecha_agenda: '2024-06-05', horario_agenda: '10:00', id_productor: 201, nombre_productor: 'Carlos', apellido_productor: 'Gomez', tipo_documento: 1, celular: '1234567890', correo: 'carlos.gomez@example.com'},
    {semaforo: 'amarillo', idTicket: 2, estado_ticket: 'en_progreso', fecha_visita:'2024-06-02', idTecnico: 102, nro_convenio: 1002, nombre_tecnico: 'Maria', apellido_tecnico: 'Lopez', fecha_agenda: '2024-06-06', horario_agenda: '11:00', id_productor: 202, nombre_productor: 'Ana', apellido_productor: 'Rodriguez', tipo_documento: 2, celular: '0987654321', correo: 'ana.rodriguez@example.com'},
    {semaforo: 'rojo', idTicket: 3, estado_ticket: 'cerrado', fecha_visita:'2024-06-03', idTecnico: 103, nro_convenio: 1003, nombre_tecnico: 'Luis', apellido_tecnico: 'Martinez', fecha_agenda: '2024-06-07', horario_agenda: '12:00', id_productor: 203, nombre_productor: 'Pedro', apellido_productor: 'Garcia', tipo_documento: 1, celular: '1111111111', correo: 'pedro.garcia@example.com'},
    {semaforo: 'verde', idTicket: 4, estado_ticket: 'abierto', fecha_visita:'2024-06-04', idTecnico: 104, nro_convenio: 1004, nombre_tecnico: 'Sofia', apellido_tecnico: 'Hernandez', fecha_agenda: '2024-06-08', horario_agenda: '13:00', id_productor: 204, nombre_productor: 'Laura', apellido_productor: 'Sanchez', tipo_documento: 2, celular: '2222222222', correo: 'laura.sanchez@example.com'},
    {semaforo: 'amarillo', idTicket: 5, estado_ticket: 'en_progreso', fecha_visita: '2024-06-05', idTecnico: 105, nro_convenio: 1005, nombre_tecnico: 'Diego', apellido_tecnico: 'Torres', fecha_agenda: '2024-06-09', horario_agenda: '14:00', id_productor: 205, nombre_productor: 'Elena', apellido_productor: 'Vargas', tipo_documento: 1, celular: '3333333333', correo: 'elena.vargas@example.com'},
  ];

  getAllReporteAgendamientos(filters: reporteAgendamientoFilter): Observable<CustomPagedResponse<reporteAgendamientoInterface>> {
      const response: CustomPagedResponse<reporteAgendamientoInterface> = {
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

    // getAllReporteAgendamientos(filters: reporteAgendamientoFilter): Observable<CustomPagedResponse<reporteAgendamientoInterface>> {
    //   return this.http.Post<CustomPagedResponse<reporteAgendamientoInterface>>>(this.urlGetAll, filters)
    //     .pipe(catchError(error =>  throwError(() => error)));
    // }

    updateReporteAgendamientos(Visita: CustomPagedResponse<reporteAgendamientoInterface>): void {
      this._visita.next(Visita);
    }

    updateReporteAgendamiento(payload: reporteAgendamientoInterface): Observable<ApiResponse<boolean>> {
      return this.http.Post<ApiResponse<boolean>>(this.urlUpdate, payload)
        .pipe(catchError(error =>  throwError(() => error)));
    }

    createReporteAgendamiento(payload: reporteAgendamientoInterface ): Observable<ApiResponse<boolean>> {
      return this.http.Post<ApiResponse<boolean>>(this.urlCreate, payload)
        .pipe(catchError(error =>  throwError(() => error)));
    }

}
