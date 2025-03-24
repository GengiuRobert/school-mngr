import { createAction, props } from '@ngrx/store';
import { User } from '../../../models/user.model';

export const signUp = createAction(
    '[Auth] Sign Up',
    props<{ email: string; password: string; role: string }>()
);

export const signUpSuccess = createAction(
    '[Auth] Sign Up Success',
    props<{ user: User }>()
);

export const signUpFailure = createAction(
    '[Auth] Sign Up Failure',
    props<{ error: any }>()
);

export const logIn = createAction(
    '[Auth] Log In',
    props<{ email: string; password: string }>()
);

export const logInSuccess = createAction(
    '[Auth] Log In Success',
    props<{ user: User }>()
);

export const logInFailure = createAction(
    '[Auth] Log In Failure',
    props<{ error: any }>()
);

export const logout = createAction('[Auth] Logout');

export const logoutSuccess = createAction('[Auth] Logout Success');

export const logoutFailure = createAction(
  '[Auth] Logout Failure',
  props<{ error: any }>()
);