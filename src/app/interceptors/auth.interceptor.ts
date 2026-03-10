import { AuthService } from "../services/auth.service";
import { HttpInterceptorFn } from "@angular/common/http";
import { inject } from "@angular/core";
import { catchError, switchMap, throwError } from "rxjs";
import { Router } from "@angular/router";

export const authInterceptor: HttpInterceptorFn = (req, next) => {
    const authService = inject(AuthService);
    const router = inject(Router);
    const token = authService.getToken();

    const cloned = token ? req.clone({
        headers: req.headers.set('Authorization', `Bearer ${token}`)
    }) : req;

    return next(cloned).pipe(
        catchError((error) => {
            // si el token expiró y tenemos refresh token
            if (error.status === 401 && authService.getRefreshToken()) {
                return authService.refresh(authService.getRefreshToken()!).pipe(
                    switchMap((response) => {
                        // guardar el nuevo token
                        authService.saveToken(response.token);
                        authService.saveRefreshToken(response.refreshToken);

                        // reintentar la petición original con el nuevo token
                        const retried = req.clone({
                            headers: req.headers.set('Authorization', `Bearer ${response.token}`)
                        });
                        return next(retried);
                    }),
                    catchError(() => {
                        // si el refresh también falla, hacer logout
                        authService.loggout();
                        router.navigate(['/login']);
                        return throwError(() => error);
                    })
                );
            }

            if (error.status === 403) {
                authService.loggout();
                router.navigate(['/login']);
            }

            return throwError(() => error);
        })
    );
}