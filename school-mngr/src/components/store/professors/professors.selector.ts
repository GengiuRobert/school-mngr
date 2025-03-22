import { createFeatureSelector, createSelector } from '@ngrx/store';
import { ProfessorsState } from './professors.reducer';

export const selectProfessorState = createFeatureSelector<ProfessorsState>('professors');

export const selectAllProfessors = createSelector(
    selectProfessorState,
    (state: ProfessorsState) => state.professors 
);