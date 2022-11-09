import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ButtonComponent } from './button/button.component';
import { BgVideoComponent } from './bg-video/bg-video.component';
import { SignatureComponent } from './signature/signature.component';
import { MatchComponent } from './match/match.component';
import { NgxFlagsModule } from 'ngx-flags';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { NzToolTipModule } from 'ng-zorro-antd/tooltip';
//import { NzDrawerModule } from 'ng-zorro-antd/drawer';
import { NzStepsModule } from 'ng-zorro-antd/steps';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { NzModalModule } from 'ng-zorro-antd/modal';
import { ReactiveFormsModule } from '@angular/forms';
import { BetSummaryComponent } from './bet/bet-summary.component';
import { TranslocoRootModule } from '../modules/transloco-root.module';
import { RankingItemComponent } from './ranking-item/ranking-item.component';
import { MatchCardComponent } from './match-card/match-card.component';
import { NzCardModule } from 'ng-zorro-antd/card';
import { LoadingComponent } from './loading/loading.component';

@NgModule({
  declarations: [
    ButtonComponent,
    BgVideoComponent,
    SignatureComponent,
    MatchComponent,
    BetSummaryComponent,
    RankingItemComponent,
    MatchCardComponent,
    LoadingComponent,
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    NgxFlagsModule,
    FontAwesomeModule,
    NzToolTipModule,
    //NzDrawerModule,
    NzStepsModule,
    NzIconModule,
    NzModalModule,
    NzCardModule,
    TranslocoRootModule,
  ],
  exports: [
    ButtonComponent,
    RankingItemComponent,
    BgVideoComponent,
    SignatureComponent,
    MatchComponent,
    NzStepsModule,
    NzIconModule,
    NzCardModule,
    MatchCardComponent,
    LoadingComponent
  ],
})
export class ComponentsModule {}
