import { BehaviorSubject, Observable, catchError, delay, of, throwError } from 'rxjs';
import { Injectable } from '@angular/core';
//Services
import { BaseService } from '../../../core/services/base.service';
//Interfaces
import { departamentosInterface, departamentosFilter } from '../interface/departamentos-interface';
import { ApiResponse, CustomPagedResponse } from '../../../core/models/dto/apiresponse.interface';

@Injectable({
  providedIn: 'root'
})
export class departamentosService {

  private urlGetAll   = 'Departamentos/GetAll';
  private urlCreate   = 'Departamentos/Create';
  private urlUpdate   = 'Departamentos/Update'

  private _departamentos = new BehaviorSubject<CustomPagedResponse<departamentosInterface>>({ data: [], pageNumber: 1, pageSize: 5 })
  public readonly departamentos = this._departamentos.asObservable();

  constructor(private http: BaseService) { }
  private dummyItems:departamentosInterface[] = [
    {departamentoid: "1", codigo: "001", departamento: "Atlántico", idpais: "001", active: false},
    {departamentoid: "2", codigo: "002", departamento: "Antioquia", idpais: "001", active: false},
    {departamentoid: "3", codigo: "003", departamento: "Arauca",    idpais: "001", active: false},
    {departamentoid: "4", codigo: "004", departamento: "Bolívar",   idpais: "001", active: true},
    {departamentoid: "5", codigo: "005", departamento: "Boyacá",    idpais: "001", active: true},
  ];

  getAllDepartamentos(filters: departamentosFilter): Observable<CustomPagedResponse<departamentosInterface>> {
    const response: CustomPagedResponse<departamentosInterface> = {
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

  // getAllDepartamentos(filters: departamentosFilter): Observable<CustomPagedResponse<departamentosInterface>> {
  //   return this.http.Post<CustomPagedResponse<departamentosInterface>>(this.urlGetAll, filters)
  //     .pipe(catchError(error =>  throwError(() => error)));
  // }

  updateDepartamentos(Departamentos: CustomPagedResponse<departamentosInterface>): void {
    this._departamentos.next(Departamentos);
  }

  updateDepartamento(payload: departamentosInterface): Observable<ApiResponse<boolean>> {
    return this.http.Post<ApiResponse<boolean>>(this.urlUpdate, payload)
      .pipe(catchError(error =>  throwError(() => error)));
  }

  createDepartamentos(payload: departamentosInterface): Observable<ApiResponse<boolean>> {
    return this.http.Post<ApiResponse<boolean>>(this.urlCreate, payload)
      .pipe(catchError(error =>  throwError(() => error)));
  }
}
