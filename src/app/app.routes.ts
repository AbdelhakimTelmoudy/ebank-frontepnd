import { compteRoutes } from './modules/backoffice/components/compte/compte.routes';
import { Routes } from '@angular/router';
import { LayoutComponent } from './core/layout/layout.component';

export const routes: Routes = [
    {
        path: '',
        component: LayoutComponent,
        children: [
            {
                path: 'gestion-des-clients',
                loadChildren: () => import('./modules/backoffice/components/client/client.routes').then(c => c.clientRoutes),
                // canActivate:[authdGuard],
            },
            {
                path: 'gestion-des-comptes',
                loadChildren: () => import('./modules/backoffice/components/compte/compte.routes').then(c => c.compteRoutes),
                // canActivate:[authdGuard],
            },
        ]
    }
];
