import { ChangeEvent, useContext, useState } from 'react';
import { Box, Button, TextField } from '@mui/material';
import MailOutlinedIcon from '@mui/icons-material/SaveOutlined';
import AddIcon from '@mui/icons-material/AddCircleOutlineOutlined';

import { UIContext, EntriesContext } from '../../context/';

const NewEntry = () => {
  const { addNewEntry } = useContext(EntriesContext);
  const { isAddingEntry, setIsAddingEntry } = useContext(UIContext);

  const [inputValue, setInputValue] = useState('');
  const [touched, setTouched] = useState(false);

  const onTextChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setInputValue(e.target.value);
  };

  const onSave = () => {
    if (inputValue.length === 0) return;
    addNewEntry(inputValue);
    setIsAddingEntry(false);
    setTouched(false);
    setInputValue('');
  };

  return (
    <Box sx={{ marginBottom: 2, paddingX: 2 }}>
      {isAddingEntry ? (
        <>
          <TextField
            fullWidth
            placeholder="Nueva entrada"
            autoFocus
            multiline
            label="Nueva entrada"
            helperText={inputValue.length <= 0 && touched && 'Ingrese un valor'}
            error={inputValue.length <= 0 && touched}
            onBlur={() => setTouched(true)}
            sx={{ marginTop: 2, marginBottom: 1 }}
            value={inputValue}
            onChange={onTextChange}
          />
          <Box display="flex" justifyContent="space-between">
            <Button onClick={onSave} variant="outlined" color="secondary" endIcon={<MailOutlinedIcon />}>
              Guardar
            </Button>
            <Button onClick={() => setIsAddingEntry(false)} variant="outlined" color="error">
              Cancelar
            </Button>
          </Box>
        </>
      ) : (
        <Button onClick={() => setIsAddingEntry(true)} startIcon={<AddIcon />} fullWidth variant="outlined">
          AGREGAR TAREA
        </Button>
      )}
    </Box>
  );
};
export default NewEntry;
