import { Injectable } from "@angular/core";
import { Router, NavigationEnd, ActivatedRouteSnapshot } from "@angular/router";
import { BehaviorSubject, filter } from "rxjs";

interface Breadcrumb {
  label: string;
  url: string;
}
@Injectable({
  providedIn: 'root'
})
export class BreadcrumbService {

  private breadcrumbs$ = new BehaviorSubject<Breadcrumb[]>([]);

  constructor(private router: Router) {
    this.router.events.pipe(
      filter(event => event instanceof NavigationEnd)
    ).subscribe(() => {
      const root = this.router.routerState.snapshot.root;
      const breadcrumbs = this.createBreadcrumbs(root);
      this.breadcrumbs$.next(breadcrumbs);
    });
  }

  private createBreadcrumbs(route: ActivatedRouteSnapshot, url: string = '', breadcrumbs: Breadcrumb[] = []): Breadcrumb[] {
    const children: ActivatedRouteSnapshot[] = route.children;

    if (children.length === 0) {
      return breadcrumbs;
    }

    for (const child of children) {
      const routeURL: string = child.url.map(segment => segment.path).join('/');
      if (routeURL !== '') {
        url += `/${routeURL}`;
      }

      if (child.data['breadcrumbs']) {
        for (const breadcrumb of child.data['breadcrumbs']) {
          breadcrumbs.push({
            label: breadcrumb.breadcrumb,
            url: breadcrumb.url
          });
        }
      }

      return this.createBreadcrumbs(child, url, breadcrumbs);
    }
    return breadcrumbs;
  }

  getBreadcrumbs() {
    return this.breadcrumbs$.asObservable();
  }
}
