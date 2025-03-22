import { createReducer, on } from '@ngrx/store';
import { Lesson } from '../../../models/lesson.model';
import { addLessonFailure, addLessonSuccess, deleteLessonFailure, deleteLessonSuccess, loadLessonsFailure, loadLessonsSuccess, updateLessonFailure, updateLessonSuccess } from './lesson.actions';

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
    })),
    on(updateLessonSuccess, (state, { lesson }) => {
        const updatedLessons = state.lessons.map(l =>
            l.id === lesson.id ? { ...l, ...lesson } : l
        );
        return {
            ...state,
            lessons: updatedLessons,
            error: null
        };
    }),
    on(updateLessonFailure, (state, { error }) => ({
        ...state,
        error
    })),
    on(deleteLessonSuccess, (state, { lessonId }) => ({
        ...state,
        lessons: state.lessons.filter(l => l.id !== lessonId),
        error: null
    })),
    on(deleteLessonFailure, (state, { error }) => ({
        ...state,
        error
    }))
);