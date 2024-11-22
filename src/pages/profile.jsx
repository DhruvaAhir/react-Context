import React, { Suspense, useContext, useEffect, useState } from 'react'
// import { users } from '../json/users';
import { useNavigate } from 'react-router-dom';
import UserCard from '../components/userCard';
import '../style/userCard.css'
import Icon from '@mui/material/Icon';


import { Button, IconButton } from '@mui/material';
import { UserContext } from '../context/userContext';
import { UserHistoryContext } from '../context/userHistoryContext';



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



        setUsers(users.map(val => {
            if (val.id === id) {
                handleChangeUserHistory(val)
                val.isDeleted = val.isDeleted ? false : true
            }
            return val
        }))
    }

    const handleChangeUserHistory = (editUser) => {
        setUserHistory({ ...userHistory, [editUser.id]: [...(userHistory[editUser.id] || []), { ...editUser, editedAt: new Date() }] })
    }


    return (
        <div>
            <h1 style={{ textTransform: 'uppercase', textAlign: 'center' }}>users</h1>

            <div>
                <input className='search-box' type="text" placeholder='Search User' name="search" value={search} onChange={(e) => { setSearch(e.target.value); }} id="" />
                <label htmlFor="showdel">Deleted
                    <input type="checkbox" checked={showDeleted} onChange={(e) => { setShowDeleted(e.target.checked) }} name="showdel" id="showdel" />
                </label>
                <label htmlFor="showAdmin">Admin
                    <input type="checkbox" checked={showAdmin} onChange={(e) => { setShowAdmin(e.target.checked) }} name="showAdmin" id="showAdmin" />
                </label>
                <label htmlFor="sortby">Sort By<select name="sortby" id="sortby" onChange={(e) => { setSortBy(e.target.value); setReverse(true) }}>
                    <optgroup>
                        <option value="id">Default</option>
                        <option value="firstName">First Name</option>
                        <option value="lastName">Last Name</option>

                        <option value="age">age</option>
                    </optgroup></select></label>
                <IconButton onClick={() => { (reverse === true) ? setReverse(false) : setReverse(true); }}><Icon  > swap_vertical_circle</Icon> </IconButton>

                <Button variant="outlined" onClick={() => { navigate('/add') }}>Add User</Button>

            </div>
            <Suspense fallback={<h2>Loading...</h2>}>

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
            </Suspense>

        </div >
    )
}





export default Profile;
