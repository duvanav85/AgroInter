import { CommonModule, isPlatformBrowser } from '@angular/common';
import { Component, OnInit, OnDestroy, ViewChild, inject, signal, PLATFORM_ID } from '@angular/core';
import { compress, decompress } from 'compress-json';
import { FlatTreeControl } from '@angular/cdk/tree';
import { NavigationEnd, Router, RouterModule } from '@angular/router';
import { Subject, filter, takeUntil } from 'rxjs';

//Services
import { AlertService } from '../../../shared/services/Alert/alert.service';
//import { AuthenticationService } from '../../../core/services/authentication/authentication.service';
import { CookieService } from 'ngx-cookie-service';
import { cookieOptions } from '../../../shared/components/header-menu/cookieOptions';


//Enums
import { cookiesList } from '../../../shared/enums/cookiesList.enum';
//Const
import { listMenuItems } from './listMenuItems';

//component
import { NotExistComponent } from './not-exist/not-exist.component';

//Material
import { MatButtonModule } from '@angular/material/button';
import { MatDialog } from '@angular/material/dialog';
import { MatDividerModule } from '@angular/material/divider';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import { MatMenuModule } from '@angular/material/menu';
import { MatSidenav, MatSidenavModule } from '@angular/material/sidenav';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatTreeFlatDataSource, MatTreeFlattener, MatTreeModule } from '@angular/material/tree';

interface NavigationState {
  backgroundBlock?: boolean;
}

interface FlatNode {
  expandable: boolean;
  name: string;
  level: number;
}

@Component({
  selector: 'header-menu',
  templateUrl: './header-menu.component.html',
  styleUrl: './header-menu.component.scss',
  standalone: true,
  imports: [
    CommonModule,
    MatButtonModule,
    MatDividerModule,
    MatIconModule,
    MatListModule,
    MatMenuModule,
    MatSidenavModule,
    MatToolbarModule,
    MatTreeModule,
    RouterModule,
  ],
})
export default class HeaderMenuComponent implements OnInit, OnDestroy {

  @ViewChild(MatSidenav) sidenav!: MatSidenav;

  private readonly _router = inject(Router);
  private readonly _cookieService = inject(CookieService);
  private readonly _alertService = inject(AlertService);
  private readonly _dialog = inject(MatDialog);
  private readonly _platformId = inject(PLATFORM_ID);
  private readonly _isBrowser = isPlatformBrowser(this._platformId);
  private readonly _destroying$ = new Subject<void>();

  isVisible = signal(true);
  backgroundBlock: boolean = false;
  isIframe: boolean = false;
  loginDisplay: boolean = false;
  name: string = '';

  treeControl = new FlatTreeControl<FlatNode>(
    node => node.level,
    node => node.expandable,
  );

  private _transformer = (node: any, level: number): FlatNode => ({
    expandable: !!node.children?.length,
    name: node.name,
    level
  });

  treeFlattener = new MatTreeFlattener(
    this._transformer,
    node => node.level,
    node => node.expandable,
    node => node.children
  );

  dataSource = new MatTreeFlatDataSource(this.treeControl, this.treeFlattener);

  hasChild = (_: number, node: FlatNode) => node.expandable;

  ngOnInit(): void {
    // Lectura inicial: cubre el caso en que el componente se crea
    // DESPUÉS de que la navegación ya terminó (state se pierde de getCurrentNavigation)
    this.applyNavigationState();

    // Si el componente vive fuera del <router-outlet> (layout persistente),
    // no se destruye entre navegaciones, así que escuchamos cada navegación.
    this._router.events
      .pipe(
        filter((event): event is NavigationEnd => event instanceof NavigationEnd),
        takeUntil(this._destroying$)
      )
      .subscribe(() => this.applyNavigationState());
  }

  ngOnDestroy(): void {
    this._destroying$.next();
    this._destroying$.complete();
  }

