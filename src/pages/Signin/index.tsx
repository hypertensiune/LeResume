import { useContext, useState } from 'react'
import { NavigateFunction, useNavigate } from 'react-router-dom'

import { AppContext } from '@context/ProviderContext';

import logod from '@assets/logo.svg';
import logol from '@assets/logolight.svg';

import './signin.scss'

export default function Signin({darkmode}: any) {

  const navigate = useNavigate();

  const [user, setUser] = useState<string>("");
  const [password, setPassword] = useState<string>("");

  const services = useContext(AppContext)

  async function signIn(user: string, password: string, navigate: NavigateFunction) {
    const result = await services.auth.signInWithEmail(user, password);
    if(result) {
      navigate('/me');
    }
  }
  
  async function signInGoogle() {
    const result = await services.auth.signInWithGoogle();
    if(result) {
      navigate('/me');
    }
  }

  return (
    <>
      <div id='logo' onClick={() => navigate('/')}>
        <img src={darkmode ? logod : logol}/>
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
        <a onClick={() => signIn(user, password, navigate)}>Sign in</a>
        <div className="separator">
          <span className='line'/>
          <span>OR</span>
          <span className='line'/>
        </div>
        <a onClick={() => signInGoogle()}>
          <span>
            <i className="fa-brands fa-google"></i>
            <span style={{marginLeft: "3%"}}>Sign in with Google</span>            
          </span>
        </a>
      </div>
    </>
  )
}