import { createReducer, on } from '@ngrx/store';
import { loadStudentsSuccess, loadStudentsFailure, updateStudentGradesSuccess, updateStudentGradesFailure } from './students.actions';
import { Student, User } from '../../../models/user.model';

export interface StudentsState {
    students: Student[];
    error: string | null;
}

export const initialState: StudentsState = {
    students: [],
    error: null,
};

export const studentsReducer = createReducer(
    initialState,
    on(loadStudentsSuccess, (state, { students }) => ({
        ...state,
        students,
        error: null,
    })),
    on(loadStudentsFailure, (state, { error }) => ({
        ...state,
        error,
    })),
    on(updateStudentGradesSuccess, (state, { userId, lessonId, grade }) => {
        const updatedStudents = state.students.map((student) =>
            student.id === userId
                ? {
                    ...student,
                    grades: student.grades ? [...student.grades, { lessonId, grade }] : [{ lessonId, grade }]
                }
                : student
        );

        return {
            ...state,
            students: updatedStudents,
            error: null,
        };
    }),
    on(updateStudentGradesFailure, (state, { error }) => ({
        ...state,
        error,
    }))
);
