import { PaginationFilter } from "src/app/core/models/dto/apiresponse.interface";

export interface ciudadesInterface{
  idciudad?        : number,
  iddepartamento?  : number,
  descripcion?		 : string,
}

export interface ciudadesFilter extends PaginationFilter
{
  idciudad?        : number,
  iddepartamento?  : number,
  descripcion?		 : string,
}
