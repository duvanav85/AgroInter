import { PaginationFilter } from "src/app/core/models/dto/apiresponse.interface";

export interface tecnicoInterface
{
  idtecnico?:           string,
  identificacion?:      number,
  idtipo_tecnico?:      number,
  tarjeta_profecional?: number,
  nombre_tecnico?:      string,
  correo?:              string,
  telefono?:            number,
}

export interface tecnicoFilter extends PaginationFilter
{
  idtecnico?:           string,
  identificacion?:      number,
  idtipo_tecnico?:      number,
  tarjeta_profecional?: number,
}
