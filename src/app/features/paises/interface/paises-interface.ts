import { PaginationFilter } from "../../../core/models/dto/apiresponse.interface";

export interface paisesInterface
{
  idpais?            : number;
  paisid?            : string;
  codigo?            : string;
  id_DIAN?           : string;
  descripcion?       : string;
  CreationDate?      : Date;
  ModificationDate?  : Date;
  Active?            : boolean;
}

export interface paisesFilter extends PaginationFilter {
  paisid?       : string;
  codigo?       : string;
  id_DIAN?      : string;
  descripcion?  : string;
  Active?       : boolean;
}
