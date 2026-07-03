import { PaginationFilter } from "src/app/core/models/dto/apiresponse.interface";

export interface sectoresInterface
{
  idsector?:        number,
  nombre?:          string,
  descripcion?:     string,
  codsector?:       string,
  activo?:          boolean,
}

export interface sectoresFilter extends PaginationFilter
{
  nombre?:          string,
  descripcion?:     string,
  codsector?:       string,
  activo?:          boolean,
}
