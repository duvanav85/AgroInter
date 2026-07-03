import { PaginationFilter } from "src/app/core/models/dto/apiresponse.interface";

export interface asgvisitaInterface
{
  visitaid?:        string,
  idTicket?:        number,
  fecha_visita?:    string,
  idTecnico?:       number,
  nro_convenio?:    number,
  fecha_agenda?:    string,
}

export interface asgvisitaFilter extends PaginationFilter
{
  visitaid?:        string,
  idTicket?:        number,
  fecha_visita?:    string,
  idTecnico?:       number,
  nro_convenio?:    number,
  fecha_agenda?:    string,
}
