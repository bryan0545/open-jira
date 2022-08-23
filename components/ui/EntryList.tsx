import { List, Paper } from '@mui/material';
import EntryCard from './EntryCard';
import { DragEvent, FC, useContext, useMemo } from 'react';
import { EntriesContext } from '../../context/entries';
import { EntryStatus } from '../../interfaces';
import { UIContext } from '../../context';
import styles from './EntryList.module.css';

interface Props {
  status: EntryStatus;
}

const EntryList: FC<Props> = ({ status }) => {
  const { entries, updateEntry } = useContext(EntriesContext);
  const { isDragging, endDragging } = useContext(UIContext);

  const entriesFiltered = useMemo(() => entries.filter((entry) => entry.status === status), [entries]);

  const allowDrop = (event: DragEvent<HTMLDivElement>) => {
    event.preventDefault();
  };

  const onDropEntry = (event: DragEvent<HTMLDivElement>) => {
    const id = event.dataTransfer.getData('text');
    const entry = entries.find((entry) => entry._id === id)!;
    entry.status = status;
    updateEntry(entry);
    endDragging();
  };

  return (
    <div onDrop={onDropEntry} onDragOver={allowDrop} className={isDragging ? styles.dragging : ''}>
      <Paper
        sx={{ height: 'calc(100vh - 180px)', overflow: 'scroll', backgroundColor: 'transparent', padding: '1px 5px' }}
      >
        <List sx={{ opacity: isDragging ? 0.2 : 1, transition: 'all .3s' }}>
          {entriesFiltered.map((entry) => (
            <EntryCard key={entry._id} entry={entry} />
          ))}
        </List>
      </Paper>
    </div>
  );
};
export default EntryList;
