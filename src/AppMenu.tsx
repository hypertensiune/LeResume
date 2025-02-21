import { useContext, useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";

import { AppContext } from "@context/ProviderContext";
import useAuth from "@hooks/useAuth";

export default function AppMenu({darkmode, setDarkmode}: any) {

  const [open, setOpen] = useState(false);
  const navigate = useNavigate();

  const services = useContext(AppContext);
  
  const isAuthenticated = useAuth(services.auth);

  const ref = useRef<HTMLDivElement>(null);

  // https://stackoverflow.com/questions/66626487/hiding-sidebar-component-on-outside-click
  function handleOutsideClick(e: Event) {
    const contains = ref?.current?.contains(e.target as Node);
    const open = ref.current?.classList.contains('open');

    if(open && !contains && (e.target as HTMLDivElement).id != 'menutoggle') {
      setOpen(false);
    }
  }

  useEffect(() => {
    document.addEventListener('click', handleOutsideClick);
    return () => { 
      document.removeEventListener('click', handleOutsideClick);
    }
  }, []);

  return (
    <div className='menu'>
      <div id='menutoggle' onClick={() => setOpen(!open)}>
        <i className="fa-solid fa-bars"></i>
      </div>
      <div ref={ref} id='menu' className={open ? 'open' : ''}>
        <div style={{flexDirection: 'column', alignItems: 'flex-start'}} onClick={() => navigate('/me')}>
          <span style={{width: "100%"}}>
            <span style={{float: "left"}}>My account</span>
            <i style={{float: "right"}} className="fa-regular fa-user"></i>
          </span>
          {isAuthenticated && 
            <span
              style={{
                float: "left", 
                textOverflow: "ellipsis", 
                width: "80%",
                overflow: "hidden",
                whiteSpace: "nowrap",
                color: "var(--text-secondary)"}}>
                {services.auth.getUserName()}
            </span>}
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