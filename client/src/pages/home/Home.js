import styles from './styles.module.css';
import {useNavigate} from 'react-router-dom';

const Home = ({ username, setUsername, room, setRoom, socket }) => {
    
    const navigate = useNavigate();

    const joinRoom = () => {
        if (room !== '' && username !== '') {
            socket.emit('join_room', { username, room });
        }

        navigate('/chat',{replacce:true});
    };

    return (
        <div className={styles.container}>
            <div className={styles.formContainer}>
                <h1>{`<>DevRooms</>`}</h1>
                <input
                    className={styles.input}
                    placeholder='Username...'
                    onChange={(e) => setUsername(e.target.value)}
                />
                <select
                    className={styles.input}
                    onChange={(e) => setRoom(e.target.value)}
                >
                    <option>--select Room--</option>
                    <option value='customers'>Customers</option>
                    <option value='management '>Management </option>
                    <option value='secretariat'>Secretariat</option>
                    <option value='self'>Self</option>
                </select>
                <button className='btn btn-secondary' style={{ width: '100%' }}  onClick={() => joinRoom()}>Join Room</button>
            </div>
        </div>
    );
};
export default Home