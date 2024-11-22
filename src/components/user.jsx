import React from 'react'
import { useParams } from 'react-router-dom'

const User = () => {
    const users = JSON.parse(localStorage.getItem('users'))
    let { id } = useParams()
    const user = (users[id])
    console.log(user)
    return (
        <div>
            {
                user && <div>
                    {user.firstName} {user.lastName}
                </div>
            }


        </div>
    )
}

export default User