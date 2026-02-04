import { Routes } from '@angular/router';
import { NotFoundComponent } from './pages/not-found/not-found.component';

export const appRoutes: Routes = [
  {
    path: '',
    children: [
      {
        path: '',
        title: 'Wisnu Yumna Yudhanta | Fullstack Developer Portfolio',
        loadComponent: () =>
          import('./features/home/home.component').then((m) => m.HomeComponent),
      },
      {
        path: 'about',
        title: 'About | Wisnu Yumna Yudhanta',
        loadComponent: () =>
          import('./features/about/about.component').then(
            (m) => m.AboutComponent
          ),
      },
      {
        path: 'projects',
        title: 'Projects | Wisnu Yumna Yudhanta',
        loadComponent: () =>
          import('./features/projects/projects.component').then(
            (m) => m.ProjectsComponent
          ),
        children: [
          {
            path: 'not-found',
            component: NotFoundComponent,
          },
        ],
      },
      {
        path: 'certificates',
        title: 'Certificates | Wisnu Yumna Yudhanta',
        loadComponent: () =>
          import('./features/certificates/certificates.component').then(
            (m) => m.CertificatesComponent
          ),
      },
    ],
  },
  {
    path: '**',
    title: 'Page Not Found | Wisnu Yumna Yudhanta',
    component: NotFoundComponent,
  },
];
