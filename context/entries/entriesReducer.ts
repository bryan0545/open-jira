import { Entry } from '../../interfaces';
import { EntriesState } from './';

type EntriesReducerActionType =
  | { type: '[Entry] Add-Entry'; payload: Entry }
  | { type: '[Entry] Entry-Updated'; payload: Entry }
  | { type: '[Entry] Refresh-Data'; payload: Entry[] };

export const entriesReducer = (state: EntriesState, actions: EntriesReducerActionType): EntriesState => {
  switch (actions.type) {
    case '[Entry] Add-Entry':
      return {
        ...state,
        entries: [...state.entries, actions.payload],
      };

    case '[Entry] Entry-Updated':
      return {
        ...state,
        entries: state.entries.map((entry) => {
          if (entry._id === actions.payload._id) {
            entry.status === actions.payload.status;
            entry.description === actions.payload.description;
          }
          return entry;
        }),
      };
    case '[Entry] Refresh-Data':
      return {
        ...state,
        entries: [...actions.payload],
      };

    default:
      return state;
  }
};
