import { inject, Injectable } from '@angular/core';
import { Actions, ofType, createEffect } from '@ngrx/effects';
import { loadStudents, loadStudentsSuccess, loadStudentsFailure, updateStudentGradesSuccess, updateStudentGradesFailure, updateStudentGrades } from './students.actions';
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

    addGradeSuccess$ = createEffect(() =>
        this.actions$.pipe(
          ofType(updateStudentGrades),
          mergeMap(({ userId, lessonId, grade }) => {
      
            return this.userService.updateStudentGrades(userId, lessonId, grade).pipe(
              map(() => {
                return updateStudentGradesSuccess({ userId, lessonId, grade }); 
              }),
              catchError((error) => {
                return of(updateStudentGradesFailure({ error }));
              })
            );
          })
        )
      );
}
