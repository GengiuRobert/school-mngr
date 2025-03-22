import { inject, Injectable } from '@angular/core';
import { Actions, ofType, createEffect } from '@ngrx/effects';
import { map, mergeMap, catchError } from 'rxjs/operators';
import { addLesson, addLessonSuccess, addLessonFailure, loadLessons, loadLessonsFailure, loadLessonsSuccess } from './lesson.actions';
import { LessonsService } from '../../../services/lessons.service';
import { merge } from 'rxjs';
@Injectable()
export class LessonsEffects {

    private actions$ = inject(Actions);
    private lessonsService = inject(LessonsService)

    addLesson$ = createEffect(() =>
        this.actions$.pipe(
            ofType(addLesson),
            mergeMap((action) =>
                this.lessonsService.addLesson(action.lesson).pipe(
                    map((lesson) => addLessonSuccess({ lesson })),
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
}
