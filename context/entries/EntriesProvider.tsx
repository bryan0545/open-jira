import { FC, PropsWithChildren, useReducer } from 'react';
import { Entry } from '../../interfaces';
import { EntriesContext, entriesReducer } from './';
import { v4 as uuidv4 } from 'uuid';
import NewEntry from '../../components/ui/NewEntry';

export interface EntriesState {
  entries: Entry[];
}

const EntriesInitialState: EntriesState = {
  entries: [
    {
      _id: uuidv4(),
      description: 'pending Lorem ipsum dolor sit amet consectetur, adipisicing elit. Iusto autem praesentium dolor',
      status: 'pending',
      createdAt: Date.now(),
    },
    {
      _id: uuidv4(),
      description:
        'in-progress Lorem ipsum dolor sit amet consectetur, adipisicing elit. Iusto autem praesentium dolor',
      status: 'in-progress',
      createdAt: Date.now() - 1000000,
    },
    {
      _id: uuidv4(),
      description: 'finished Lorem ipsum dolor sit amet consectetur, adipisicing elit. Iusto autem praesentium dolor',
      status: 'finished',
      createdAt: Date.now() - 200000,
    },
  ],
};

export const EntriesProvider: FC<PropsWithChildren> = ({ children }) => {
  const [state, dispatch] = useReducer(entriesReducer, EntriesInitialState);

  const addNewEntry = (description: string) => {
    const newEntry: Entry = {
      _id: uuidv4(),
      description,
      createdAt: Date.now(),
      status: 'pending',
    };

    dispatch({ type: '[Entry] Add-Entry', payload: newEntry });
  };

  const updateEntry = (entry: Entry) => {
    dispatch({ type: '[Entry] Entry-Updated', payload: entry });
  };

  return (
    <EntriesContext.Provider
      value={{
        ...state,
        addNewEntry,
        updateEntry,
      }}
    >
      {children}
    </EntriesContext.Provider>
  );
};
