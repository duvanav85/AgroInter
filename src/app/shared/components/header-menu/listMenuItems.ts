export const listMenuItems : any[] = [
  {
    name: "parametros", icon: "settings_outline",
    children: [
      { name: "Parametros"            , link: "/Parametro" },
      { name: "Detalles de Parametros", link: "/detallesParametros" },
      { name: "Paises"                , link: "/Paises" },
      { name: "Departamentos"         , link: "/Departamentos" },
      { name: "Ciudades"              , link: "/Ciudades" },
      { name: "Barrios"               , link: "/Barrios" },
      { name: "Veredas"               , link: "/Veredas" },
      { name: "Zonas"                 , link: "/Zonas" },
      { name: "Clientes"              , link: "/Clientes" },
      { name: "Tipos CIIU"            , link: "/TiposCiiu" },
      { name: "Sectores"              , link: "/Sectores" }
    ]
  },
  {
    name: "Gestion Visitas", icon: "fact_check_outlined",
    children: [
      { name: "Tecnico"                 , link: "/Tecnico" },
      { name: "Finca"                   , link: "/Finca" },
      { name: "Asignación de Visitas"   , link: "/AsignacionVisitas" },
      { name: "Visita"                  , link: "/Visitas" },
      { name: "Reporte de Agendamiento" , link: "/ReporteAgendamientos" },
      { name: "Indicadores"             , link: "/courtesy-ticket" }
    ]
  },
  {
    name: "Seguridad", icon: "add_moderator",
    children: [
      { name: "Empresa"                 , link: "/airports" },
      { name: "Nivel de Seguridad"      , link: "/causes" },
      { name: "Aplicaciones"            , link: "/classes" },
      { name: "Niveles de Aplicación"   , link: "/configExTcks" },
      { name: "Usuarios"                , link: "/accounts" },
      { name: "Usuario Nivel Aplicación", link: "/sub-accounts" }
    ]
  }
]
