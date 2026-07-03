import { PaginationFilter } from "src/app/core/models/dto/apiresponse.interface";

export interface visitaInterface
{
  visitaId?:        string,
  idAVisita?:       number,
  edo_ticket?:      string,
  productorId?:     number,
  idPredio?:        number,
  idDepartamento?:  number,
  idMunicipio?:     number,
  idVereda?:        number,
  Direccion?:       string,
  idTipoCultivo?:   number,
  requerimiento?:   number,
  adjunto?:         string,
  adjunto1?:        string,
  adjunto2?:        string,
}

export interface visitaFilter extends PaginationFilter
{
  edo_ticket?:      string,
  productorId?:     number,
  idPredio?:        number,
  idVereda?:        number,
  idDepartamento?:  number,
  idMunicipio?:     number,
  Direccion?:       string,
  idTipoCultivo?:   number,
}
