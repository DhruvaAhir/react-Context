import React, { createContext, useState } from 'react'

const UserContext = createContext();

const UserProvider = ({ children }) => {
    const [users, setUsers] = useState([])

    var payload = { users, setUsers };

    return (
        <UserContext.Provider value={payload}>
            {children}
        </UserContext.Provider>
    )
}

export { UserContext, UserProvider }