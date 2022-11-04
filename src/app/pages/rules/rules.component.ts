import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'bolao-rules',
  templateUrl: './rules.component.html',
  styles: [],
})
export class RulesPage implements OnInit {
  constructor(private authService: AuthService) {}

  ngOnInit(): void {}

  get language(): string {
    return this.authService.language;
  }
}
