import { createReducer, on } from '@ngrx/store';
import {
    loadProfessorsSuccess,
    loadProfessorsFailure,
    loadLessonsForProfessor,
    loadLessonsForProfessorSuccess,
    loadLessonsForProfessorFailure
} from './professors.actions';
import { User } from '../../../models/user.model';
import { Lesson } from '../../../models/lesson.model';

export interface ProfessorsState {
    professors: User[];
    lessonsForProfessor: Lesson[];
    error: string | null;
    loading: boolean;
}

export const initialState: ProfessorsState = {
    professors: [],
    lessonsForProfessor: [],
    error: null,
    loading: false,
};

export const professorsReducer = createReducer(
    initialState,

    on(loadProfessorsSuccess, (state, { professors }) => ({
        ...state,
        professors,
        error: null,
    })),
    on(loadProfessorsFailure, (state, { error }) => ({
        ...state,
        error,
    })),

    on(loadLessonsForProfessor, (state) => ({
        ...state,
        loading: true,
        error: null
    })),

    on(loadLessonsForProfessorSuccess, (state, { lessons }) => ({
        ...state,
        loading: false,
        lessonsForProfessor: lessons
    })),

    on(loadLessonsForProfessorFailure, (state, { error }) => ({
        ...state,
        loading: false,
        error
    }))
);
