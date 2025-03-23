import { Injectable } from "@angular/core";
import { User } from "../models/user.model";
import { Student } from "../models/student.model";
import { doc, Firestore, setDoc } from "@angular/fire/firestore";
import { collection, deleteDoc, getDoc, getDocs, query, updateDoc, where } from "firebase/firestore";
import { catchError, firstValueFrom, from, map, mergeMap, of, switchMap } from "rxjs";
import { Lesson } from "../models/lesson.model";
import { Grade } from "../models/grade.model";

@Injectable({ providedIn: 'root' })
export class UserService {
    constructor(private firestore: Firestore) { }

    addUser(user: User, role: string) {
        const userRef = doc(this.firestore, 'users', user.id);

        const userData: any = {
            email: user.email,
            userId: user.id,
            role: role,
        };

        if (role === 'Student') {
            userData.grades = [];
        }

        return setDoc(userRef, userData)
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
                const studfents: Student[] = [];
                querySnapshot.forEach(docSnapshot => {
                    const userData = docSnapshot.data();
                    studfents.push({ ...userData, id: docSnapshot.id } as Student);
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

    updateStudentGrades(userId: string, lessonId: string, grade: string) {
        const userRef = doc(this.firestore, 'users', userId);

        return from(getDoc(userRef)).pipe(
            mergeMap(docSnapshot => {
                if (docSnapshot.exists()) {
                    const userData = docSnapshot.data();

                    const updatedGrades = [...(userData['grades'] || []), { lessonId, grade }];

                    return from(updateDoc(userRef, { grades: updatedGrades }));
                } else {
                    return of(null);
                }
            }),
            catchError(error => {
                console.error("Error updating grades for student: ", error);
                return of(null);
            })
        );
    }

    editStudentGrade(studentId: string, lessonId: string, grade: string) {
        const studentRef = doc(this.firestore, 'users', studentId);
        return from(getDoc(studentRef)).pipe(
            switchMap((docSnap) => {
                if (docSnap.exists()) {
                    const data = docSnap.data() as any;
                    const existingGrades = data.grades || [];

                    const updatedGrades = existingGrades.map((g: any) =>
                        g.lessonId === lessonId ? { ...g, grade } : g
                    );

                    return from(updateDoc(studentRef, { grades: updatedGrades }));
                } else {
                    throw new Error('Student not found');
                }
            }),
            map(() => ({
                studentId,
                lessonId,
                grade
            })),
            catchError((error) => {
                console.error('Error updating grade', error);
                throw error;
            })
        );
    }

    deleteStudentGrade(studentId: string, lessonId: string) {
        const studentRef = doc(this.firestore, 'users', studentId);
        return from(getDoc(studentRef)).pipe(
            switchMap((docSnap) => {
                if (docSnap.exists()) {
                    const data = docSnap.data() as any;
                    const existingGrades = data.grades || [];

                    const updatedGrades = existingGrades.filter(
                        (g: any) => g.lessonId !== lessonId
                    );

                    return from(updateDoc(studentRef, { grades: updatedGrades }));
                } else {
                    throw new Error('Student not found');
                }
            }),
            map(() => true),
            catchError((error) => {
                console.error('Error deleting grade', error);
                throw error;
            })
        );
    }

    getLessonsForProfessor(professorId: string) {
        const lessonsRef = collection(this.firestore, 'lessons');
        const q = query(lessonsRef, where('professorId', '==', professorId));
        return firstValueFrom(
            from(getDocs(q)).pipe(
                map((querySnapshot) => {
                    const lessons: Lesson[] = [];
                    querySnapshot.forEach((doc) => {
                        lessons.push({ id: doc.id, ...doc.data() } as Lesson);
                    });
                    return lessons;
                }),
                catchError((error) => {
                    console.error('Error loading lessons for professor', error);
                    throw error;
                })
            )
        );
    }

    getStudentGrade(studentId: string, lessonId: string) {
        const studentRef = doc(this.firestore, 'users', studentId);
        return firstValueFrom(
            from(getDoc(studentRef)).pipe(
                map(docSnap => {
                    if (docSnap.exists()) {
                        const data = docSnap.data() as any;
                        const grades: Grade[] = data.grades || [];
                        const gradeEntry = grades.find(g => g.lessonId === lessonId);
                        return gradeEntry ? gradeEntry.grade : 'Not graded';
                    } else {
                        throw new Error('Student not found');
                    }
                }),
                catchError(error => {
                    console.error('Error getting student grade', error);
                    throw error;
                })
            )
        );
    }
}