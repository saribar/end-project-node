import { Socket } from 'socket.io-client';
import styles from './styles.module.css';
import React,{ useState } from 'react';

const SendMessage = ({ socket, username, room}) => {

    const [message, setMessage] = useState(' ');
    
    const SendMessage = () => {
        if(message !== ''){
            const __createdtime__ = Date.now();
            socket.emit('send_message', {username, room, message, __createdtime__});
            setMessage('');
        }
    };

    return (
        <div className={styles.SendMessageContainer}>
            <input
                className={styles.messageInput}
                placeholder='Message'
                onChange={(e) => setMessage(e.target.value)}
                value={message}
            />
            <button className='btn btn-primary' onClick={SendMessage}>
                Send Message
            </button>
        </div>
    );
};

export default SendMessage;