import { inject, Injectable } from '@angular/core';
import { Actions, ofType, createEffect } from '@ngrx/effects';
import { map, mergeMap, catchError } from 'rxjs/operators';
import { UserService } from '../../../services/users.service';
import { loadProfessors, loadProfessorsFailure, loadProfessorsSuccess } from './professors.actions';
import { of } from 'rxjs';
import { assignProfessor, assignProfessorFailure, assignProfessorSuccess } from '../lesson/lesson.actions';
@Injectable()
export class ProfessorEffects {

    private actions$ = inject(Actions);
    private userService = inject(UserService)


    loadProfessors$ = createEffect(() =>
        this.actions$.pipe(
            ofType(loadProfessors),
            mergeMap(() =>
                this.userService.getAllProfessors().pipe(
                    map((professors) => loadProfessorsSuccess({ professors })),
                    catchError((error) => {
                        console.error(error);
                        return [loadProfessorsFailure({ error })];
                    })
                )
            )
        )
    );

    assignProfessor$ = createEffect(() =>
        this.actions$.pipe(
            ofType(assignProfessor),
            mergeMap((action) =>
                this.userService.assignProfessorToLesson(action.lessonId, action.professorId).pipe(
                    map(() => assignProfessorSuccess({ lessonId: action.lessonId, professorId: action.professorId })),
                    catchError((error) => of(assignProfessorFailure({ error })))
                )
            )
        )
    );
}
