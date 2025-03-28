import { Injectable } from "@angular/core";
import { addDoc, Firestore } from "@angular/fire/firestore";
import { Lesson } from "../models/lesson.model";
import { collection, deleteDoc, doc, getDoc, getDocs, query, updateDoc, where } from "firebase/firestore";
import { catchError, from, map, mergeMap, of } from "rxjs";

@Injectable({ providedIn: 'root' })
export class LessonsService {

    constructor(private firestore: Firestore) { }

    addLesson(lesson: Omit<Lesson, 'id'>) {
        const lessonRef = collection(this.firestore, 'lessons');
        return from(
            addDoc(lessonRef, {
                name: lesson.name,
                studentsId: lesson.studentsId,
                professorId: lesson.professorId
            })
        ).pipe(
            map((lessonRef) => {
                console.log("Lesson added to Firestore with ID:", lessonRef.id);
                return { ...lesson, id: lessonRef.id };
            }),
            catchError((error) => {
                console.error("Error adding lesson to Firestore:", error);
                throw error;
            })
        );
    }

    getAllLessons() {
        const lessonRef = collection(this.firestore, 'lessons');
        return from(getDocs(lessonRef)).pipe(
            map(querySnapshot => {
                const lessons: Lesson[] = [];
                querySnapshot.forEach(docSnapshot => {
                    const lessonData = docSnapshot.data();
                    lessons.push({ ...lessonData, id: docSnapshot.id } as Lesson);
                });
                return lessons;
            }),
            catchError(error => {
                console.error("Error getting lessons from Firestore: ", error);
                return of([]);
            })
        );
    }

    updateLesson(id: string, changes: Partial<Lesson>) {
        const lessonRef = doc(this.firestore, 'lessons', id);
        return from(updateDoc(lessonRef, changes)).pipe(
            map(() => {
                console.log("Lesson updated in Firestore");
                return { ...changes, id };
            }),
            catchError((error) => {
                console.error("Error updating lesson in Firestore:", error);
                throw error;
            })
        );
    }

    deleteLesson(id: string) {
        const lessonRef = doc(this.firestore, 'lessons', id);
        return from(deleteDoc(lessonRef)).pipe(
            map(() => {
                console.log("Lesson deleted successfully");
                return id;
            }),
            catchError((error) => {
                console.error("Error deleting lesson from Firestore:", error);
                throw error;
            })
        );
    }

    assignProfessorToLesson(lessonId: string, professorId: string) {
        const lessonRef = doc(this.firestore, 'lessons', lessonId);
        return from(updateDoc(lessonRef, { professorId })).pipe(
            map(() => ({ lessonId, professorId })),
            catchError((error) => {
                console.error("Error assigning professor:", error);
                throw error;
            })
        );
    }

    assignStudentToLesson(lessonId: string, studentId: string) {
        const lessonRef = doc(this.firestore, 'lessons', lessonId);

        return from(getDoc(lessonRef)).pipe(
            mergeMap((docSnapshot) => {
                const lessonData = docSnapshot.data();
                const currentStudents = lessonData?.["studentsId"] || [];
                const updatedStudents = [...currentStudents, studentId];

                return from(updateDoc(lessonRef, { studentsId: updatedStudents })).pipe(
                    map(() => ({ lessonId, studentId })),
                    catchError((error) => {
                        console.error("Error adding student to lesson:", error);
                        throw error;
                    })
                );
            }),
            catchError((error) => {
                console.error("Error fetching lesson data:", error);
                throw error;
            })
        );
    }

}


