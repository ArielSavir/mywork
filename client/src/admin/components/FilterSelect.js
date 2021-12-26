import React from 'react';

// MUI
import { InputLabel, MenuItem, FormControl, Select } from '@mui/material';

const FilterSelect = (props) => {
  const { filter, onSelect } = props;

  const handleChange = (event) => {
    const selected = event.target.value;
    console.log('selected', selected);
    onSelect && onSelect(selected);
  };

  return (
    <div style={styles.container}>
      <span>{filter.type}</span>
      <FormControl fullWidth>
        <InputLabel id="filter-label">{filter.type}</InputLabel>
        <Select
          labelId="filter-label"
          id="filter"
          value={filter.type}
          label="Age"
          onChange={handleChange}
        >
          {filter.map((item, index) => (
            <MenuItem key={index} value={item.selector}>
              {item.selector}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    </div>
  );
};

const styles = {
  container: {
    width: '100%',
    padding: 5,
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderRadius: 5,
    borderWidth: 1,
    borderColor: '#ccc',
  },
};
export default FilterSelect;
