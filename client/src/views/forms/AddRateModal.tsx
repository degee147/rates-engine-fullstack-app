import * as React from 'react';
import axios from 'axios';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import { styled } from '@mui/material/styles'
import Button, { ButtonProps } from '@mui/material/Button'

import Card from '@mui/material/Card'
import Grid from '@mui/material/Grid'
import CardContent from '@mui/material/CardContent'


const ButtonStyled = styled(Button)<ButtonProps & { component?: ElementType; htmlFor?: string }>(({ theme }) => ({
  [theme.breakpoints.down('sm')]: {
    width: '100%',
    textAlign: 'center'
  }
}))


const AddRateModal = (setStatusBase) => {
  const [open, setOpen] = React.useState(false);

  const initialState = {
    cob_name: "",
    route_id: "",
    loading_place: "",
    destination: "",
    load_type: "",
    vehicle_type: "",
    latest_rate: 0,
    trip_configuration: ""
  };

  const [formInput, setFormInput] = React.useReducer(
    (state, newState) => ({ ...state, ...newState }),
    initialState
  );


  const handleChange = (e) => {
    const name = e.target.name;
    const newValue = e.target.value;
    setFormInput({ [name]: newValue });

  };

  const onSubmit = async (e) => {
    e.preventDefault();
    if (Object.keys(formInput).map(e => formInput[e]).some(a => a.length === 0)) {
      //some are empty
      setStatusBase({ msg: "All fields are required", key: Math.random() });
    } else {

      try {
        const { data } = await axios.post('http://localhost:5000/api/v1/rates', formInput);
        console.log(data);
        const { rate, msg } = data;
        setOpen(false);
        setStatusBase({ msg, key: Math.random() });
      } catch (error) {
        console.log(error);
        setStatusBase({ msg: "An error occured", key: Math.random() });
      }
    }

  };

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <div>
      <ButtonStyled component='label' variant='contained' htmlFor='add-rate' onClick={handleClickOpen}>
        New Rate
      </ButtonStyled>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Add Transport Rate</DialogTitle>
        <DialogContent>
          <Card>
            <CardContent>
              <form onSubmit={e => e.preventDefault()}>
                <Grid container spacing={5}>
                  <Grid item xs={12}>
                    <TextField fullWidth label='Name' placeholder='Name'
                      required
                      name="cob_name"
                      onChange={handleChange} />
                  </Grid>
                  <Grid item xs={12}>
                    <TextField
                      fullWidth
                      required
                      type='text'
                      label='Route ID'
                      placeholder='Route ID'
                      helperText='E.g RFG_ROUTE906'
                      name="route_id"
                      onChange={handleChange}
                    />
                  </Grid>

                  <Grid item xs={12}>
                    <TextField
                      fullWidth
                      required
                      type='text'
                      label='Loading Place'
                      placeholder='Loading Place'
                      helperText='E.g Western Cape - Wellington'
                      name="loading_place"
                      onChange={handleChange}
                    />
                  </Grid>

                  <Grid item xs={12}>
                    <TextField
                      fullWidth
                      required
                      type='text'
                      label='Destination'
                      placeholder='Destination'
                      helperText='E.g North-West - Lichtenburg'
                      name="destination"
                      onChange={handleChange}
                    />
                  </Grid>

                  <Grid item xs={12}>
                    <TextField
                      fullWidth
                      required
                      type='text'
                      label='Load Type'
                      placeholder='Load Type'
                      helperText='E.g Part load'
                      name="load_type"
                      onChange={handleChange}
                    />
                  </Grid>

                  <Grid item xs={12}>
                    <TextField
                      fullWidth
                      required
                      type='text'
                      label='Vehicle Type'
                      placeholder='Vehicle Type'
                      helperText='E.g 34 Ton - Tautliner (Superlink) Part load'
                      name="vehicle_type"
                      onChange={handleChange}
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <TextField
                      fullWidth
                      required
                      type='number'
                      label='Latest Rate'
                      placeholder='Latest Rate'
                      helperText='E.g 20000'
                      name="latest_rate"
                      onChange={handleChange}
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <TextField
                      fullWidth
                      required
                      type='text'
                      label='Trip Configuration'
                      placeholder='Trip Configuration'
                      helperText='E.g One way'
                      name="trip_configuration"
                      onChange={handleChange}
                    />
                  </Grid>

                </Grid>
              </form>
            </CardContent>
          </Card>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button type='submit' variant='contained' size='large' onClick={onSubmit}>
            Save
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}

export default AddRateModal
