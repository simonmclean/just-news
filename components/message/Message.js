import { useContext } from 'react'
import MessageContext from '../../contexts/MessageContext'

export default function Message() {
    const [message, setMessage] = useContext(MessageContext)

    return (
        <>{message && (
            <div>
                <p>{message}</p>
                <button onClick={() => setMessage(null)}>x</button>
            </div>
        )}</>
    )
}
