import { Link, useNavigate } from 'react-router-dom'

import logod from '../../assets/logo.svg';
import logol from '../../assets/logolight.svg';

import './login.scss'

export default function Login({darkmode}: any) {

  const navigate = useNavigate();

  return (
    <>
      <div id='logo' onClick={() => navigate('/')}>
        <img src={darkmode ? logod : logol}/>
      </div>
      <div className="login">
        <h2 style={{textAlign: "center"}}>Sign In</h2>
        <div className='input icon'>
          <i className='fa-regular fa-user'></i>
          <input type='text' placeholder='Username'/>
        </div>
        <div className='input icon'>
          <i className='fa-solid fa-lock'></i>
          <input type='text' placeholder='Password'/>
        </div>
        <Link to='/'>Sign in</Link>
        <div className="separator">
          <span className='line'/>
          <span>OR</span>
          <span className='line'/>
        </div>
        <Link to='/'>
          <span>
            <i className="fa-brands fa-google"></i>
            <span style={{marginLeft: "3%"}}>Sign in with Google</span>            
          </span>
        </Link>
      </div>
    </>
  )
}