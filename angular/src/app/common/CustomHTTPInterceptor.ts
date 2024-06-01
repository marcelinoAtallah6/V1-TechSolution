import { HttpErrorResponse, HttpEvent, HttpHandler, HttpInterceptor, HttpRequest, HttpResponse } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { catchError, finalize, Observable, retry, throwError } from "rxjs";
import { GlobalConstants } from "./GlobalConstants";

@Injectable()
export class CustomHTTPInterceptor implements HttpInterceptor {

    // Request Interceptor Class

    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        const reqRefreshToken = localStorage.getItem('jwtAccessToken');
        const reqWithAuth = req.clone({ headers: GlobalConstants.headers });

        // console.log("Interceptor ---- > " , next.handle(reqWithAuth));
 
        return next.handle(req).pipe(
            catchError((error: HttpErrorResponse) => {
                // console.log('Interceptor Error 1 ---- > ' , req.url);
                // console.log('Interceptor Error 2 ---- > ' , error);
                return throwError(error);
            }),
            finalize(() => {
                const request = `${req.method} "${req.urlWithParams}"`;
                // console.log('Interceptor Request ---- > ' , request);
                // console.log('Interceptor Headers ---- > ' , req.headers);
            })
        );
    } 
}