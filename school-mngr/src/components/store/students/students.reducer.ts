import { createReducer, on } from '@ngrx/store';
import { loadStudentsSuccess, loadStudentsFailure, updateStudentGradesSuccess, updateStudentGradesFailure, editGrade, editGradeSucccess, editGradeFailure, deleteGradeSuccess, deleteGradeFailure, loadStudentGradeSuccess, loadStudentGradeFailure } from './students.actions';
import { Student } from '../../../models/student.model';

export interface StudentsState {
    students: Student[];
    loading: boolean;
    error: string | null;
}

export const initialState: StudentsState = {
    students: [],
    loading: false,
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
    on(loadStudentGradeSuccess, (state, { studentId, lessonId, grade }) => {
        const updatedStudents = state.students.map(student => {
            if (student.id === studentId) {
                const existingGrade = student.grades.find(g => g.lessonId === lessonId);
                if (existingGrade) {
                    return {
                        ...student,
                        grades: student.grades.map(g =>
                            g.lessonId === lessonId ? { lessonId, grade } : g
                        )
                    };
                } else {
                    return {
                        ...student,
                        grades: [...student.grades, { lessonId, grade }]
                    };
                }
            }
            return student;
        });
        return {
            ...state,
            loading: false,
            students: updatedStudents,
        };
    }),
    on(loadStudentGradeFailure, (state, { error }) => ({
        ...state,
        loading: false,
        error,
    }))
);
