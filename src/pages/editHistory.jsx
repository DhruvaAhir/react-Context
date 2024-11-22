import React, { useContext, useEffect, useState } from 'react'
import { UserHistoryContext } from '../context/userHistoryContext'
import { UserContext } from '../context/userContext'
import { useNavigate, useParams } from 'react-router-dom'
import { Container, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from '@mui/material'
import HistoryCard from '../components/historyCard'

const EditHistory = () => {
    console.log('EditHistory Rendered')

    const { users } = useContext(UserContext)
    const { userHistory } = useContext(UserHistoryContext)
    const [user, setUser] = useState({})
    const navigate = useNavigate()
    const { id } = useParams()


    useEffect(() => {
        if (userHistory[id]) {
            setUser(users.find(val => val.id === parseInt(id)))
        } else {
            navigate('/')
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])



    return (
        <div>
            <Container>
                <h1>{user.firstName} {user.lastName}</h1>
                <h4>Current values</h4>
                <TableContainer component={Paper}>
                    <Table sx={{ minWidth: 650 }} aria-label="simple table">
                        <TableHead>
                            <TableRow>
                                <TableCell>Name</TableCell>
                                <TableCell align="right">email</TableCell>
                                <TableCell align="right">dob</TableCell>
                                <TableCell align="right">age</TableCell>
                                <TableCell align="right">img</TableCell>
                                <TableCell align="right">address</TableCell>
                                <TableCell align="right">Deleted</TableCell>
                                <TableCell align="right">Admin</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            <TableCell component="th" scope="row">
                                {user.firstName} {user.lastName}
                            </TableCell>
                            <TableCell align="right">{user.email} </TableCell>
                            <TableCell align="right">{user.dob}</TableCell>
                            <TableCell align="right">{user.age}</TableCell>
                            <TableCell align="right"><img style={{ height: '50px' }} src={user.profileImageUrl} alt='' /></TableCell>
                            <TableCell align="right">{user.address}</TableCell>
                            <TableCell align="right">{(user.isDeleted) ? 'Yes' : 'No'}</TableCell>
                            <TableCell align="right">{(user.isAdmin) ? 'Yes' : 'No'}</TableCell>


                        </TableBody>
                    </Table>
                </TableContainer>


                <h4>Edit-History</h4>
                <TableContainer component={Paper}>
                    <Table sx={{ minWidth: 650 }} aria-label="simple table">
                        <TableHead>
                            <TableRow>
                                <TableCell>Name</TableCell>
                                <TableCell align="right">email</TableCell>
                                <TableCell align="right">dob</TableCell>
                                <TableCell align="right">age</TableCell>
                                <TableCell align="right">img</TableCell>
                                <TableCell align="right">address</TableCell>
                                <TableCell align="right">was Deleted</TableCell>
                                <TableCell align="right">was Admin</TableCell>
                                <TableCell align="right">edit Time</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>

                            {userHistory[id] && userHistory[id].map((val, index) => {
                                return <TableRow key={index} sx={{ '&:last-child td, &:last-child th': { border: 0 } }} >
                                    <HistoryCard his={val} />
                                </TableRow>
                            })}


                        </TableBody>
                    </Table>
                </TableContainer>


            </Container>


        </div>
    )
}

export default EditHistory