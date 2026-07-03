import { BehaviorSubject, Observable, catchError, delay, of, throwError } from 'rxjs';
import { Injectable } from '@angular/core';
//Services
import { BaseService } from '../../../core/services/base.service';
//Interfaces
import { fincaInterface, fincaFilter } from '../interface/finca-interface';
import { ApiResponse, CustomPagedResponse } from '../../../core/models/dto/apiresponse.interface';

@Injectable({
  providedIn: 'root'
})
export class fincaService {

  private urlGetAll   = 'Finca/GetAll';
  private urlCreate   = 'Finca/Create';
  private urlUpdate   = 'Finca/Update'

  private _finca = new BehaviorSubject<CustomPagedResponse<fincaInterface>>({ data: [], pageNumber: 1, pageSize: 5 })
  public readonly finca = this._finca.asObservable();

  constructor(private http: BaseService) { }

  private dummyItems:fincaInterface[]= [
    {identificacion:71569480, nombre_propietario: "Jarol Vargas", telefono: 3005891236 , direccion:'Carrear 88B 125 - 36', idMunicipio:16, vereda:1, area:100, sistema_Productivo:"Nuevo", variedad:"Unica", desindad_Siembra: "Alta", distribucion_planta:"Local", nro_Arboles: 150, registro_ICA:152636, gobal_Gap:2, rainforest:1, certificadoXX:100 , certificadoYY:100 },
    {identificacion:1125236036, nombre_propietario: "Maria Cardenas", telefono: 3268591562 , direccion:'Carrear 95C 125 - 26', idMunicipio:16, vereda:1, area:100, sistema_Productivo:"Nuevo", variedad:"Unica", desindad_Siembra: "Alta", distribucion_planta:"Local", nro_Arboles: 150, registro_ICA:152636, gobal_Gap:2, rainforest:1, certificadoXX:100 , certificadoYY:100 },
    {identificacion:1202202342, nombre_propietario: "Juaquin Rendon", telefono: 3106532596 , direccion:'Carrear 90A 13 - 54', idMunicipio:16, vereda:1, area:100, sistema_Productivo:"Nuevo", variedad:"Unica", desindad_Siembra: "Alta", distribucion_planta:"Local", nro_Arboles: 150, registro_ICA:152636, gobal_Gap:2, rainforest:1, certificadoXX:100 , certificadoYY:100 },
    {identificacion:1011425365, nombre_propietario: "Cirstian Alvarez", telefono: 3206313642 , direccion:'Carrear 76B 12 - 136', idMunicipio:16, vereda:1, area:100, sistema_Productivo:"Nuevo", variedad:"Unica", desindad_Siembra: "Alta", distribucion_planta:"Local", nro_Arboles: 150, registro_ICA:152636, gobal_Gap:2, rainforest:1, certificadoXX:100 , certificadoYY:100 },
    {identificacion:78369112, nombre_propietario: "Neson Osorio", telefono: 3158253669 , direccion:'Carrear 11D 42 - 66', idMunicipio:16, vereda:1, area:100, sistema_Productivo:"Nuevo", variedad:"Unica", desindad_Siembra: "Alta", distribucion_planta:"Local", nro_Arboles: 150, registro_ICA:152636, gobal_Gap:2, rainforest:1, certificadoXX:100 , certificadoYY:100 },

  ];

  getAllFinca(filters: fincaFilter): Observable<CustomPagedResponse<fincaInterface>> {
    const response: CustomPagedResponse<fincaInterface> = {
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

  updateFinca(Finca: CustomPagedResponse<fincaInterface>): void {
    this._finca.next(Finca);
  }

  updateFincas(payload: fincaInterface): Observable<ApiResponse<boolean>> {
    return this.http.Post<ApiResponse<boolean>>(this.urlUpdate, payload)
      .pipe(catchError(error =>  throwError(() => error)));
  }

  createFinca(payload: fincaInterface): Observable<ApiResponse<boolean>> {
    return this.http.Post<ApiResponse<boolean>>(this.urlCreate, payload)
      .pipe(catchError(error =>  throwError(() => error)));
  }
}
