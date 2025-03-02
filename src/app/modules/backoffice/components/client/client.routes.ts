import { Routes } from "@angular/router";

export const clientRoutes: Routes = [
    {
        path: '',
        loadComponent: () => import('./client.component').then(c => c.ClientComponent),
        pathMatch: 'full',
        data: {
          breadcrumbs: [
            {
              breadcrumb:'Gestion des clients',
              url:'/gestion-des-clients'
            },
          ],
        },
    },
]