import { inject, Injectable } from '@angular/core';
import { Actions, ofType, createEffect } from '@ngrx/effects';
import { map, mergeMap, catchError } from 'rxjs/operators';
import { addLesson, addLessonSuccess, addLessonFailure } from './lesson.actions';
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
                    map((lesson) => addLessonSuccess({ lesson })),
                    catchError((error) => {
                        console.error(error);
                        return [addLessonFailure({ error })];
                    })
                )
            )
        )
    );
}
