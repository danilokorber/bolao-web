import { APP_INITIALIZER, Injectable, NgModule } from '@angular/core';
import {
  BrowserModule,
  HammerGestureConfig,
  HammerModule,
  HAMMER_GESTURE_CONFIG,
} from '@angular/platform-browser';
import { DragDropModule } from '@angular/cdk/drag-drop';

import { AppRoutingModule } from './app.routing';
import { AppRoot } from './app.root';
import { NZ_I18N, de_DE, pt_BR, en_US } from 'ng-zorro-antd/i18n';
import { registerLocaleData } from '@angular/common';
import de from '@angular/common/locales/de';
import pt from '@angular/common/locales/pt';
import en from '@angular/common/locales/en';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgxFlagsModule } from 'ngx-flags';

import { SplashPage } from './pages/splash/splash.page';
import { DirectivesModule } from './directives/directives.module';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { ComponentsModule } from './components/components.module';
import { TranslocoRootModule } from './modules/transloco-root.module';
import { OfflinePage } from './pages/offline/offline.page';
import { DashboardPage } from './pages/dashboard/dashboard.page';
import { MainLayout } from './layout/main.layout';
import { MatchesPage } from './pages/matches/matches.page';
import { KeycloakService } from 'keycloak-angular';
import { AuthGuard } from './guards/auth.guard';
import { environment } from 'src/environments/environment';
import { AccountPage } from './pages/account/account.page';
import { ServiceWorkerModule } from '@angular/service-worker';
import { AdministrationPage } from './pages/administration/administration.page';
import { AdminGuard } from './guards/admin.guard';
import { GroupFilterPipe } from './pipes/group-filter.pipe';
import { AuthorizingPage } from './pages/authorizing/authorizing.page';
import { TesteComponent } from './pages/teste/teste.component';
import { AuthInterceptor } from './interceptors/auth.interceptor';
import { RulesComponent } from './pages/authorizing/rules/rules.component';
import { DataPrivacyComponent } from './pages/authorizing/data-privacy/data-privacy.component';
import { PaymentComponent } from './pages/authorizing/payment/payment.component';
import { NgxPayPalModule } from 'ngx-paypal';
import { RankingComponent } from './pages/ranking/ranking.component';
import { PreferencesComponent } from './pages/authorizing/preferences/preferences.component';
import { BonusBetsComponent } from './pages/authorizing/bonus-bets/bonus-bets.component';
import { NzLayoutModule } from 'ng-zorro-antd/layout';
import { NzMenuModule } from 'ng-zorro-antd/menu';

import { IconDefinition } from '@ant-design/icons-angular';
import { NzIconModule } from 'ng-zorro-antd/icon';
import {
  DashboardOutline,
  FieldTimeOutline,
  TrophyOutline,
  UserOutline,
  SettingOutline,
  LogoutOutline,
} from '@ant-design/icons-angular/icons';
const icons: IconDefinition[] = [
  DashboardOutline,
  FieldTimeOutline,
  TrophyOutline,
  UserOutline,
  SettingOutline,
  LogoutOutline,
];

registerLocaleData(de);
registerLocaleData(pt);
registerLocaleData(en);

function initializeKeycloak(keycloak: KeycloakService) {
  return () => keycloak.init(environment.configs.keycloak);
}

import * as Hammer from 'hammerjs';
import { PastOrFuturePipe } from './pipes/past-or-future.pipe';
import { SidebarLayoutComponent } from './layout/sidebar-layout/sidebar-layout.component';
import { MarkdownModule } from 'ngx-markdown';
import { RulesPage } from './pages/rules/rules.component';
import { GetHelpComponent } from './pages/get-help/get-help.component';
import { Authorizing2Page } from './pages/authorizing/authorizing2.page';
import { DataPrivacyPage } from './pages/data-privacy/data-privacy.page';

import { ChartModule } from 'primeng/chart';
import { SurveyPage } from './pages/survey/survey.page';

@Injectable()
export class MyHammerConfig extends HammerGestureConfig {
  override = <any>{
    swipe: { direction: Hammer.DIRECTION_ALL },
    pan: { direction: Hammer.DIRECTION_ALL, enabled: true },
  };
}

@NgModule({
  declarations: [
    AppRoot,
    SplashPage,
    OfflinePage,
    DashboardPage,
    MainLayout,
    MatchesPage,
    AccountPage,
    AdministrationPage,
    GroupFilterPipe,
    AuthorizingPage,
    TesteComponent,
    RulesComponent,
    DataPrivacyComponent,
    PaymentComponent,
    RankingComponent,
    PreferencesComponent,
    BonusBetsComponent,
    PastOrFuturePipe,
    SidebarLayoutComponent,
    RulesPage,
    GetHelpComponent,
    Authorizing2Page,
    DataPrivacyPage,
    SurveyPage,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    BrowserAnimationsModule,
    DirectivesModule,
    ComponentsModule,
    FontAwesomeModule,
    TranslocoRootModule,
    NgxPayPalModule,
    NgxFlagsModule,
    HammerModule,
    DragDropModule,
    NzLayoutModule,
    NzIconModule.forRoot(icons),
    MarkdownModule.forRoot(),
    NzMenuModule,
    ChartModule,
    ServiceWorkerModule.register('ngsw-worker.js', {
      enabled: environment.production,
      // Register the ServiceWorker as soon as the application is stable
      // or after 30 seconds (whichever comes first).
      registrationStrategy: 'registerWhenStable:30000',
    }),
    ServiceWorkerModule.register('ngsw-worker.js', {
      enabled: environment.production,
      // Register the ServiceWorker as soon as the application is stable
      // or after 30 seconds (whichever comes first).
      registrationStrategy: 'registerWhenStable:30000',
    }),
  ],
  providers: [
    //{ provide: NZ_I18N, useValue: de_DE },
    {
      provide: APP_INITIALIZER,
      useFactory: initializeKeycloak,
      multi: true,
      deps: [KeycloakService],
    },
    { provide: HAMMER_GESTURE_CONFIG, useClass: MyHammerConfig },
    { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true },
    KeycloakService,
    AuthGuard,
    AdminGuard,
  ],
  bootstrap: [AppRoot],
})
export class AppModule {}
