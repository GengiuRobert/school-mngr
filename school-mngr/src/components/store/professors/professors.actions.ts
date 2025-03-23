import { createAction, props } from '@ngrx/store';
import { User } from '../../../models/user.model';
import { Lesson } from '../../../models/lesson.model';

export const loadProfessors = createAction('[Professor] Load Professors');

export const loadProfessorsSuccess = createAction(
    '[Professor] Load Professors Success',
    props<{ professors: User[] }>()
);

export const loadProfessorsFailure = createAction(
    '[Professor] Load Professors Failure',
    props<{ error: any }>()
);

export const loadLessonsForProfessor = createAction(
    '[Professor] Load Lessons For Professor',
    props<{ professorId: string }>()
);

export const loadLessonsForProfessorSuccess = createAction(
    '[Professor] Load Lessons For Professor Success',
    props<{ lessons: Lesson[] }>()
);

export const loadLessonsForProfessorFailure = createAction(
    '[Professor] Load Lessons For Professor Failure',
    props<{ error: any }>()
);