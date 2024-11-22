import React, { useContext, useState } from 'react'
import '../style/task2.css'
import { Box, Button, Container, FormControlLabel, Switch, TextField } from '@mui/material'
import { useNavigate } from 'react-router-dom'
import { UserContext } from '../context/userContext'
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import dayjs from 'dayjs'

const AddUser = () => {

    console.log('AddUser Rendered')
    const { users, setUsers } = useContext(UserContext);
    const [newUser, setNewUser] = useState({
        firstName: "",
        lastName: "",
        email: "",
        phone: "",
        dob: "",
        age: 0,
        profileImageUrl: "https://randomuser.me/api/portraits/men/1.jpg",
        isAdmin: false,
        isDeleted: false,
        address: "",
    })
    // const [newUser, setNewUser] = useState({
    //     firstName: "Demo",
    //     lastName: "Demo",
    //     email: "demo",
    //     phone: "123-123-1232",
    //     dob: '10-10-2000',
    //     age: 0,
    //     profileImageUrl: "https://randomuser.me/api/portraits/men/1.jpg",
    //     isAdmin: false,
    //     isDeleted: false,
    //     address: "123,123,123",
    // })
    const [errors, setErrors] = useState({
        firstName: false,
        lastName: false,
        email: false,
        fhelp: "",
        lhelp: "",
        ehelp: ""
    })
    const navigate = useNavigate()
    const validateField = (field) => {
        if (newUser[field] === "") {
            if (field === 'firstName') {
                setErrors({ ...errors, firstName: true, fhelp: "Enter First Name" })
            }
            if (field === 'lastName') {
                setErrors({ ...errors, lastName: true, lhelp: "Enter Last Name" })
            }
            if (field === 'email') {
                setErrors({ ...errors, email: true, ehelp: "Enter Email" })
            }
        } else {
            if (field === 'firstName') {
                setErrors({ ...errors, firstName: false, fhelp: "" })
            }
            if (field === 'lastName') {
                setErrors({ ...errors, lastName: false, lhelp: "" })
            }
            if (field === 'email') {
                setErrors({ ...errors, lastName: false, lhelp: "" })
            }
        }
    }

    const addUser = () => {
        var add = true
        var error = {
            firstName: false,
            lastName: false,
            email: false,
            fhelp: "",
            lhelp: "",
            ehelp: "",
        }
        if (newUser.firstName === "") {
            error = { ...error, firstName: true, fhelp: "Enter First Name" }
            add = false
        }
        if (newUser.lastName === "") {
            error = { ...error, lastName: true, lhelp: "Enter Last Name" }
            add = false
        }
        if (newUser.email === "") {
            error = { ...error, email: true, ehelp: "Enter email Name" }
            add = false
        }
        if (add) {
            setUsers([...users, { ...newUser, id: new Date().getTime(), age: new Date().getFullYear() - new Date(newUser.dob).getFullYear() }])
            navigate('/')
        } else {
            setErrors(error)
        }
    }
    return (
        <Container maxWidth='md' >
            <Box style={{ justifySelf: 'center', marginTop: '15%' }} component="form"
                sx={{
                    '& .heading': { ml: 1 }, '& .MuiTextField-root': { p: 1, m: 1, width: '40ch' },
                    '& .MuiInputBase-multiline': { width: '80ch' }, '& .MuiFormControlLabel-root': { m: 1, p: 1, }, '& .MuiButton-root': { p: 2.5, mr: 3, ml: 'auto', }
                }} noValidate autoComplete="off">
                <h1 className='heading'>Add User</h1>
                <div>
                    <div>
                        <TextField error={errors.firstName} helperText={errors.fhelp} id="fname" value={newUser.firstName} onBlur={(e) => { validateField(e.target.name) }} onChange={(e) => { setNewUser({ ...newUser, firstName: e.target.value }); }} name='firstName' label="First Name" />
                        <TextField error={errors.lastName} helperText={errors.lhelp} id="lname" value={newUser.lastName} onBlur={(e) => { validateField(e.target.name) }} onChange={(e) => { setNewUser({ ...newUser, lastName: e.target.value }) }} name='lastName' label="Last Name" />
                    </div>
                    <div>
                        <TextField error={errors.email} helperText={errors.ehelp} id="email" value={newUser.email} onBlur={(e) => { validateField(e.target.name) }} onChange={(e) => { setNewUser({ ...newUser, email: e.target.value }) }} name='email' label="Email" />
                        <TextField id="phone" value={newUser.phone} onChange={(e) => { setNewUser({ ...newUser, phone: e.target.value }) }} name='phone' label="Phone" />
                    </div>
                    <div>
                        <DatePicker format='YYYY-MM-DD' label="Birth-date" value={dayjs(newUser.dob)} onChange={(val) => { setNewUser({ ...newUser, dob: dayjs(val).format('YYYY-MM-DD') }) }} />
                        <TextField id="img" value={newUser.profileImageUrl} onChange={(e) => { setNewUser({ ...newUser, profileImageUrl: e.target.value }) }} name='profileurl' label="Profile img URL" />
                    </div>
                    <div>
                        <TextField value={newUser.address} onChange={(e) => { setNewUser({ ...newUser, address: e.target.value }) }} name='address' multiline id="Address" label="Address" /><br />
                    </div>
                    <div className="form-element">
                        <FormControlLabel checked={newUser.isAdmin} onChange={(e) => { setNewUser({ ...newUser, isAdmin: e.target.checked }) }} sx={{}} control={<Switch />} label="Make admin" />
                        <Button onClick={addUser} variant="contained" color="success">
                            Add
                        </Button>
                    </div>
                </div>
            </Box>
        </Container>
    )
}

export default AddUser