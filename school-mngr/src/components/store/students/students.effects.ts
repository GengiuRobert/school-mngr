import { inject, Injectable } from '@angular/core';
import { Actions, ofType, createEffect } from '@ngrx/effects';
import { loadStudents, loadStudentsSuccess, loadStudentsFailure } from './students.actions';
import { UserService } from '../../../services/users.service';
import { catchError, map, mergeMap } from 'rxjs/operators';
import { of } from 'rxjs';

@Injectable()
export class StudentsEffects {
    private actions$ = inject(Actions);
    private userService = inject(UserService);

    loadStudents$ = createEffect(() =>
        this.actions$.pipe(
            ofType(loadStudents),
            mergeMap(() =>
                this.userService.getAllStudents().pipe(
                    map((students) => loadStudentsSuccess({ students })),
                    catchError((error) => of(loadStudentsFailure({ error })))
                )
            )
        )
    );
}
