import { useContext } from 'react'
import MessageContext from '../../contexts/MessageContext'

export default function Message() {
    const [message] = useContext(MessageContext)

    return (
        <>{message && (
            <div>
                <p>{message}</p>
                <button>x</button>
            </div>
        )}</>
    )
}
