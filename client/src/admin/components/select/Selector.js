import React, { useState } from 'react';
import { Box, FormControl, MenuItem, Select, InputLabel } from '@mui/material';

const Selector = (props) => {
  const { selectors, label, onSelect } = props;

  const [value, setValue] = useState('');
  const handleChange = (event) => {
    let value = event.target.value;
    setValue(value);
    onSelect && onSelect(value);
  };

  return (
    <Box sx={{ minWidth: 120 }}>
      <FormControl fullWidth>
        <InputLabel id="select-label">{label}</InputLabel>
        <Select
          labelId="select-label"
          id="select"
          value={value}
          label={label}
          onChange={handleChange}
        >
          {selectors.map((item, index) => (
            <MenuItem key={index} value={item}>
              {item}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    </Box>
  );
};

export default Selector;
