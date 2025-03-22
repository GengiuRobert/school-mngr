import { createReducer, on } from '@ngrx/store';
import { loadStudentsSuccess, loadStudentsFailure } from './students.actions';
import { User } from '../../../models/user.model';

export interface StudentsState {
    students: User[];
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
    }))
);
