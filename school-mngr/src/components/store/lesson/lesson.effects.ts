import { inject, Injectable } from '@angular/core';
import { Actions, ofType, createEffect } from '@ngrx/effects';
import { map, mergeMap, catchError, concatMap } from 'rxjs/operators';
import { addLesson, addLessonSuccess, addLessonFailure, loadLessons, loadLessonsFailure, loadLessonsSuccess, deleteLesson, deleteLessonSuccess, deleteLessonFailure, updateLesson, updateLessonFailure, updateLessonSuccess, assignStudentToLesson, assignStudentToLessonSuccess, assignStudentToLessonFailure } from './lesson.actions';
import { LessonsService } from '../../../services/lessons.service';
import { of } from 'rxjs';
import { removeLessonFromStudentGrades, removeLessonFromStudentGradesSucccess } from '../students/students.actions';
@Injectable()
export class LessonsEffects {

    private actions$ = inject(Actions);
    private lessonsService = inject(LessonsService)

    addLesson$ = createEffect(() =>
        this.actions$.pipe(
            ofType(addLesson),
            mergeMap((action) =>
                this.lessonsService.addLesson(action.lesson).pipe(
                    map((newLesson) => addLessonSuccess({ lesson: newLesson })),
                    catchError((error) => {
                        console.error(error);
                        return [addLessonFailure({ error })];
                    })
                )
            )
        )
    );

    loadLessons$ = createEffect(() =>
        this.actions$.pipe(
            ofType(loadLessons),
            mergeMap(() =>
                this.lessonsService.getAllLessons().pipe(
                    map((lessons) => loadLessonsSuccess({ lessons })),
                    catchError((error) => {
                        console.error(error);
                        return [loadLessonsFailure({ error })];
                    })
                ))
        )
    );

    deleteLesson$ = createEffect(() =>
        this.actions$.pipe(
            ofType(deleteLesson),
            mergeMap((action) =>
                this.lessonsService.deleteLesson(action.lessonId).pipe(
                    concatMap(() => [
                        deleteLessonSuccess({ lessonId: action.lessonId }),
                        removeLessonFromStudentGradesSucccess({ lessonId: action.lessonId })
                    ]),
                    catchError((error) => {
                        console.error(error);
                        return of(deleteLessonFailure({ error }));
                    })
                )
            )
        )
    );

    updateLesson$ = createEffect(() =>
        this.actions$.pipe(
            ofType(updateLesson),
            mergeMap((action) =>
                this.lessonsService.updateLesson(action.id, action.changes).pipe(
                    map((updatedLesson) => updateLessonSuccess({ lesson: updatedLesson })),
                    catchError((error) => {
                        console.error(error);
                        return [updateLessonFailure({ error })];
                    })
                )
            )
        )
    );

    assignStudentToLesson$ = createEffect(() =>
        this.actions$.pipe(
            ofType(assignStudentToLesson),
            mergeMap((action) =>
                this.lessonsService.assignStudentToLesson(action.lessonId, action.studentId).pipe(
                    map(() => assignStudentToLessonSuccess({ lessonId: action.lessonId, studentId: action.studentId })),
                    catchError((error) => {
                        console.error(error);
                        return of(assignStudentToLessonFailure({ error }));
                    })
                )
            )
        )
    );


}
