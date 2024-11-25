import React, { useContext, useEffect, useState } from 'react'
// import { users } from '../json/users';
import { useNavigate } from 'react-router-dom';
import UserCard from '../components/userCard';
import '../style/userCard.css'
import Icon from '@mui/material/Icon';


import { AppBar, Box, Button, Checkbox, FormControl, FormControlLabel, IconButton, InputLabel, MenuItem, Select, TextField, Toolbar, Typography } from '@mui/material';
import { UserContext } from '../context/userContext';
import { UserHistoryContext } from '../context/userHistoryContext';
import { Search } from '@mui/icons-material';



const Profile = () => {
    // console.log('Profile Rendered')
    const { users, setUsers } = useContext(UserContext)
    const { userHistory, setUserHistory } = useContext(UserHistoryContext)

    const navigate = useNavigate()
    const [displayUsers, setDisplayUsers] = useState([])
    const [search, setSearch] = useState('')
    const [showDeleted, setShowDeleted] = useState(false)
    const [showAdmin, setShowAdmin] = useState(false)
    const [sortBy, setSortBy] = useState('id')
    const [reverse, setReverse] = useState(true)

    const userHistoryKeys = Object.keys(userHistory)

    useEffect(() => {

        var userList = []
        if (!showDeleted && !showAdmin) {
            userList = users.filter(val => !val.isDeleted && !val.isAdmin)
        } else if (showDeleted && !showAdmin) {
            userList = users.filter(val => !val.isAdmin || (val.isAdmin && val.isDeleted))
        } else if (!showDeleted && showAdmin) {
            userList = users.filter(val => !val.isDeleted || (val.isAdmin && val.isDeleted))
        } else {
            userList = users
        }
        userList = userList.filter(val => `${val.firstName} ${val.lastName} ${val.email}`.toLowerCase().includes(search.toLowerCase()))
        userList = userList.sort(sortUsers);
        setDisplayUsers(userList);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [showDeleted, showAdmin, search, sortBy, reverse, users])

    const sortUsers = (a, b) => {
        if (reverse === true) {
            if (typeof (a[sortBy]) === 'string') {
                return (a[sortBy].localeCompare(b[sortBy]))
            } else if (typeof (a[sortBy]) === 'number') {
                return (a[sortBy] - b[sortBy])
            } else {
                return false
            }
        } else {
            if (typeof (a[sortBy]) === 'string') {
                return (b[sortBy].localeCompare(a[sortBy]))
            } else if (typeof (a[sortBy]) === 'number') {
                return (b[sortBy] - a[sortBy])
            } else {
                return false
            }
        }
    }

    const delUser = (id) => {
        setUsers((prev) => {
            return prev.map((val) => {
                if (val.id === id) {
                    handleChangeUserHistory(val)
                    val.isDeleted = val.isDeleted ? false : true
                }
                return val
            })
        })
    }

    const handleChangeUserHistory = (editUser) => {
        setUserHistory((prev) => {
            return { ...prev, [editUser.id]: [...(prev[editUser.id] || []), { ...editUser, editedAt: new Date() }] }
        })
    }

    return (
        <div>
            <h1 style={{ textTransform: 'uppercase', textAlign: 'center' }}>users</h1>

            <div>
                <Box sx={{ p: 2, display: 'flex' }} >

                    <TextField sx={{ ml: 2, width: '50ch' }}
                        id="search"
                        placeholder='Search'
                        type='search'
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                    />
                    <Box sx={{ mr: 5, ml: 'auto' }}>

                        <FormControlLabel
                            label="Deleted"
                            control={<Checkbox
                                checked={showDeleted}
                                onChange={(e) => { setShowDeleted(e.target.checked) }} />}
                        />

                        <FormControlLabel
                            label="Admin"
                            control={<Checkbox
                                checked={showAdmin}
                                onChange={(e) => { setShowAdmin(e.target.checked) }}
                            />} />

                        <FormControl sx={{ m: 1, minWidth: 130, }}>
                            <InputLabel id="demo-simple-select-helper-label">Sort By</InputLabel>

                            <Select
                                labelId="demo-simple-select-helper-label"
                                id="demo-simple-select-helper"
                                value={sortBy}
                                label="Age"
                                onChange={(e) => { setSortBy(e.target.value) }}
                            >
                                <MenuItem value={'id'}>Default</MenuItem>
                                <MenuItem value={'firstName'}>First Name</MenuItem>
                                <MenuItem value={'lastName'}>Last Name</MenuItem>
                                <MenuItem value={'age'}>Age</MenuItem>
                            </Select>
                        </FormControl>

                        <IconButton onClick={() => { (reverse === true) ? setReverse(false) : setReverse(true); }}><Icon  > swap_vertical_circle</Icon> </IconButton>

                        <Button sx={{ m: 1, p: 1.85 }} variant="outlined" onClick={() => { navigate('/add') }}>Add User</Button>
                    </Box>

                </Box>
            </div>
            <>

                <div className="users" style={{ padding: '10px' }}>
                    {
                        displayUsers.length === 0 ?
                            <p >No User</p>
                            :
                            displayUsers.map((val, index) => {
                                return <UserCard key={index} user={val} delUser={delUser} addHistory={handleChangeUserHistory} hisKeys={userHistoryKeys} />
                            })
                    }
                </div>
            </>

        </div >
    )
}

export default Profile;