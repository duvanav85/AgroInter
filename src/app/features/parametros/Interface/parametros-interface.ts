import { PaginationFilter } from "src/app/core/models/dto/apiresponse.interface";

export interface ParametrosInterface
{
  parametro?        : number;
  nombreParametro?  : string;
}

export interface parametrosFilter extends PaginationFilter {
  parametro?        : number;
  nombreParametro?  : string;
}
