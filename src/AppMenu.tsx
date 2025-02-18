import { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { AppContext } from "./context/ProviderContext";
import useAuth from "./hooks/useAuth";

export default function AppMenu({darkmode, setDarkmode}: any) {

  const [open, setOpen] = useState(false);
  const navigate = useNavigate();

  const services = useContext(AppContext);
  
  const isAuthenticated = useAuth(services.auth);

  return (
    <div className='menu'>
      <div id='menutoggle' onClick={() => setOpen(!open)}>
        <i className="fa-solid fa-bars"></i>
      </div>
      <div id='menu' className={open ? 'open' : ''}>
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
        <div onClick={() => {
          if(isAuthenticated) {
            services.auth.signOut();
            navigate('/');
          } else {
            navigate('/signin');
          }
        }}>
          <span>{isAuthenticated ? 'Sign Out' : 'Sign In'}</span>
          <i className={`fa-solid ${isAuthenticated ? 'fa-arrow-right-from-bracket' : 'fa-arrow-right-to-bracket'}`}></i>
        </div>
      </div>
    </div>
  )
}