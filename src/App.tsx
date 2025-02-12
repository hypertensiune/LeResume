import { useState, useEffect } from 'react'
import { Route, Routes, useNavigate } from 'react-router-dom'
import './App.scss'

import { enableMapSet } from 'immer'

import ChooseTemplate from './pages/ChooseTemplate'
import Home from './pages/Home'
import Build from './pages/Build'
import Me from './pages/Me'
import Login from './pages/Login'

function Menu({children}: any) {

  const [open, setOpen] = useState(false);

  return (
    <div className='menu'>
      <div id='menutoggle' onClick={() => setOpen(!open)}>
        <i className="fa-solid fa-bars"></i>
      </div>
      <div id='menu' className={open ? 'open' : ''}>
        {children}
      </div>
    </div>
  )
}

function App() {
  enableMapSet();

  const [darkmode, setDarkmode] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
      setDarkmode(true);
    }
  }, [])

  useEffect(() => {
    if (darkmode) {
      document.querySelector("body")?.classList.add("dark");
    }
    else {
      document.querySelector("body")?.classList.remove("dark");
    }
  }, [darkmode]);

  return (
    <>
      <Menu>
        <div onClick={() => navigate('/me')}>
          <span>My account</span>
          <i className="fa-regular fa-user"></i>
        </div>
        <div onClick={() => navigate('/')}>
          <span>Home</span>
          <i className="fa-solid fa-house"></i>
        </div>
        <div onClick={() => setDarkmode(!darkmode)}>
          <span>Theme</span>
          <i className={`fa-solid ${darkmode ? 'fa-moon' : 'fa-sun'}`}></i>
        </div>
        <span className='delimiter'/>
        <div onClick={() => navigate('/signin')}>
          <span>Sign in</span>
          <i className="fa-solid fa-arrow-right-to-bracket"></i>
        </div>
      </Menu>
      <Routes>
        <Route path='/' element={<Home darkmode={darkmode} />} />
        <Route path='/build' element={<Build />} />
        <Route path='/templates' element={<ChooseTemplate darkmode={darkmode} />} />
        <Route path='/me' element={<Me/>}/>
        <Route path='/signin' element={<Login/>} />
        <Route path='*' element={<h1>404 Page not found!</h1>} />
      </Routes>
    </>
  )
}

export default App