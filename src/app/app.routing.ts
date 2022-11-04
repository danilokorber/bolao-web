import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { OfflinePage } from './pages/offline/offline.page';
import { SplashPage } from './pages/splash/splash.page';
import { DashboardPage } from './pages/dashboard/dashboard.page';
import { MainLayout } from './layout/main.layout';
import { MatchesPage } from './pages/matches/matches.page';
import { AuthGuard } from './guards/auth.guard';
import { AccountPage } from './pages/account/account.page';
import { AdministrationPage } from './pages/administration/administration.page';
import { AdminGuard } from './guards/admin.guard';
import { AuthorizingPage } from './pages/authorizing/authorizing.page';
import { TesteComponent } from './pages/teste/teste.component';
import { RankingComponent } from './pages/ranking/ranking.component';
import { SidebarLayoutComponent } from './layout/sidebar-layout/sidebar-layout.component';
import { RulesPage } from './pages/rules/rules.component';

const routes: Routes = [
  { path: 'teste', component: TesteComponent, pathMatch: 'full' },
  { path: '', component: SplashPage, pathMatch: 'full' },
  { path: 'login', component: SplashPage, pathMatch: 'full' },
  {
    path: 'authorizing',
    component: AuthorizingPage,
    canActivate: [AuthGuard],
    pathMatch: 'full',
  },
  {
    path: '',
    component: SidebarLayoutComponent,
    canActivate: [AuthGuard],
    children: [
      {
        path: 'dashboard',
        component: DashboardPage,
        pathMatch: 'full',
        data: { title: 'WM 2022' },
      },
      {
        path: 'matches',
        component: MatchesPage,
        pathMatch: 'full',
        data: { title: 'Spiele' },
      },
      {
        path: 'ranking',
        component: RankingComponent,
        pathMatch: 'full',
        data: { title: 'Ranking' },
      },
      {
        path: 'rules',
        component: RulesPage,
        pathMatch: 'full',
        data: { title: 'Regeln' },
      },
      {
        path: 'account',
        component: AccountPage,
        pathMatch: 'full',
        data: { title: 'Konto' },
      },
      {
        path: 'administration',
        component: AdministrationPage,
        canActivate: [AdminGuard],
        pathMatch: 'full',
        data: { title: 'Verwaltung' },
      },
    ],
  },
  { path: 'offline', component: OfflinePage, pathMatch: 'full' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
