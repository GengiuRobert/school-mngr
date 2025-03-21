import { Injectable } from "@angular/core";
import { BehaviorSubject, tap } from "rxjs";
import { HttpClient } from "@angular/common/http";

import { User } from "../models/user.model";
import { AuthResponseData } from "../models/authresponse.model";
import { Router } from "@angular/router";

@Injectable({ providedIn: 'root' })
export class AuthService {
    private apiKey = "AIzaSyB3xJMjLajDT4Ummqb6t9X40pdODDdq6Uo";
    public user = new BehaviorSubject<User | null>(null);

    constructor(private http: HttpClient, private router: Router) { }

    signUp(email: string, password: string) {
        return this.http.post<AuthResponseData>(
            `https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=${this.apiKey}`,
            {
                email: email,
                password: password,
                returnSecureToken: true,
            }
        );
    }

    logIn(email: string, password: string) {
        return this.http.post<AuthResponseData>(
            `https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=${this.apiKey}`,
            {
                email: email,
                password: password,
                returnSecureToken: true,
            }
        ).pipe(
            tap((response) => {
                this.handleAuthentication(
                    response.email,
                    response.localId,
                    response.idToken,
                    +response.expiresIn
                );
            })
        );
    }

    logout() {
        this.user.next(null);
        console.log('User logged out!');
        this.router.navigate(['/login']);
    }

    private handleAuthentication(email: string, userId: string, token: string, expiresIn: number) {
        const expirationDate = new Date(new Date().getTime() + expiresIn * 1000);
        const user = new User(email, userId, token, expirationDate);
        this.user.next(user);
        localStorage.setItem('userData', JSON.stringify(user));
    }

    private autoLogin() {
        const userData: { email: string; id: string; _token: string; _tokenExpirationDate: string } = JSON.parse(localStorage.getItem('userData')!);
        if (!userData) {
            return;
        }
        const loadedUser = new User(userData.email, userData.id, userData._token, new Date(userData._tokenExpirationDate));
        if (loadedUser.token) {
            this.user.next(loadedUser);
        }
    }

}