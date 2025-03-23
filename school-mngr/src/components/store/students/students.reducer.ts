import { createReducer, on } from '@ngrx/store';
import { loadStudentsSuccess, loadStudentsFailure, updateStudentGradesSuccess, updateStudentGradesFailure, editGrade, editGradeSucccess, editGradeFailure, deleteGradeSuccess, deleteGradeFailure } from './students.actions';
import { Student } from '../../../models/student.model';
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
    })),
    on(editGradeSucccess, (state, { userId, lessonId, grade }) => {
        const updatedStudents = state.students.map((student) =>
            student.id === userId
                ? {
                    ...student,
                    grades: student.grades.map((g) =>
                        g.lessonId === lessonId ? { ...g, grade: grade } : g
                    ),
                }
                : student
        );
        return {
            ...state,
            students: updatedStudents,
            error: null,
        };
    }),
    on(editGradeFailure, (state, { error }) => ({
        ...state,
        error: error,

    })),
    on(deleteGradeSuccess, (state, { userId, lessonId }) => {
        const updatedStudents = state.students.map((student) =>
            student.id === userId
                ? {
                    ...student,
                    grades: student.grades.filter((g) => g.lessonId !== lessonId)
                }
                : student
        );

        return {
            ...state,
            students: updatedStudents,
            error: null,
        };
    }),
    on(deleteGradeFailure, (state, { error }) => ({
        ...state,
        error: error,
    })),
);
