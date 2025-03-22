import { createAction, props } from '@ngrx/store';
import { Lesson } from '../../../models/lesson.model';

export const addLesson = createAction(
    '[Lesson] Add Lesson',
    props<{ lesson: Omit<Lesson,'id'> }>()
);

export const addLessonSuccess = createAction(
    '[Lesson] Add Lesson Success',
    props<{ lesson: Omit<Lesson,'id'> }>()
);

export const addLessonFailure = createAction(
    '[Lesson] Add Lesson Failure',
    props<{ error: any }>()
);