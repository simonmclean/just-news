import React, { useContext } from "react";
import { MdClose } from "react-icons/md";
import MessageContext from "../../contexts/MessageContext";
import css from "./Message.module.css";

// TODO: Styling
export default function Message() {
    const [message, setMessage] = useContext(MessageContext);

    return (
        <>
            {message && (
                <div role="alert" className={css.message}>
                    <div className={css.inner}>
                        <p className={css.text}>{message}</p>
                        <button
                            className={css.close}
                            onClick={() => setMessage(null)}
                        >
                            <MdClose />
                        </button>
                    </div>
                </div>
            )}
        </>
    );
}
