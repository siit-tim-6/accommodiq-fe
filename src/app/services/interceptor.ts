import {Injectable} from "@angular/core";
import {HttpEvent, HttpHandler, HttpHeaders, HttpInterceptor, HttpRequest} from "@angular/common/http";
import {Observable} from "rxjs";

@Injectable()
export class Interceptor implements HttpInterceptor {
  intercept(
    req: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    const jwt = localStorage.getItem('user');
    if (!!jwt) {
      req = req.clone({
        setHeaders: {
          'Authorization': `Bearer ${jwt}`,
        }
      });
    }
    return next.handle(req);
  }
}
