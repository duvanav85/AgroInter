import { PaginationFilter } from "src/app/core/models/dto/apiresponse.interface"

export interface departamentosInterface {
  departamentoid? : string,
  codigo?         : string,
  departamento?   : string,
  idpais?         : string,
  active?          :boolean
}

export interface departamentosFilter extends PaginationFilter {
  departamentoid?  : string,
  codigo?          : string,
  departamento?    : string,
  idpais?          : string,
  active?          :boolean
}
