import * as React from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogTitle from '@mui/material/DialogTitle';
import Slide from '@mui/material/Slide';
import { TransitionProps } from '@mui/material/transitions';
import axios from 'axios';

const Transition = React.forwardRef(function Transition(
  props: TransitionProps & {
    children: React.ReactElement<any, any>;
  },
  ref: React.Ref<unknown>,
) {
  return <Slide direction="up" ref={ref} {...props} />;
});

export default function DeleteRateModal({ rate, fetchData, setStatusBase }) {
  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handledelete = async () => {
    let id = rate._id;
    try {
      const { data } = await axios.delete(`http://localhost:5000/api/v1/rates/${id}`);
      const { rate, msg } = data;
      setOpen(false);
      setStatusBase({ msg, key: Math.random() });
      fetchData();
    } catch (error) {
      console.log(error)
      setStatusBase({ msg: "An error occured", key: Math.random() });
    }
  };

  return (
    <div>
      <Button variant="outlined" onClick={handleClickOpen}>
        Delete
      </Button>
      <Dialog
        open={open}
        TransitionComponent={Transition}
        keepMounted
        onClose={handleClose}
        aria-describedby="alert-dialog-slide-description"
      >
        <DialogTitle>Delete this rate?</DialogTitle>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button onClick={handledelete}>Proceed</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
