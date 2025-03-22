import { Injectable } from "@angular/core";
import { BehaviorSubject, tap } from "rxjs";
import { HttpClient } from "@angular/common/http";
import { Router } from "@angular/router";

import { User } from "../models/user.model";
import { AuthResponseData } from "../models/authresponse.model";

import { UserService } from "./users.service";

@Injectable({ providedIn: 'root' })
export class AuthService {
    private apiKey = "AIzaSyB3xJMjLajDT4Ummqb6t9X40pdODDdq6Uo";
    public user = new BehaviorSubject<User | null>(null);

    constructor(private http: HttpClient, private router: Router, private userService: UserService) { }

    signUp(email: string, password: string, role: string) {
        return this.http.post<AuthResponseData>(
            `https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=${this.apiKey}`,
            {
                email: email,
                password: password,
                returnSecureToken: true,
            }
        ).pipe(
            tap((response) => {

                const user = new User(
                    response.email,
                    response.localId,
                    role,
                    response.idToken,
                    new Date(new Date().getTime() + +response.expiresIn * 1000)
                );

                this.userService.addUser(user, role);
            })
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

    private handleAuthentication(email: string, userId: string, token: string, expiresIn: number, role?: string) {
        const expirationDate = new Date(new Date().getTime() + expiresIn * 1000);
        const user = new User(email, userId, role || 'Student', token, expirationDate);
        this.user.next(user);
        localStorage.setItem('userData', JSON.stringify(user));
    }
}
