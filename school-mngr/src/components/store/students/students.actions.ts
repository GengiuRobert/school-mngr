import { createAction, props } from '@ngrx/store';
import { Student } from '../../../models/student.model';

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

export const editGrade = createAction(
    '[Students] Edit Grade',
    props<{ userId: string; lessonId: string; grade: string }>()
);

export const editGradeSucccess = createAction(
    '[Students] Edit Grade',
    props<{ userId: string; lessonId: string; grade: string }>()
);

export const editGradeFailure = createAction(
    '[Students] Edit Grade',
    props<{ error: any }>()
);

export const deleteGrade = createAction(
    '[Students] Delete Grade',
    props<{ userId: string; lessonId: string }>()
);

export const deleteGradeSuccess = createAction(
    '[Students] Delete Grade Success',
    props<{ userId: string; lessonId: string }>()
);

export const deleteGradeFailure = createAction(
    '[Students] Delete Grade Failure',
    props<{ error: any }>()
);

export const loadStudentGrade = createAction(
    '[Student] Load Student Grade',
    props<{ studentId: string; lessonId: string }>()
);

export const loadStudentGradeSuccess = createAction(
    '[Student] Load Student Grade Success',
    props<{ studentId: string; lessonId: string; grade: string }>()
);

export const loadStudentGradeFailure = createAction(
    '[Student] Load Student Grade Failure',
    props<{ error: any }>()
);