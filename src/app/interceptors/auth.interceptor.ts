import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
} from '@angular/common/http';
import { from, mergeMap, Observable } from 'rxjs';
import { KeycloakService } from 'keycloak-angular';
import { AutoUnsubscribe } from '../decorators/auto-unsubscribe.decorator';

@Injectable()
@AutoUnsubscribe()
export class AuthInterceptor implements HttpInterceptor {
  constructor(private keycloak: KeycloakService) {}

  intercept(
    req: HttpRequest<unknown>,
    next: HttpHandler
  ): Observable<HttpEvent<unknown>> {
    return from(this.keycloak.isLoggedIn()).pipe(
      mergeMap((loggedIn) => {
        if (loggedIn) {
          return this.keycloak.addTokenToHeader(req.headers).pipe(
            mergeMap((headersWithBearer) => {
              const clonedReq = req.clone({ headers: headersWithBearer });
              return next.handle(clonedReq);
            })
          );
        } else {
          return next.handle(req);
        }
      })
    );
  }
}
