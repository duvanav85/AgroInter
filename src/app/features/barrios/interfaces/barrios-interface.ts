import { PaginationFilter } from "src/app/core/models/dto/apiresponse.interface";

export interface barriosInterfaces{
  idbarrio?:    number,
  idciudad?:    number,
  descripcion?: string,
}

export interface barriosFilter extends PaginationFilter{
  idbarrio?:    number,
  idciudad?:    number,
  descripcion?: string,
}
