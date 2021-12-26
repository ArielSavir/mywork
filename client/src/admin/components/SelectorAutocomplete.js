import React, { useState } from 'react';
import { Autocomplete, TextField, Box, FormControl } from '@mui/material';
import useEnhancedEffect from '@mui/material/utils/useEnhancedEffect';

// CammelCase Helper
const camelCase = (str) => {
  return str.charAt(0).toUpperCase() + str.slice(1).toLowerCase();
};

// COMPONENT
const SelectorAutocomplete = (props) => {
  const { id, label, options, onSelect } = props;

  const [value, setValue] = useState('');
  const onInputChange = (value) => {
    let camelValue = camelCase(value);
    setValue(camelValue);
    onSelect && onSelect(id, camelValue);
  };

  return (
    <Box sx={{ width: 1 }}>
      <FormControl fullWidth>
        <Autocomplete
          sx={{ width: 1 }}
          freeSolo
          id={id}
          onInputChange={(event, newInputValue) => {
            onInputChange(newInputValue);
          }}
          options={options}
          value={value}
          renderInput={(params) => (
            <TextField {...params} label={label} size="small" />
          )}
        />
      </FormControl>
    </Box>
  );
};

export default SelectorAutocomplete;