  private applyNavigationState(): void {
    // La cookie es confiable tanto en servidor como en cliente (a diferencia de history.state)
    const cookieValue = this._cookieService.get(cookiesList.backgroundBlock);

    // 🔍 DEBUG TEMPORAL — quitar después de diagnosticar
    // console.log('[applyNavigationState]', {
    //   isBrowser: this._isBrowser,
    //   cookieValueFromService: cookieValue,
    //   rawDocumentCookie: this._isBrowser ? document.cookie : '(no disponible en servidor)',
    // });

    this.backgroundBlock = cookieValue === 'true';

    if (this.backgroundBlock) {
      this.getMenu();
    } else {
      // Durante SSR no queremos abrir diálogos ni tocar el DOM;
      // solo redirigimos si estamos en el navegador.
      if (this._isBrowser) {
        this.checkNotExistUser();
      }
      this._router.navigate(['/auth']);
    }
  }

  getIcon(name: string): string {
    return listMenuItems.find(item => item.name === name)?.icon ?? '';
  }

  clickNodeParent(node: FlatNode): void {
    this.treeControl.dataNodes
      .filter(element => element.name !== node.name)
      .forEach(element => this.treeControl.collapse(element));
  }

  getMenu(): void {
    this.dataSource.data = this.filterMenuItems(listMenuItems);
  }

  private filterMenuItems(data: any[]): any[] {
    // this.fillModulesUser();
    return data
      .map(element => ({
        ...element,
        // Filtro real pendiente: this.userModules.some(d => d.moduleDisplayName === child.name)
        children: [...element.children]
      }))
      .filter(element => element.children.length > 0);
  }

  fillModulesUser(): void {
    const compressed = this._cookieService.get(cookiesList.modules);
    if (!compressed) return;
    const uncompressed = decompress(JSON.parse(compressed));
    // uncompressed.forEach(m => { ... });
  }

  clickNode(node: FlatNode): void {
    for (const element of listMenuItems) {
      if (node.name === element.name && element.link) {
        this.navigateAndCollapse(element.link, true);
        return;
      }

      const child = element.children?.find((c: any) => c.name === node.name);
      if (child) {
        this.navigateAndCollapse(child.link, false);
        return;
      }

      if (element.isExpanded) {
        this.isVisible.set(false);
        element.isExpanded = false;
        return;
      }
    }
  }

  private navigateAndCollapse(link: string, visible: boolean): void {
    this._router.navigateByUrl(link);
    this.sidenav.toggle();
    this.isVisible.set(visible);
  }

  async logOut(): Promise<void> {
    // let result = await lastValueFrom(this._authenticationService.setLogLogginLogout(false));
    this.clearCookies();
    this._router.navigate(['/auth']);
  }

  fillModules(): void {
    // if (this.users[0]?.role.modulesPermission.length > 0) {
    //   const zip = compress(this.userModules);
    //   this._cookieService.set(cookiesList.modules, JSON.stringify(zip), cookieOptions);
    //   this.getMenu();
    // }
  }

  clearCookies(): void {
    document.cookie.split(';').forEach(cookie => {
      const eqPos = cookie.indexOf('=');
      const name = eqPos > -1 ? cookie.substring(0, eqPos) : cookie;
      document.cookie = `${name.trim()}=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;`;
    });

    this._cookieService.deleteAll(
      cookieOptions.path,
      cookieOptions.domain,
      cookieOptions.secure,
      cookieOptions.sameSite
    );
  }

  checkNotExistUser(): void {
    const dialogRef = this._dialog.open(NotExistComponent, {
      hasBackdrop: true,
      maxHeight: '80vh',
      width: '460px',
      disableClose: true,
      backdropClass: 'cdk-overlay-dark-backdrop-login'
    });

    dialogRef.afterClosed()
      .pipe(takeUntil(this._destroying$))
      .subscribe(() => this.logOut());
  }
}
