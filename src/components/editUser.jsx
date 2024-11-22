import React, { useContext, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { UserContext } from '../context/userContext'

const EditUser = () => {
    console.log('Edit User Component Rendered')

    const { id } = useParams()
    const { users, setUsers } = useContext(UserContext)

    const navigate = useNavigate()
    const user = users.find((val) => {
        return parseInt(val.id) === parseInt(id)
    })
    if (!user) {
        navigate('/')
    }

    const [editUser, setEditUser] = useState({
        firstName: user.firstName,
        lastName: user.lastName,
        email: user.email,
        phone: user.phone,
        dob: user.dob,
        age: 0,
        profileImageUrl: user.profileImageUrl,
        isAdmin: user.isAdmin,
        isDeleted: user.isDeleted,
        address: user.address,
        id: user.id,
    })
    const edit = () => {
        setUsers(users.map(user => {
            return (user.id === editUser.id) ? { ...editUser, age: new Date().getFullYear() - new Date(editUser.dob).getFullYear() } : user
        }))
        navigate('/')
    }

    return (
        <div className='add-user'>
            <h1>Edit User</h1>
            <form action="" name='user-details' id='user-details'>
                <div className="form-element">

                    <label htmlFor="firstname">First Name</label>
                    <input value={editUser.firstName} onChange={(e) => { setEditUser({ ...editUser, firstName: e.target.value }); }} name='firstname' type="text" />
                </div>
                <div className="form-element">
                    <label htmlFor="lastname">Last Name</label>
                    <input value={editUser.lastName} onChange={(e) => { setEditUser({ ...editUser, lastName: e.target.value }) }} name='lastname' type="text" />
                </div>
                <div className="form-element">
                    <label htmlFor="email">Email</label>
                    <input value={editUser.email} onChange={(e) => { setEditUser({ ...editUser, email: e.target.value }) }} name='email' type="email" />
                </div>
                <div className="form-element">
                    <label htmlFor="phone">phone</label>
                    <input value={editUser.phone} onChange={(e) => { setEditUser({ ...editUser, phone: e.target.value }) }} name='phone' type="text" />
                </div>
                <div className="form-element">
                    <label htmlFor="dob">dob</label>
                    <input value={editUser.dob} onChange={(e) => { setEditUser({ ...editUser, dob: e.target.value }) }} name='dob' type="date" />
                </div>
                <div className="form-element">
                    <label htmlFor="profileurl">Profile Img Url</label>
                    <input value={editUser.profileImageUrl} onChange={(e) => { setEditUser({ ...editUser, profileImageUrl: e.target.value }) }} name='profileurl' type="text" />
                </div>
                <div className="form-element">
                    <label htmlFor="address">Address</label>
                    <input value={editUser.address} onChange={(e) => { setEditUser({ ...editUser, address: e.target.value }) }} name='address' type="text" />
                </div>
                <div className="form-element">
                    <button onClick={edit} type='button'>Edit</button>
                </div>
            </form>
        </div>
    )
}

export default EditUser