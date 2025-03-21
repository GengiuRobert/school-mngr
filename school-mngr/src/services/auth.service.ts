import { Injectable } from "@angular/core";
import { BehaviorSubject } from "rxjs";
import { HttpClient } from "@angular/common/http";

import { User } from "../models/user.model";
import { AuthResponseData } from "../models/authresponse.model";

@Injectable({ providedIn: 'root' })
export class AuthService {
    private apiKey = "AIzaSyB3xJMjLajDT4Ummqb6t9X40pdODDdq6Uo";
    public user = new BehaviorSubject<User | null>(null);

    constructor(private http: HttpClient) { }

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
        );
    }

}