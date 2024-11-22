import React, { createContext, useState } from 'react'

const UserHistoryContext = createContext();

const UserHistoryProvider = ({ children }) => {
    const [userHistory, setUserHistory] = useState([])

    var payload = { userHistory, setUserHistory };


    return (
        <UserHistoryContext.Provider value={payload}>
            {children}
        </UserHistoryContext.Provider>
    )
}

export { UserHistoryContext, UserHistoryProvider }