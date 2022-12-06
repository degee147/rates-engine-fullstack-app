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


const EditRateModal = ({ rate, fetchData, setStatusBase }) => {

  const [open, setOpen] = React.useState(false);

  const initialState = rate;

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
      let id = rate._id;
      try {
        const { data } = await axios.patch(`http://localhost:5000/api/v1/rates/${id}`, formInput);
        console.log(data);
        const { rate, msg } = data;
        setOpen(false);
        setStatusBase({ msg, key: Math.random() });
        fetchData();
      } catch (error) {
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
      <ButtonStyled component='label' variant='contained' htmlFor='edit-rate' onClick={handleClickOpen}>
        Edit
      </ButtonStyled>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Edit Transport Rate {rate.cob_name}</DialogTitle>
        <DialogContent>
          <Card>
            <CardContent>
              <form onSubmit={e => e.preventDefault()}>
                <Grid container spacing={5}>
                  <Grid item xs={12}>
                    <TextField fullWidth label='Name' placeholder='Name'
                      defaultValue={rate.cob_name}
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
                      defaultValue={rate.route_id}
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
                      defaultValue={rate.loading_place}
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
                      defaultValue={rate.destination}
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
                      value={rate.load_type}
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
                      defaultValue={rate.vehicle_type}
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
                      defaultValue={rate.latest_rate}
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
                      defaultValue={rate.trip_configuration}
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

export default EditRateModal
