import { createReducer, on } from '@ngrx/store';
import { loadProfessorsSuccess, loadProfessorsFailure } from './professors.actions';
import { User } from '../../../models/user.model';
import { Lesson } from '../../../models/lesson.model';

export interface ProfessorsState {
    professors: User[];
    error: string | null;
}

export const initialState: ProfessorsState = {
    professors: [],
    error: null,
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

);