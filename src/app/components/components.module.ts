import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ButtonComponent } from './button/button.component';
import { BgVideoComponent } from './bg-video/bg-video.component';
import { SignatureComponent } from './signature/signature.component';
import { MatchComponent } from './match/match.component';
import { NgxFlagsModule } from 'ngx-flags';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { NzToolTipModule } from 'ng-zorro-antd/tooltip';
import { NzSliderModule } from 'ng-zorro-antd/slider';
//import { NzDrawerModule } from 'ng-zorro-antd/drawer';
import { NzStepsModule } from 'ng-zorro-antd/steps';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { NzModalModule } from 'ng-zorro-antd/modal';
import { NzRadioModule } from 'ng-zorro-antd/radio';
import { NzInputModule } from 'ng-zorro-antd/input';
import { NzCheckboxModule } from 'ng-zorro-antd/checkbox';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BetSummaryComponent } from './bet/bet-summary.component';
import { TranslocoRootModule } from '../modules/transloco-root.module';
import { RankingItemComponent } from './ranking-item/ranking-item.component';
import { MatchCardComponent } from './match-card/match-card.component';
import { NzCardModule } from 'ng-zorro-antd/card';
import { LoadingComponent } from './loading/loading.component';
import { LoadingSimpleComponent } from './loading-simple/loading-simple.component';
import { FourFlagsComponent } from './four-flags/four-flags.component';
import { BetDetailComponent } from './bet-detail/bet-detail.component';
import { SurveyCardComponent } from './survey-card/survey-card.component';
import { SurveyCardSliderComponent } from './survey-card/survey-card-slider/survey-card-slider.component';
import { SurveyCardRadioComponent } from './survey-card/survey-card-radio/survey-card-radio.component';
import { SurveyCardCheckboxComponent } from './survey-card/survey-card-checkbox/survey-card-checkbox.component';
import { NzTagModule } from 'ng-zorro-antd/tag';

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
    LoadingSimpleComponent,
    FourFlagsComponent,
    BetDetailComponent,
    SurveyCardComponent,
    SurveyCardSliderComponent,
    SurveyCardRadioComponent,
    SurveyCardCheckboxComponent,
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    NgxFlagsModule,
    FontAwesomeModule,
    NzToolTipModule,
    //NzDrawerModule,
    NzStepsModule,
    NzIconModule,
    NzModalModule,
    NzCardModule,
    NzSliderModule,
    NzInputModule,
    NzRadioModule,
    NzCheckboxModule,
    NzTagModule,
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
    LoadingComponent,
    LoadingSimpleComponent,
    FourFlagsComponent,
    SurveyCardComponent,
  ],
})
export class ComponentsModule {}
