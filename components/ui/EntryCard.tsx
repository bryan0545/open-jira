import { capitalize, Card, CardActionArea, CardActions, CardContent, Typography } from '@mui/material';
import { useRouter } from 'next/router';
import { DragEvent, FC, useContext } from 'react';
import { UIContext } from '../../context';
import { Entry } from '../../interfaces';
import { dateFunctions } from '../../utils/';

interface Props {
  entry: Entry;
}

const EntryCard: FC<Props> = ({ entry }) => {
  const router = useRouter();
  const { startDragging, endDragging } = useContext(UIContext);

  const onDragStart = (event: DragEvent<HTMLDivElement>) => {
    event.dataTransfer.setData('text', entry._id);
    startDragging();
  };

  const onDragEnd = () => {
    endDragging();
  };

  const onClick = () => {
    router.push(`/entries/${entry._id}`);
  };

  return (
    <Card onClick={onClick} sx={{ marginBottom: 1 }} draggable onDragStart={onDragStart} onDragEnd={onDragEnd}>
      <CardActionArea>
        <CardContent>
          <Typography sx={{ whiteSpace: 'pre-line' }}>{entry.description}</Typography>
        </CardContent>
        <CardActions sx={{ display: 'flex', justifyContent: 'end', paddingRight: 2 }}>
          <Typography variant="body2">{capitalize(dateFunctions.getFormatDistanceFromNow(entry.createdAt))}</Typography>
        </CardActions>
      </CardActionArea>
    </Card>
  );
};
export default EntryCard;
