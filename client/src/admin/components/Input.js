import React, { useState } from 'react';

// MUI
import { FormControl, TextField, InputAdornment } from '@mui/material';

// CammelCase Helper
const camelCase = (str) => {
  return str.charAt(0).toUpperCase() + str.slice(1).toLowerCase();
};

// COMPONENT
const Input = (props) => {
  // props
  const { id, label, inputType, defaultValue, required, camelCased, onChange } =
    props;

  // Input state
  const [text, setText] = useState({
    value: defaultValue || '',
    error: required && !defaultValue ? '* required' : null,
  });

  const validateChange = (event) => {
    let value = event.target.value;
    let error = null;

    // validators switch (TODO: implement more validators)
    switch (inputType) {
      case 'currency':
      case 'number':
        error = isNaN(value) ? 'Only digits allowed' : null;
        break;
      case 'tel':
        error = /^0\d([\d]{0,1})([-]{0,1})\d{7}$/.test(value)
          ? null
          : 'Incorrect Phone mask';
        break;
      case 'text':
        break; // TODO
      case 'email':
        error = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(value)
          ? null
          : 'Incorrect Email mask';
        break;

      default:
        break; // TODO
    }

    // reset back if necessary
    if (value === '') {
      if (defaultValue) {
        value = defaultValue;
        error = null;
      } else if (required) {
        error = '* required';
      }
    }

    if (camelCased && inputType === 'text') {
      value = camelCase(value);
    }

    // update state
    setText({ value, error });

    // inform parent only when valid
    onChange && onChange(event);
  };

  return (
    <FormControl fullWidth>
      <TextField
        fullWidth
        id={id}
        label={label}
        type={inputType}
        value={text.value}
        onChange={validateChange}
        size="small"
        error={!!text.error}
        helperText={text.error}
        InputProps={
          inputType === 'currency'
            ? {
                startAdornment: (
                  <InputAdornment position="start">$</InputAdornment>
                ),
              }
            : null
        }
      />
    </FormControl>
  );
};

export default Input;
