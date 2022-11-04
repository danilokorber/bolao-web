import { Component } from '@angular/core';

@Component({
  selector: 'bolao-bg-video',
  template: `
    <video autoplay muted loop id="bg-video">
      <source [src]="videoUrl" type="video/mp4" />
    </video>
  `,
  styles: [
    `
      #bg-video {
        @apply fixed bottom-0 left-0 h-screen z-[-1];
        @apply min-w-[100vw] max-w-none;
        @apply min-h-[100vh];
      }
    `,
  ],
})
export class BgVideoComponent {
  videoId: number = Math.floor(Math.random() * 4) + 1;
  get videoUrl(): string {
    return `/assets/v/${this.videoId}.mp4`;
  }
}
