import React, { memo, useContext, useState } from 'react'
import { Box, Button, Dialog, DialogActions, DialogContent, DialogTitle, FormControlLabel, Switch, TextField } from '@mui/material'
import { DatePicker } from '@mui/x-date-pickers';

import dayjs from 'dayjs';
import { UserContext } from '../context/userContext';

const EditDialog = memo(({ open, handleClose, addHistory, user }) => {
    const [editUser, setEditUser] = useState(user)
    const { users, setUsers } = useContext(UserContext)
    console.log('Edit Dialog Component Rendered')

    return (
        <>
            <Dialog open={open} onClose={handleClose} fullWidth maxWidth={'md'}
                PaperProps={{
                    component: 'form', onSubmit: (event) => {
                        event.preventDefault();

                        setUsers((prev) => {
                            return prev.map((val) => {
                                if (val.id === editUser.id) {
                                    addHistory(val)
                                    return { ...editUser, age: new Date().getFullYear() - new Date(editUser.dob).getFullYear() }
                                }
                                else {
                                    return val
                                }
                            })
                        })



                        setUsers(users.map((val) => {
                            if (val.id === editUser.id) {
                                addHistory(val)
                                console.log(new Date(editUser.dob).getFullYear())
                                return { ...editUser, age: new Date().getFullYear() - new Date(editUser.dob).getFullYear() }
                            }
                            else {
                                return val
                            }
                        }))
                        handleClose();
                    },
                }}
            >
                <DialogTitle>Edit User</DialogTitle>
                <DialogContent>

                    <Box component="form"
                        sx={{
                            '& .heading': { ml: 1 }, '& .MuiTextField-root': { p: 1, m: 1, width: '42ch' },
                            '& .MuiInputBase-multiline': { width: '85ch' }, '& .MuiFormControlLabel-root': { m: 1, p: 1, }, '& .MuiButton-root': { p: 2.5, mr: 3, ml: 'auto', }
                        }}
                        noValidate
                        autoComplete="off" >
                        <div>
                            <div>
                                <TextField id="fname" value={editUser.firstName} onChange={(e) => { setEditUser({ ...editUser, firstName: e.target.value }); }} name='firstname' label="First Name" />
                                <TextField id="lname" value={editUser.lastName} onChange={(e) => { setEditUser({ ...editUser, lastName: e.target.value }) }} name='lastname' label="Last Name" />
                            </div>
                            <div>
                                <TextField id="email" value={editUser.email} onChange={(e) => { setEditUser({ ...editUser, email: e.target.value }) }} name='email' label="Email" />
                                <TextField id="phone" value={editUser.phone} onChange={(e) => { setEditUser({ ...editUser, phone: e.target.value }) }} name='phone' label="Phone" />
                            </div>
                            <div>
                                <DatePicker format='DD-MM-YYYY' label="Birth-date" value={dayjs(editUser.dob)} onChange={(val) => { setEditUser({ ...editUser, dob: dayjs(val).format('DD-MM-YYYY') }) }} />
                                <TextField id="img" value={editUser.profileImageUrl} onChange={(e) => { setEditUser({ ...editUser, profileImageUrl: e.target.value }) }} name='profileurl' label="Profile img URL" />
                            </div>
                            <div>

                                <TextField value={editUser.address} onChange={(e) => { setEditUser({ ...editUser, address: e.target.value }) }} name='address' multiline id="Address" label="Address" /><br />
                            </div>
                            <div className="form-element">
                                <FormControlLabel checked={editUser.isAdmin} onChange={(e) => { setEditUser({ ...editUser, isAdmin: e.target.checked }) }} sx={{}} control={<Switch />} label="Make admin" />

                            </div>
                        </div>
                    </Box>

                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose}>Cancel</Button>
                    <Button type="submit">Edit</Button>
                </DialogActions>
            </Dialog >
        </>
    )
})

export default EditDialog;