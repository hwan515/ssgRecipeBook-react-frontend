import React, { useState } from 'react';
import axios from 'axios';
import './index.css';

function Login() {
  const [userData, setUserData] = useState({
    username: '',
    password: ''
  });
  const [error, setError] = useState('');

  const { username, password } = userData;

  const handleUsernameChange = (e) => {
    setUserData({ ...userData, username: e.target.value });
  };

  const handlePasswordChange = (e) => {
    setUserData({ ...userData, password: e.target.value });
  };

  const handleLogin = async () => {
    if (!username && !password) {
      setError('아이디와 비밀번호를 입력해주세요.');
      return;
    }

    if (!username) {
      setError('아이디를 입력해주세요.');
      return;
    }

    if (!password) {
      setError('비밀번호를 입력해주세요.');
      return;
    }

    try {
      const response = await axios.post('https://rest-recipe-book-dptb.run.goorm.site/members/login', userData);

      if (response.data.result === 'success') {
        console.log('로그인 성공');
      } else {
        setError('아이디 또는 비밀번호가 올바르지 않습니다.');
      }
    } catch (error) {
      console.error('로그인 에러:', error);
      setError('아이디 또는 비밀번호가 올바르지 않습니다.');
    }
  };
  
  return (
    <div className="page">
      <div className="titleWrap">
        아이디과 비밀번호를
        <br/>
        입력해주세요
      </div>
      <br/>

      <div className="contentWrap">
        <div className='inputTitle'>아이디</div>
        <div className='inputWrap'>
          <input className='input' type='text' value={username} onChange={handleUsernameChange} />
        </div>

        <div className='inputTitle'>비밀번호</div>
        <div className='inputWrap'>
          <input className='input' type="password" value={password} onChange={handlePasswordChange}/>
        </div>

        <div className='errorMessageWrap'>
          {error && <span className="errorMessage">{error}</span>}
        </div>
        <div className='errorMessageWrap'></div>
      </div>
      
      <div>
        <button onClick={handleLogin}>확인</button>
      </div>
    </div>
  );
}

export default Login;
