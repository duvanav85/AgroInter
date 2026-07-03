import { PaginationFilter } from "src/app/core/models/dto/apiresponse.interface";

export interface veredasInterface
{
  idvereda?         : number,
  nombre_vereda?    : string,
  iddepartamento?   : number,
  idciudad?         : number,
  area_ha?          : number,
  poblacion?        : number,
}

export interface veredasFilter extends PaginationFilter
{
  idvereda?         : number,
  nombre_vereda?    : string,
  iddepartamento?   : number,
  idciudad?         : number,
  area_ha?          : number,
  poblacion?        : number,
}
