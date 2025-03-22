import { createAction, props } from '@ngrx/store';
import { User } from '../../../models/user.model';

export const loadProfessors = createAction('[Professor] Load Professors');

export const loadProfessorsSuccess = createAction(
    '[Professor] Load Professors Success',
    props<{ professors: User[] }>()
);

export const loadProfessorsFailure = createAction(
    '[Professor] Load Professors Failure',
    props<{ error: any }>()
);