import { PaginationFilter } from "../../../core/models/dto/apiresponse.interface";

export interface DetalleParametrosInterface
{
  idparametro?   : number;
  idregistro?    : number;
  descripcion?   : string;
  activo?        : boolean;
}

export interface DetalleParametrosFilter extends PaginationFilter {
  idparametro?        : number;
  idregistro?          : number;
  descripcion?        : string;
  activo?             : boolean;
}
