import { PaginationFilter } from "src/app/core/models/dto/apiresponse.interface";

export interface fincaInterface
{
  predioid?:            string,
  identificacion?:      number,
  nombre_propietario?:  string,
  telefono?:            number,
  direccion?:           string,
  idMunicipio?:         number,
  vereda?:              number,
  area?:                number,
  sistema_Productivo?:  string,
  variedad?:            string,
  desindad_Siembra?:    string,
  distribucion_planta?: string,
  nro_Arboles?:         number,
  registro_ICA?:        number,
  gobal_Gap?:           number,
  rainforest?:          number,
  certificadoXX?:       number,
  certificadoYY?:       number,
}


export interface fincaFilter extends PaginationFilter
{
  identificacion?:      number,
  nombre_propietario?:  string,
  idMunicipio?:         number,
  vereda?:              number,
  area?:                number,
  nro_Arboles?:         number,
  registro_ICA?:        number,
  gobal_Gap?:           number,
  rainforest?:          number,
  certificadoXX?:       number,
  certificadoYY?:       number,
}
