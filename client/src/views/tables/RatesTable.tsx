import * as React from 'react';
// ** MUI Imports
import Paper from '@mui/material/Paper'
import Table from '@mui/material/Table'
import TableRow from '@mui/material/TableRow'
import TableHead from '@mui/material/TableHead'
import TableBody from '@mui/material/TableBody'
import TableCell from '@mui/material/TableCell'
import TableContainer from '@mui/material/TableContainer'
import EditRateModal from "src/views/forms/EditRateModal";
import DeleteRateModal from "src/views/forms/DeleteRateModal";


const RatesTable = ({ rows, fetchData, setStatusBase }) => {

  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 650 }} aria-label='simple table'>
        <TableHead>
          <TableRow>
            <TableCell>COB Name</TableCell>
            <TableCell align='right'>Loading</TableCell>
            <TableCell align='right'>Destination</TableCell>
            <TableCell align='right'>Load Type</TableCell>
            <TableCell align='right'>Vehicle Type</TableCell>
            <TableCell>Actions</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map(row => (
            <TableRow
              key={row._id}
              sx={{
                '&:last-of-type td, &:last-of-type th': {
                  border: 0
                }
              }}
            >
              <TableCell component='th' scope='row'>
                {row.cob_name}
              </TableCell>
              <TableCell align='right'>{row.loading_place}</TableCell>
              <TableCell align='right'>{row.destination}</TableCell>
              <TableCell align='right'>{row.load_type}</TableCell>
              <TableCell align='right'>{row.vehicle_type}</TableCell>
              <TableCell align='right'>
                <EditRateModal rate={row} fetchData={fetchData} setStatusBase={setStatusBase} />
                <DeleteRateModal rate={row} fetchData={fetchData} setStatusBase={setStatusBase} /></TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  )
}

export default RatesTable
