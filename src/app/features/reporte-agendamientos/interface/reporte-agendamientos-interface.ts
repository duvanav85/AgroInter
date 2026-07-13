import { PaginationFilter } from "src/app/core/models/dto/apiresponse.interface";

export interface reporteAgendamientoInterface
{
  semaforo?:              string,
  idTicket?:              number,
  estado_ticket?:         string,
  fecha_visita?:          string,
  idTecnico?:             number,
  nro_convenio?:          number,
  fecha_agenda?:          string,
  horario_agenda?:        string,
  idpropietario?:         number,
  iddepartamento?:        number,
  idmunicipio?:           number,
  idvereda?:              number,
  idpredio?:              number,
  idtipo_cultivo?:        number,
}

export interface allreporteAgendamientoInterface
{
  semaforo?:              string,
  idTicket?:              number,
  estado_ticket?:         string,
  fecha_visita?:          string,
  idTecnico?:             number,
  nro_convenio?:          number,
  nombre_tecnico?:        string,
  apellido_tecnico?:      string,
  fecha_agenda?:          string,
  horario_agenda?:        string,
  id_productor?:          number,
  nombre_productor?:      string,
  apellido_productor?:    string,
  tipo_documento?:        number,
  celular?:               string,
  correo?:                string,
  departamento?:          string,
  direccion?:             string,
  municipio?:             number,
  vereda?:                number,
  nombre_predio?:         string,
  cultivo?:               string,
  solicitud?:             string,
}

export interface reporteAgendamientoFilter extends PaginationFilter
{
  idpropietario?:     number,
  idtipo_cultivo?:    number,
  idTicket?:          number,
  fecha_visita?:      string,
  idTecnico?:         number,
  estado_ticket?:     string,
  semaforo?:          string,
  municipio?:         number,
  vereda?:             number,
}
