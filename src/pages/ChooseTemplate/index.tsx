import { Link } from 'react-router-dom'
import './templates.scss'
import './card.scss'

import temp1 from '../../assets/templates/1.png';
import temp2 from '../../assets/templates/2.png';

function Template({ src, to, ...props }: any) {
  return (
    <>
      <div className="template-card" {...props}>
        <div className='overlay'></div>
        <img src={src} />
        <Link to={to}>Use this template</Link>
      </div>
    </>
  )
}

export default function ChooseTemplate() {

  function setTemplate(id: string) {
    localStorage.setItem("templateID", id);
    localStorage.setItem("step", "basics");
  }

  return (
    <>
      <div className='templates'>
        <div className="wrapper">
          <h1>Choose a template</h1>
          <div className='container'>
            <Template src={temp1} to="/build?template=1&step=basics" onClick={() => setTemplate("1")}></Template>
            <Template src={temp2} to="/build?template=2&step=basics" onClick={() => setTemplate("2")}></Template>
            <Template src="/assets/1.webp" to="/build?template=3&step=basics" onClick={() => setTemplate("3")}></Template>
            <Template src="/assets/1.webp" to="/build?template=4&step=basics" onClick={() => setTemplate("4")}></Template>
          </div>
        </div>
      </div>
    </>
  )
}