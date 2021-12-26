import React, { useState, useEffect } from 'react';

// MUI
import { Box, Grid, TextField, Button, Alert } from '@mui/material';

// COMPONENTS
import Selector from '../select/Selector';

const FilterAdd = (props) => {
  const { selectors, onCreateFilter, error } = props;

  useEffect(() => {
    setShowAlert(error);
  }, [error]);

  // STATE
  const [inputs, setInputs] = useState(['', '', false]);

  // TEXT FIELDS HANDLERS
  const onInputChange = (event) => {
    let state = inputs;
    state[+event.target.id] = event.target.value;
    state[2] = state[0] !== '' && state[1] !== '';
    setInputs(state);
    setShowAlert(null);
  };

  // SELECT HANDLER
  const onSelect = (value) => {
    let state = inputs;
    state[0] = value;
    setInputs(state);
    setShowAlert(null);
  };

  // ALERT HANDLER
  const [showAlert, setShowAlert] = useState(null);
  const onFilterAdd = () => {
    if (inputs[2] && onCreateFilter) {
      onCreateFilter && onCreateFilter({ type: inputs[0], variant: inputs[1] });
    } else {
      setShowAlert('Missing required fields');
    }
  };

  return (
    <Box>
      <Grid
        container
        spacing={2}
        flexDirection={'column'}
        justifyContent={'flex-start'}
        alignItems={'center'}
      >
        <Grid item>Create new filter</Grid>
        <Grid item>
          {selectors && selectors.length > 0 ? (
            <Selector
              fullWidth
              selectors={selectors}
              label={'Select filter'}
              onSelect={onSelect}
            />
          ) : (
            <TextField
              fullWidth
              id={'0'}
              label="Filter type"
              variant="outlined"
              onChange={onInputChange}
            />
          )}
        </Grid>
        <Grid item>
          <TextField
            fullWidth
            id={'1'}
            label="Filter variant"
            variant="outlined"
            onChange={onInputChange}
          />
        </Grid>
        <Grid item>
          <Button variant="contained" color="success" onClick={onFilterAdd}>
            Submit
          </Button>
        </Grid>
        {showAlert && (
          <Grid item>
            <Alert severity="error" color="error">
              {showAlert}
            </Alert>
          </Grid>
        )}
      </Grid>
    </Box>
  );
};

export default FilterAdd;
