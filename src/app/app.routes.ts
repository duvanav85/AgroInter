import { Routes } from '@angular/router';
import { DashboardLayoutComponent } from './shared/components/dashboard-layout/dashboard-layout.component';
import { AuthComponents } from './shared/components/auth/auth.components';
import { authGuard } from  './shared/components/auth/auth.guard' ;
import { ParametroComponents } from './features/parametros/components/parametro.components';
import { DetallesParametrosComponente } from './features/detalles-parametros/components/detalles-parametros.componente';
import { PaisesComponents } from './features/paises/components/paises.components';
import { DepartamentosComponents } from './features/departamentos/departamentos.components';
import { CiudadesComponents } from './features/ciudades/components/ciudades.components';
import { BarriosComponents } from './features/barrios/components/barrios.components';
import { ZonasComponents } from './features/zonas/components/zonas.components';
import { TiposCiiuComponents } from './features/tipos-ciiu/components/tipos-ciiu.components';
import { SectoresComponents } from './features/sectores/components/sectores.components';
import { TecnicoComponents } from './features/tecnico/components/tecnico.components';
import { FincaComponents } from './features/finca/components/finca.components';
import { ClientesComponents } from './features/clientes/components/clientes.components';
import { VisitaComponents } from './features/visita/components/visita.components';
import { VeredasComponents } from './features/veredas/components/veredas.components';
import { AsignacionVisitasComponents } from './features/asignacion-visitas/components/asignacion-visitas.components';

export const routes: Routes = [
  { path: "auth", component: AuthComponents, pathMatch: 'full' },
  {
    path: "", component: DashboardLayoutComponent,
    canActivate: [authGuard],
    children: [
      { path: "Parametro", component: ParametroComponents },
      { path: "detallesParametros",component: DetallesParametrosComponente, pathMatch: 'full' },
      { path: "Paises", component: PaisesComponents, pathMatch: 'full'},
      { path: "Departamentos", component: DepartamentosComponents, pathMatch: 'full'},
      { path: "Ciudades", component: CiudadesComponents, pathMatch: 'full'},
      { path: "Barrios", component: BarriosComponents, pathMatch: 'full'},
      { path: "Veredas", component: VeredasComponents, pathMatch: 'full'},
      { path: "Zonas", component: ZonasComponents, pathMatch: 'full'},
      { path: "Clientes", component: ClientesComponents, pathMatch: 'full'},
      { path: "TiposCiiu", component: TiposCiiuComponents, pathMatch: 'full'},
      { path: "Sectores",  component: SectoresComponents, pathMatch: 'full'},
      { path: "Tecnico", component: TecnicoComponents, pathMatch: 'full'},
      { path: "Finca",  component: FincaComponents, pathMatch: 'full'},
      { path: "AsignacionVisitas",  component: AsignacionVisitasComponents, pathMatch: 'full'},
      { path: "Visitas",  component: VisitaComponents, pathMatch: 'full'}
    ]
  },
  { path: "*", redirectTo: "", },
];
