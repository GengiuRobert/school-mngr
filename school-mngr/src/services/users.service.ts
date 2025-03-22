import { Injectable } from "@angular/core";
import { User } from "../models/user.model";
import { doc, Firestore, setDoc } from "@angular/fire/firestore";
import { collection, deleteDoc, getDoc, getDocs, updateDoc } from "firebase/firestore";

@Injectable({ providedIn: 'root' })
export class UserService {
    constructor(private firestore: Firestore) { }

    addUser(user: User, role: string) {
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

    deleteUser(userId: string) {
        const userRef = doc(this.firestore, 'users', userId);
        return deleteDoc(userRef).then(() => {
            console.log("User deleted from Firestore!");

        }).catch(error => {
            console.error("Error deleting user from Firestore: ", error);

        });
    }

    updateUser(userId: string, updatedData: Partial<User>) {
        const userRef = doc(this.firestore, 'users', userId);
        return updateDoc(userRef, updatedData)
            .then(() => {
                console.log("User updated in Firestore!");
            })
            .catch(error => {
                console.error("Error updating user in Firestore: ", error);
            });
    }


    getUser(userId: string) {
        const userRef = doc(this.firestore, 'users', userId);
        return getDoc(userRef)
            .then(docSnapshot => {
                if (docSnapshot.exists()) {
                    const userData = docSnapshot.data();
                    return { ...userData, id: docSnapshot.id };
                } else {
                    console.log("No user found with the given ID.");
                    return null;
                }
            })
            .catch(error => {
                console.error("Error getting user from Firestore: ", error);
                return null;
            });
    }

    getAllUsers() {
        const userRef = collection(this.firestore, 'users');
        return getDocs(userRef).then(querySnapshot => {
            const users: User[] = [];
            querySnapshot.forEach(docSnapshot => {
                const userData = docSnapshot.data();
                users.push({ ...userData, id: docSnapshot.id } as User);
            });
            return users;
        }).catch(error => {
            console.error("Error getting users from Firestore: ", error);
            return [];
        });
    }

    getUserRole(userId: string) {
        const userRef = doc(this.firestore, 'users', userId);
        return getDoc(userRef).then((docSnap) => {
            if (docSnap.exists()) {
                return docSnap.data()?.["role"];
            } else {
                return null;
            }
        }).catch(error => {
            console.error("Error getting user role from Firestore: ", error);
            return null;
        });
    }


}
