import { TableCell } from '@mui/material'
import React from 'react'




const HistoryCard = (props) => {
    console.log('History Card Component Rendered')

    return (
        // <h1>hi</h1>



        <>
            <TableCell component="th" scope="row">
                {props.his.firstName} {props.his.lastName}
            </TableCell>
            <TableCell align="right">{props.his.email} </TableCell>
            <TableCell align="right">{props.his.dob}</TableCell>
            <TableCell align="right">{props.his.age}</TableCell>
            <TableCell align="right"><img style={{ height: '50px' }} src={props.his.profileImageUrl} alt='' /></TableCell>
            <TableCell align="right">{props.his.address}</TableCell>
            <TableCell align="right">{props.his.isDeleted ? 'Yes' : 'No'}</TableCell>
            <TableCell align="right">{props.his.isAdmin ? 'Yes' : 'No'}</TableCell>
            <TableCell align="right">{props.his.editedAt.toString()}</TableCell>
        </>

    )
}

export default HistoryCard