import { inject, Injectable } from '@angular/core';
import { Actions, ofType, createEffect } from '@ngrx/effects';
import { loadStudents, loadStudentsSuccess, loadStudentsFailure, updateStudentGradesSuccess, updateStudentGradesFailure, updateStudentGrades, editGrade, editGradeSucccess, editGradeFailure, deleteGrade, deleteGradeSuccess, deleteGradeFailure } from './students.actions';
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

  updateGrade$ = createEffect(() =>
    this.actions$.pipe(
      ofType(editGrade),
      mergeMap(({ userId, lessonId, grade }) =>
        this.userService.editStudentGrade(userId, lessonId, grade).pipe(
          map(() => editGradeSucccess({ userId, lessonId, grade })),
          catchError((error) => [editGradeFailure({ error })])
        )
      )
    )
  );

  deleteGrade$ = createEffect(() =>
    this.actions$.pipe(
      ofType(deleteGrade),
      mergeMap(({ userId, lessonId }) =>
        this.userService.deleteStudentGrade(userId, lessonId).pipe(
          map(() => deleteGradeSuccess({ userId, lessonId })),
          catchError((error) => of(deleteGradeFailure({ error })))
        )
      )
    )
  );
}


