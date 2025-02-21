import { useContext, useState } from 'react'
import { NavigateFunction, useNavigate } from 'react-router-dom'

import { AppContext } from '@context/ProviderContext';

import logod from '@assets/logo.svg';
import logol from '@assets/logolight.svg';

import './signin.scss'
import { clearLocalStorage } from '@services/localstorage';

export default function Signin({darkmode}: any) {

  const navigate = useNavigate();

  const [user, setUser] = useState<string>("");
  const [password, setPassword] = useState<string>("");

  const services = useContext(AppContext)

  async function signIn(user: string, password: string, navigate: NavigateFunction) {
    const result = await services.auth.signInWithEmail(user, password);
    if(result) {
      clearLocalStorage();
      navigate('/me');
    }
  }
  
  async function signInGoogle() {
    const result = await services.auth.signInWithGoogle();
    if(result) {
      clearLocalStorage();
      navigate('/me');
    }
  }

  return (
    <>
      <div id='logo' onClick={() => navigate('/')}>
        <img src={darkmode ? logol : logod}/>
      </div>
      <div className="login">
        <h2 style={{textAlign: "center"}}>Sign In</h2>
        <div className='input icon'>
          <i className='fa-regular fa-user'></i>
          <input type='text' placeholder='Username' onChange={e => setUser(e.target.value)} />
        </div>
        <div className='input icon'>
          <i className='fa-solid fa-lock'></i>
          <input type='text' placeholder='Password' onChange={e => setPassword(e.target.value)} />
        </div>
        <button className='primary' onClick={() => signIn(user, password, navigate)}>Sign in</button>
        <div className="separator">
          <span className='line'/>
          <span>OR</span>
          <span className='line'/>
        </div>
        <button className='primary' onClick={() => signInGoogle()}>
          <i className="fa-brands fa-google" style={{marginRight: '3%'}}></i>
          Sign in with Google
        </button>
      </div>
    </>
  )
}