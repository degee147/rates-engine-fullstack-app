
// ** React Imports
import React, { ElementType } from 'react'

import Grid from '@mui/material/Grid'
import { styled } from '@mui/material/styles'
import Card from '@mui/material/Card'
import CardContent from '@mui/material/CardContent'
import Button, { ButtonProps } from '@mui/material/Button'

// ** Icons Imports
import CardHeader from '@mui/material/CardHeader'
import RatesTable from 'src/views/tables/RatesTable'

import AddRateModal from "src/views/forms/AddRateModal";

import AlertMassage from "../Snackbar";



const Rates = () => {
  const [status, setStatusBase] = React.useState("");

  const [rows, setRows] = React.useState([]);


  const fetchData = async () => {
    try {
      const response = await fetch('http://localhost:5000/api/v1/rates')
      const data = await response.json()
      setRows(data.rates);
    } catch (error) {
      console.log(error);
    }
  }

  React.useEffect(() => {
    fetchData()
  }, [])


  return (
    <CardContent>
      {status ? <AlertMassage key={status.key} message={status.msg} /> : null}
        <Grid container spacing={7}>
          <Grid item xs={12}>
            <Card>
              <Grid container spacing={7}>
                <Grid item xs={6} sm={10}>
                  <CardHeader title='Rates' titleTypographyProps={{ variant: 'h6' }} />
                </Grid>
                <Grid item xs={6} sm={2} sx={{ marginTop: 3 }}>
                  <AddRateModal setStatusBase={setStatusBase} />
                </Grid>
              </Grid>
              <RatesTable rows={rows} fetchData={fetchData} setStatusBase={setStatusBase}  />
            </Card>
          </Grid>
        </Grid>
    </CardContent>
  )
}

export default Rates
