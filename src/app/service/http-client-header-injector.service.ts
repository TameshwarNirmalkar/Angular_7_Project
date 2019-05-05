import { Injectable, Injector } from '@angular/core';
import { HttpInterceptor, HttpHeaders, HttpHandler, HttpRequest, HttpEvent, HTTP_INTERCEPTORS } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { AuthService as AuthAdminService } from '@srk/core';
import { ApplicationDataService } from '@srk/core';

@Injectable()
export class HttpClientHeaderInjectorService implements HttpInterceptor {

  private applicationDataService: ApplicationDataService;
  private authAdminService: AuthAdminService;

  constructor(private injector: Injector) { }

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

    this.authAdminService = this.injector.get(AuthAdminService);
    this.applicationDataService = this.injector.get(ApplicationDataService);
    const token = this.authAdminService.getToken() || 'solitaire';

    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      token,
      calling_entity: this.applicationDataService.getCallingEntity()
    });

    const newRequests = request.clone({ headers });
    return next.handle(newRequests);
  }
}

export const HttpClientRequestOptionsProvider = { provide: HTTP_INTERCEPTORS, useClass: HttpClientHeaderInjectorService, multi: true };
