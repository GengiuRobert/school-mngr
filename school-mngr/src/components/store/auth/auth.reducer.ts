import { createReducer, on } from '@ngrx/store';
import { signUpSuccess, logInSuccess, logout, signUpFailure, logInFailure, logoutSuccess, logoutFailure, logIn, signUp } from './auth.actions';
import { User } from '../../../models/user.model';

export interface AuthState {
    user: User | null;
    error: string | null;
}

export const initialState: AuthState = {
    user: null,
    error: null,
};

export const authReducer = createReducer(
    initialState,
    on(signUp, (state) => ({ ...state, error: null, })),
    on(signUpSuccess, (state, { user }) => ({ ...state, user, error: null })),
    on(signUpFailure, (state, { error }) => ({ ...state, error: error })),
    on(logIn, (state) => ({ ...state, error: null })),
    on(logInSuccess, (state, { user }) => ({ ...state, user, error: null })),
    on(logInFailure, (state, { error }) => ({ ...state, error: error })),
    on(logout, (state) => ({ ...state, user: null })),
    on(logoutSuccess, (state) => ({ ...state, user: null })),
    on(logoutFailure, (state, { error }) => ({ ...state, error: error }))
);
