import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AutoplayDirective } from './autoplay.directive';
import { AccountPictureFallbackDirective } from './account-picture-fallback.directive';

@NgModule({
  declarations: [AutoplayDirective, AccountPictureFallbackDirective],
  imports: [CommonModule],
  exports: [AutoplayDirective, AccountPictureFallbackDirective],
})
export class DirectivesModule {}
