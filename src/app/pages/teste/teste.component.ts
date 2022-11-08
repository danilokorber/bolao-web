import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { KeycloakService } from 'keycloak-angular';

@Component({
  selector: 'bolao-teste',
  templateUrl: './teste.component.html',
  styles: [],
})
export class TesteComponent {
  constructor(private http: HttpClient, private keycloak: KeycloakService) {
    this.getHello();
    this.getSecure();
    this.getAdmin();
    this.getUser();
  }

  private _hello: any;
  public get hello(): any {
    return this._hello;
  }
  public set hello(value: any) {
    this._hello = value;
  }
  private _secure: any;
  public get secure(): any {
    return this._secure;
  }
  public set secure(value: any) {
    this._secure = value;
  }
  private _admin: any;
  public get admin(): any {
    return this._admin;
  }
  public set admin(value: any) {
    this._admin = value;
  }
  private _user: any;
  public get user(): any {
    return this._user;
  }
  public set user(value: any) {
    this._user = value;
  }

  getHello() {
    this.http.get('/api/v1/hello').subscribe({
      next: (res) => {
        this.hello = res;
      },
    });
  }

  getSecure() {
    this.http.get('/api/v1/secure', { withCredentials: true }).subscribe({
      next: (res) => {
        this.secure = res;
      },
    });
  }

  getAdmin() {
    this.http
      .get('/api/v1/admin')
      .subscribe({ next: (res) => (this.admin = res) });
  }

  getUser() {
    this.http
      .get('/api/v1/user')
      .subscribe({ next: (res) => (this.user = res) });
  }
}
