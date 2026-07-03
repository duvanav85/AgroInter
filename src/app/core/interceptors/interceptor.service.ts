import { Injectable } from '@angular/core';
import {
  HttpInterceptor,
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpResponse
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
//Services
import { LoadingService } from '../../shared/services/loading/loading.service';
//Interfaces
import { InterceptorOptions } from '../models/dto/InterceptorOptions.interface';

@Injectable()
export class CoreHttpInterceptor implements HttpInterceptor {

  private defaultOptions: InterceptorOptions = {
    showLoader: true,
  };

  constructor(private loading: LoadingService) {}

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

    const options: InterceptorOptions = {
      ...this.defaultOptions,
    };

    if (options.showLoader) {
      this.loading.setLoading(true, req.url);
    }

    return next.handle(req).pipe(
      tap(
        (event: HttpEvent<any>) => {
          if (options.showLoader && event instanceof HttpResponse) {
            this.loading.setLoading(false, req.url);
          }
        },
        (error) => {
          this.loading.setLoading(false, req.url);
        }
      )
    );
  }
}
