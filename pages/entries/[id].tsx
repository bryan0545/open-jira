import { ChangeEvent, FC, useContext, useMemo, useState } from 'react';
import { GetServerSideProps } from 'next';
import { Layout } from '../../components/layouts';
import { Entry, EntryStatus } from '../../interfaces/';
import {
  Card,
  CardHeader,
  Grid,
  CardContent,
  TextField,
  CardActions,
  Button,
  FormControl,
  FormLabel,
  RadioGroup,
  FormControlLabel,
  Radio,
  capitalize,
} from '@mui/material';
import SaveIcon from '@mui/icons-material/SaveOutlined';
import DeleteOutLineIcon from '@mui/icons-material/DeleteOutlined';
import { IconButton } from '@mui/material';
import { isValidObjectId } from 'mongoose';
import { KeyboardReturnSharp } from '@mui/icons-material';
import { dbEntries } from '../../database';
import { EntriesContext } from '../../context';
import { dateFunctions } from '../../utils';

const validStatus: EntryStatus[] = ['pending', 'in-progress', 'finished'];
interface Props {
  entry: Entry;
}

const EntryPage: FC<Props> = ({ entry }) => {
  const [inputValue, setInputValue] = useState(entry.description);
  const [status, setStatus] = useState(entry.status);
  const [touched, setTouched] = useState(false);
  const isNotValid = useMemo(() => inputValue.length <= 0 && touched, []);
  const { updateEntry } = useContext(EntriesContext);

  const onTextChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setInputValue(e.target.value);
  };

  const onStatusChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setStatus(e.target.value as EntryStatus);
  };

  const onSave = () => {
    if (inputValue.trim().length === 0) return;

    const updatedEntry: Entry = {
      ...entry,
      status,
      description: inputValue,
    };
    updateEntry(updatedEntry, true);
  };

  return (
    <Layout title={inputValue.substring(0, 20) + '...'}>
      <Grid container justifyContent="center" sx={{ marginTop: 2 }}>
        <Grid item xs={12} sm={8} md={6}>
          <Card>
            <CardHeader
              title={`Entrada: ${inputValue}`}
              subheader={`Creada ${dateFunctions.getFormatDistanceFromNow(entry.createdAt)}`}
            />
            <CardContent>
              <TextField
                sx={{ marginTop: 2, marginBottom: 1 }}
                placeholder="Nueva entrada"
                label="Nueva entrada"
                helperText={isNotValid ? 'Ingrese un valor' : ''}
                error={isNotValid}
                onBlur={() => setTouched(true)}
                value={inputValue}
                onChange={onTextChange}
                fullWidth
                autoFocus
              />
              <FormControl>
                <FormLabel>Estado: </FormLabel>
                <RadioGroup row onChange={onStatusChange} value={status}>
                  {validStatus.map((option) => (
                    <FormControlLabel key={option} value={option} label={capitalize(option)} control={<Radio />} />
                  ))}
                </RadioGroup>
              </FormControl>
            </CardContent>
            <CardActions>
              <Button
                startIcon={<SaveIcon />}
                disabled={inputValue.length <= 0}
                variant="contained"
                fullWidth
                onClick={onSave}
              >
                Save
              </Button>
            </CardActions>
          </Card>
        </Grid>
      </Grid>
      <IconButton sx={{ position: 'fixed', bottom: 30, right: 30, backgroundColor: 'error.dark' }}>
        <DeleteOutLineIcon />
      </IconButton>
    </Layout>
  );
};

export const getServerSideProps: GetServerSideProps = async ({ params }) => {
  const { id } = params as { id: string };
  const entry = await dbEntries.getEntryByID(id);

  if (!entry) {
    return {
      redirect: {
        destination: '/',
        permanent: false,
      },
    };
  }

  return {
    props: { entry },
  };
};

export default EntryPage;
