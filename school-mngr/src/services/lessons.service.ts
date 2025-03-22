import { Injectable } from "@angular/core";
import { addDoc, Firestore } from "@angular/fire/firestore";
import { Lesson } from "../models/lesson.model";
import { collection, getDocs } from "firebase/firestore";
import { catchError, from, map, of } from "rxjs";

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
}


