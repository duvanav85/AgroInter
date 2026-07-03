import { PaginationFilter } from "src/app/core/models/dto/apiresponse.interface";

export interface zonasInterface
{
  idzona?:       number,
  idbarrio?:     number,
  descripcion?:  string,
}

export interface zonasFilter extends PaginationFilter
{
  idzona?:       number,
  idbarrio?:     number,
  descripcion?:  string,
}
