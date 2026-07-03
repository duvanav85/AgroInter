import { PaginationFilter } from "src/app/core/models/dto/apiresponse.interface"

export interface tiposCiiuInterface
{
  id_ciiu?:       number,
  division?:      string,
  grupo?:         string,
  clase?:         string,
  descripcion?:   string
}

export interface tiposCiiuFilter extends PaginationFilter
{
  division?:      string,
  grupo?:         string,
  clase?:         string,
  descripcion?:   string
}
