import { Component, OnInit } from '@angular/core';
import { IconDefinition } from '@fortawesome/fontawesome-svg-core';
import {
  faLanguage,
  faUserSecret,
  faScaleBalanced,
  faRankingStar,
  faEuroSign,
} from '@fortawesome/free-solid-svg-icons';
import { Profile } from 'src/app/interfaces/profile';
import { UsersService } from 'src/app/services/users.service';

@Component({
  selector: 'bolao-administration',
  templateUrl: './administration.page.html',
  styles: [],
})
export class AdministrationPage implements OnInit {
  constructor(private usersService: UsersService) {}

  private _profiles: Profile[] = [];
  public get profiles(): Profile[] {
    return this._profiles;
  }
  public set profiles(value: Profile[]) {
    this._profiles = value;
  }

  icon1: IconDefinition = faLanguage;
  icon2: IconDefinition = faUserSecret;
  icon3: IconDefinition = faScaleBalanced;
  icon4: IconDefinition = faRankingStar;
  icon5: IconDefinition = faEuroSign;

  ngOnInit(): void {
    this.usersService.getAll().subscribe({
      next: (profiles) =>
        (this.profiles = profiles.filter((p) => p.attributes != null)),
    });
  }
}
