import { createAction, props } from '@ngrx/store';
import { Student } from '../../../models/user.model';

export const loadStudents = createAction('[Students] Load Students');

export const loadStudentsSuccess = createAction(
    '[Students] Load Students Success',
    props<{ students: Student[] }>()
);

export const loadStudentsFailure = createAction(
    '[Students] Load Students Failure',
    props<{ error: any }>()
);

export const updateStudentGrades = createAction(
    '[Students] Add Grade',
    props<{ userId: string; lessonId: string; grade: string }>()
);

export const updateStudentGradesSuccess = createAction(
    '[Students] Update Student Grades Success',
    props<{ userId: string, lessonId: string, grade: string }>()
);

export const updateStudentGradesFailure = createAction(
    '[Students] Update Student Grades Failure',
    props<{ error: any }>()
);