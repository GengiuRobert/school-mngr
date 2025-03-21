import { Injectable } from "@angular/core";
import { BehaviorSubject } from "rxjs";
import { HttpClient } from "@angular/common/http";

import { User } from "../models/user.model";
import { AuthResponseData } from "../models/authresponse.model";

@Injectable({ providedIn: 'root' })
export class AuthService {
    private apiKey = "AIzaSyB3xJMjLajDT4Ummqb6t9X40pdODDdq6Uo";
    private authEndpoint = "https://identitytoolkit.googleapis.com/v1/accounts:signInWithCustomToken?key=";
    public user = new BehaviorSubject<User | null>(null);

    constructor(private http: HttpClient) { }

    signUp(email: string, password: string) {
        return this.http.post<AuthResponseData>(
            `${this.authEndpoint}${this.apiKey}`,
            {
                email: email,
                password: password,
                returnSecureToken: true,
            }
        )
    }

}