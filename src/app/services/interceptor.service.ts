import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent } from '@angular/common/http';
import { Observable } from 'rxjs';
import { AngularFireAuth } from '@angular/fire/auth';
import { switchMap } from 'rxjs/operators';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class InterceptorService implements HttpInterceptor {

  constructor(
    private afAuth: AngularFireAuth
  ) { }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    return this.afAuth.idToken.pipe(switchMap((token: any) => {
      let request = req;
      request = request.clone({ url: `${environment.backend}/${request.url}` });
      if (token) {
        request = request.clone({ headers: request.headers.set('Authorization', token) });
      }
      return next.handle(request);
    }));
  }
}
