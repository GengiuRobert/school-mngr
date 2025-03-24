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

    signUp(email: string, password: string, role: string): Promise<User> {
        return this.http.post<AuthResponseData>(
            `https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=${this.apiKey}`,
            {
                email: email,
                password: password,
                returnSecureToken: true,
            }
        ).toPromise().then((response: AuthResponseData | undefined) => {
            if (!response) {
                throw new Error("Response is undefined");
            }
            const user = new User(
                response.email,
                response.localId,
                role,
                response.idToken,
                new Date(new Date().getTime() + +response.expiresIn * 1000)
            );
            this.userService.addUser(user, role);
            return user;
        }).catch((error) => {
            console.error("Error during signUp", error);
            throw error;
        });
    }


    logIn(email: string, password: string): Promise<User> {
        return this.http.post<AuthResponseData>(
            `https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=${this.apiKey}`,
            {
                email: email,
                password: password,
                returnSecureToken: true,
            }
        ).toPromise().then((response: AuthResponseData | undefined) => {
            if (!response) {
                throw new Error("Response is undefined");
            }
            return this.userService.getUserRole(response.localId).then((role: string | null) => {
                return this.handleAuthentication(
                    response.email,
                    response.localId,
                    role || 'Student',
                    response.idToken,
                    +response.expiresIn
                );
            });
        }).catch((error) => {
            console.error("Error during logIn", error);
            throw error;
        });
    }

    logout(): Promise<void> {
        return new Promise<void>((resolve, reject) => {
            this.user.next(null);
            console.log('User logged out!');
            this.router.navigate(['/login']).then(() => resolve()).catch(error => reject(error));
        });
    }

    private handleAuthentication(email: string, userId: string, role: string, token: string, expiresIn: number): User {
        const expirationDate = new Date(new Date().getTime() + expiresIn * 1000);
        const user = new User(email, userId, role, token, expirationDate);
        this.user.next(user);
        localStorage.setItem('userData', JSON.stringify(user)); 
        return user; 
    }
}
