import { Routes } from "@angular/router";

export const compteRoutes: Routes = [
    {
        path: '',
        loadComponent: () => import('./compte.component').then(c => c.CompteComponent),
        pathMatch: 'full',
        data: {
          breadcrumbs: [
            {
              breadcrumb:'Gestion des comptes',
              url:'/gestion-des-comptes'
            },
          ],
        },
    },
]