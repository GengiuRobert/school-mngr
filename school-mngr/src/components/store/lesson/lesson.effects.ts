import { inject, Injectable } from '@angular/core';
import { Actions, ofType, createEffect } from '@ngrx/effects';
import { map, mergeMap, catchError } from 'rxjs/operators';
import { addLesson, addLessonSuccess, addLessonFailure, loadLessons, loadLessonsFailure, loadLessonsSuccess, deleteLesson, deleteLessonSuccess, deleteLessonFailure, updateLesson, updateLessonFailure, updateLessonSuccess } from './lesson.actions';
import { LessonsService } from '../../../services/lessons.service';
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
                    map(() => deleteLessonSuccess({ lessonId: action.lessonId })),
                    catchError((error) => {
                        console.error(error);
                        return [deleteLessonFailure({ error })];
                    })
                ))
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
}
