import { Injectable } from "@angular/core";
import { User } from "../models/user.model";
import { doc, Firestore, setDoc } from "@angular/fire/firestore";

@Injectable({ providedIn: 'root' })
export class UserService {
    constructor(private firestore: Firestore) { }

    addUser(user: User,role:string) {
        const userRef = doc(this.firestore, 'users', user.id);
        return setDoc(userRef, {
            email: user.email,
            userId: user.id,
            role: role
        })
            .then(() => {
                console.log("User added to Firestore!");
            })
            .catch(error => {
                console.error("Error adding user to Firestore: ", error);
            });
    }

}
