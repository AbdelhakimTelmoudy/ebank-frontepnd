import { ChangeDetectorRef, Component, OnDestroy, OnInit } from '@angular/core';
import { Router, NavigationEnd, ActivatedRoute, RouterModule } from '@angular/router';
import { NzBreadCrumbModule } from 'ng-zorro-antd/breadcrumb';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { NzLayoutModule } from 'ng-zorro-antd/layout';
import { NzMenuModule } from 'ng-zorro-antd/menu';
import { Subject, takeUntil, filter, map } from 'rxjs';
import { AuthService } from '../../modules/auth/services/auth.service';
import { UserService } from '../../modules/auth/services/user.service';
import { CommonModule } from '@angular/common';
import { NzAvatarModule } from 'ng-zorro-antd/avatar';
import { NzToolTipModule } from 'ng-zorro-antd/tooltip';
import { sideNavigation } from '../utils/helpers/navigation.config';
import { BreadcrumbService } from '../utils/services/breadcrumb.service';

@Component({
  selector: 'app-layout',
  imports: [NzLayoutModule,NzBreadCrumbModule, NzIconModule, NzMenuModule, CommonModule, RouterModule, NzAvatarModule,
    NzToolTipModule
  ],
  templateUrl: './layout.component.html',
  styleUrl: './layout.component.scss'
})
export class LayoutComponent implements OnInit ,OnDestroy {
  isCollapsed: boolean = false;
  isDropDownCollapsed: boolean=false;
  private onDestroy$ = new Subject();
  navigationItems: any[] = sideNavigation;
  breadcrumbs: any[] = [];
  // currentUser: IUserInfo | null = null;
  ngOnInit(): void {
    this.breadcrumbService.getBreadcrumbs().subscribe(breadcrumbs => {
      this.breadcrumbs = breadcrumbs;
    });

    // this.userService.currentUser$.subscribe(user => {
    //   // console.log('User received in LayoutComponent:', user);
    //   this.currentUser = user;
    // });
  }
  routeTitle!: string | undefined;
  currentRoute!: string;
  SubCurrentRoute!: string;


  constructor(
    private readonly router: Router,
    private readonly cd: ChangeDetectorRef,
    private breadcrumbService: BreadcrumbService,
    private authService: AuthService,
    private userService: UserService
  ) {
    this.router.events
      .pipe(
        takeUntil(this.onDestroy$),
        filter(e => e instanceof NavigationEnd),
        map(() => {
          let route: ActivatedRoute = this.router.routerState.root;

          // Extract only the first segment of the URL path
          const urlSegments = this.router.url.split('/');
          this.currentRoute = urlSegments.length > 1 ? urlSegments[1] : '';
          this.SubCurrentRoute = urlSegments.length > 1 ? urlSegments[2] : '';
          console.log(this.currentRoute,"route");
          console.log(this.SubCurrentRoute," sub route");


          while (route.firstChild) {
            route = route.firstChild;
            this.routeTitle = route.routeConfig?.title?.toString() || '';
          }

          this.cd.detectChanges();

          return this.routeTitle;
        })
      )
      .subscribe();
  }


  isActive(route: string): boolean {
    if (!route) {
      return false;
    }
    const normalizedRoute = route.startsWith('/') ? route.substring(1) : route;
    return this.currentRoute.startsWith(`/${normalizedRoute}`);
  }

  // logout() {
  //   this.authService.logout();
  // }


  ngOnDestroy(): void {
    this.onDestroy$.next(null);
    this.onDestroy$.complete();
  }
}
