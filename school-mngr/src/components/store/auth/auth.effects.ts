import { inject, Injectable } from '@angular/core';
import { Actions, ofType, createEffect } from '@ngrx/effects';
import { Router } from '@angular/router';
import { mergeMap } from 'rxjs/operators';
import { logIn, logInFailure, logInSuccess, logout, logoutFailure, logoutSuccess, signUp, signUpFailure, signUpSuccess } from './auth.actions';
import { User } from '../../../models/user.model';
import { AuthService } from '../../../services/auth.service';


@Injectable()
export class AuthEffects {


    private actions$ = inject(Actions);
    private authService = inject(AuthService);
    private router = inject(Router);


    signUp$ = createEffect(() =>
        this.actions$.pipe(
            ofType(signUp),
            mergeMap(({ email, password, role }) =>
                this.authService.signUp(email, password, role).then((user: User) => {
                    return signUpSuccess({ user });
                }).catch((error) => {
                    return signUpFailure({ error: error.message });
                })
            )
        )
    );

    logIn$ = createEffect(() =>
        this.actions$.pipe(
            ofType(logIn),
            mergeMap(({ email, password }) =>
                this.authService.logIn(email, password).then((user: User) => {
                    return logInSuccess({ user });
                }).catch((error) => {
                    return logInFailure({ error: error.message });
                })
            )
        )
    );

    logout$ = createEffect(
        () =>
            this.actions$.pipe(
                ofType(logout),
                mergeMap(() =>
                    this.authService.logout().then(() => {
                        this.router.navigate(['/login']);
                        return logoutSuccess();
                    }).catch((error) => {
                        console.error("Logout error", error);
                        return logoutFailure({error});
                    })
                )
            ),
        { dispatch: false }
    );
}
