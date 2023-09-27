import { useState, useEffect } from 'react'
import { Link, Route, Routes } from 'react-router-dom'
import './App.scss'

import { enableMapSet } from 'immer'

import ChooseTemplate from './pages/ChooseTemplate'
import Home from './pages/Home'
import Build from './pages/Build'

import darkIcon from './assets/light.svg';
import lightIcon from './assets/dark.svg';

function App() {
  enableMapSet();

  const [darkmode, setDarkmode] = useState(false);

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
      <Link id="hometoggle" style={{ position: 'absolute', top: 0, left: 0, padding: '12px', zIndex: '100', cursor: 'pointer' }} to="/">
        <i className="fa-solid fa-home" style={{ fontSize: '1.5rem' }}></i>
      </Link>
      <div id="themetoggle" style={{ position: 'absolute', top: 0, right: 0, padding: '12px', zIndex: '100', cursor: 'pointer' }} onClick={() => setDarkmode(!darkmode)}>
        <img src={darkmode ? darkIcon : lightIcon} style={{ transition: '.2s' }} width="24px"></img>
      </div>
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/build' element={<Build />} />
        <Route path='/templates' element={<ChooseTemplate />} />
        <Route path='*' element={<h1>404 Page not found!</h1>} />
      </Routes>
    </>
  )
}

export default App