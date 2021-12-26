import React, { useState } from 'react';
import {
  Box,
  FormControl,
  MenuItem,
  Select,
  InputLabel,
  FormHelperText,
} from '@mui/material';

const Selector = (props) => {
  const { id, selectors, defaultIndex, label, required, onSelect } = props;

  const [value, setValue] = useState(selectors[defaultIndex] || '');
  const handleChange = (event) => {
    setValue(event.target.value);
    event.target.id = id;
    onSelect && onSelect(event);
  };

  return (
    <Box sx={{ width: 1 }}>
      <FormControl fullWidth error={required && !value}>
        <InputLabel id="select-label">{label}</InputLabel>
        <Select
          labelId="select-label"
          id={id}
          value={value}
          label={label}
          size="small"
          onChange={handleChange}
        >
          {selectors.map((item, index) => (
            <MenuItem key={index} value={item}>
              {item}
            </MenuItem>
          ))}
        </Select>
        {required && !value && <FormHelperText>* required</FormHelperText>}
      </FormControl>
    </Box>
  );
};

export default Selector;
