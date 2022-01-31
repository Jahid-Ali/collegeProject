import { useState } from 'react';
import { SendOutlined } from '@ant-design/icons';
import M from "materialize-css";
import axios from 'axios';

const projectID = '10425a58-ac0a-4167-9d9a-97922fcacb1e';

const Modal = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();

    const authObject = { 'Project-ID': projectID, 'User-Name': username, 'User-Secret': password };

    try {
      await axios.get('https://api.chatengine.io/chats', { headers: authObject });

      localStorage.setItem('username', username);
      localStorage.setItem('password', password);

      window.location.reload();
      setError('');
    } catch (err) {
      setError('Oops, incorrect credentials.');
    }
  };

  return (
    <div className="wrapper">
      <div className="form">
        <h1 className="title">Campus Chat Forum</h1>
        <form onSubmit={handleSubmit}>
          <input type="text" value={username} onChange={(e) => setUsername(e.target.value)} className="input" placeholder="Username" required />
          <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} className="input" placeholder="Password" required />
          <div align="center">
            <button type="submit" className="button">
              <span>Start chatting 
                <SendOutlined className="send-iconLogin" />
              </span>
            </button>
          </div>
        </form>
        <h3 className="errorShow">{error}</h3>
      </div>
    </div>

  );
};

export default Modal;
