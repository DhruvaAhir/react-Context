import  { useEffect } from 'react'
import { createConnection } from './chat'
import { showNotification } from './notification'

const useChatRoom = ({ serverUrl, roomId }) => {

    useEffect(() => {
        const options = { serverUrl: serverUrl, roomId: roomId }
        const connection = createConnection(options)
        connection.connect()
        connection.on('messsage', (msg) => {
            showNotification("New message: " + msg)
        })
        return () => connection.disconnect();
    }, [roomId, serverUrl])
}

export { useChatRoom }