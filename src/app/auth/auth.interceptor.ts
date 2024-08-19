import { HttpErrorResponse, HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Router } from "@angular/router";
import { Observable, catchError, throwError } from "rxjs";
import { UserAuthService } from "src/app/service/user-auth.service";
@Injectable()

export class AuthInterceptor implements HttpInterceptor {

    constructor(private userAuthService: UserAuthService, private router: Router) { }

    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        if (req.headers.get('No-Auth') === 'True') {
            return next.handle(req.clone());

        }

        const jwtToken = this.userAuthService.getToken();

        req = this.addToken(req, jwtToken);

        return next.handle(req).pipe(

            catchError(
                (err: HttpErrorResponse) => {
                    console.log(err.status);

                    if (err.status === 401) {
                        this.router.navigate(['/login']);
                    } else if (err.status === 403) {
                        this.router.navigate(['/forbidden'])
                    }
                    return throwError("somthing wrong");
                }
            )

        );
    }


    private addToken(req: HttpRequest<any>, jwtToken: string) {

        return req.clone(
            {
                setHeaders: {
                    Authorization: `Bearer ${jwtToken}`
                }
            }
        )
    }

}
