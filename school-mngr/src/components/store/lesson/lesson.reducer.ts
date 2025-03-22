import { createReducer, on } from '@ngrx/store';
import { Lesson } from '../../../models/lesson.model';
import { addLessonFailure, addLessonSuccess, loadLessonsFailure, loadLessonsSuccess } from './lesson.actions';

export interface LessonState {
    lessons: Lesson[];
    error: string | null;
}

export const initialState: LessonState = {
    lessons: [],
    error: null
};

export const LessonReducer = createReducer(
    initialState,
    on(addLessonSuccess, (state, { lesson }) => ({
        ...state,
        lessons: [...state.lessons, lesson],
        error: null
    })),
    on(addLessonFailure, (state, { error }) => ({
        ...state,
        error
    })),
    on(loadLessonsSuccess, (state, { lessons }) => ({
        ...state,
        lessons,
        error: null
    })),
    on(loadLessonsFailure, (state, { error }) => ({
        ...state,
        error
    }))
);