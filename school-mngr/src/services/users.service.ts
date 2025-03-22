import { Injectable } from "@angular/core";
import { User } from "../models/user.model";
import { doc, Firestore, setDoc } from "@angular/fire/firestore";
import { collection, deleteDoc, getDoc, getDocs, query, updateDoc, where } from "firebase/firestore";
import { catchError, from, map } from "rxjs";

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

    getAllProfessors() {
        const usersRef = collection(this.firestore, 'users');
        const q = query(usersRef, where("role", "==", "Professor"));

        return from(getDocs(q)).pipe(
            map(querySnapshot => {
                const professors: User[] = [];
                querySnapshot.forEach(docSnapshot => {
                    const userData = docSnapshot.data();
                    professors.push({ ...userData, id: docSnapshot.id } as User);
                });
                return professors;
            }),
            catchError(error => {
                console.error("Error getting professors: ", error);
                return [];
            })
        );
    }

    getAllStudents() {
        const usersRef = collection(this.firestore, 'users');
        const q = query(usersRef, where("role", "==", "Student"));

        return from(getDocs(q)).pipe(
            map(querySnapshot => {
                const studfents: User[] = [];
                querySnapshot.forEach(docSnapshot => {
                    const userData = docSnapshot.data();
                    studfents.push({ ...userData, id: docSnapshot.id } as User);
                });
                return studfents;
            }),
            catchError(error => {
                console.error("Error getting studfents: ", error);
                return [];
            })
        );
    }

    assignProfessorToLesson(lessonId: string, professorId: string) {
        const lessonRef = doc(this.firestore, 'lessons', lessonId);

        return from(updateDoc(lessonRef, { professorId })).pipe(
            map(() => {
                return { id: lessonId, professorId };
            })
        );
    }

}
