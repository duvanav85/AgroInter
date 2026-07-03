import { PaginationFilter } from "src/app/core/models/dto/apiresponse.interface";

export interface clientesInterface
{
  idCliente?:            number,
  clienteId?:            string,
  cedula?:               number,
  digito?:               number,
  nombre?:               string,
  apellidos?:            string,
  idtipo_iden?:          number,
  idtipo_contacto?:      number,
  idtipo_ciiu?:          number,
  idagencia?:            number,
  idejec_cuenta?:        number,
  idzona?:               number,
  idtipo_tercero?:       number,
  gran_contribuyente?:   boolean,
  autoretenedor?:        boolean,
  email?:                string,
  email1?:               string,
  email2?:               string,
  foto?:                 string,
}

export interface clientesFilter extends PaginationFilter
{
  cedula?:               number,
  nombre?:               string,
  apellidos?:            string,
  idtipo_iden?:          number,
  idtipo_contacto?:      number,
  idtipo_ciiu?:          number,
  idagencia?:            number,
  idejec_cuenta?:        number,
  idzona?:               number,
  idtipo_tercero?:       number,
  gran_contribuyente?:   boolean,
  autoretenedor?:        boolean,
}
