import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';
import { OKTA_AUTH } from '@okta/okta-angular';
import { OktaAuth } from '@okta/okta-auth-js';
import { Observable, from } from 'rxjs';
import { lastValueFrom } from 'rxjs';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AuthInterceptorService implements HttpInterceptor {

  constructor(@Inject(OKTA_AUTH) private oktaAuth: OktaAuth) { }

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    return from(this.handleAccess(request, next));
  }

  private async handleAccess(request: HttpRequest<any>, next: HttpHandler): Promise<HttpEvent<any>> {
    // Only add an access token for secured endpoints
    const theEndpoint = environment.shopApiUrl + 'orders';
    const securedEndpoints = [theEndpoint];

    if (securedEndpoints.some(url => request.urlWithParams.includes(url))) {
      // get access token
      const accessToken = this.oktaAuth.getAccessToken();

      console.log('Access Token:', accessToken); // Log the access token for debugging

      if (accessToken) {
        // clone the request and add new header with access token
        request = request.clone({
          setHeaders: {
            Authorization: 'Bearer ' + accessToken,
            'Content-Type': 'application/json' // Correct header name
          }
        });
      } else {
        console.error('No access token found'); // Log if access token is not found
      }
    }

    return await lastValueFrom(next.handle(request));
  }
}
