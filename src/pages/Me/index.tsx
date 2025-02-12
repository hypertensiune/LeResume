import { Link } from "react-router-dom"

import './me.scss'
import tmp1 from '../../assets/templates/1.png'

export default function Me() {
  return (
    <div className='me'>
      <div className="container">
        <div className="header">
          <h1>Welcome, User</h1>
          <div className="userActions">
            <Link to="/"><i className="fa-solid fa-pen"></i></Link>
            <Link to="/">Create resume</Link>
          </div>
        </div>
        <div className="main">
          <div className="resumes">
            <div className="resumeCard">
              <img src={tmp1}/>
              <div className="details">
                <div>
                  <span style={{"color": "var(--resume-card-text-primary)"}}>Resume 1</span>
                  <span>Template #1</span>
                </div>
                <div>
                  <span style={{"fontSize": "0.8rem"}}>Created 12/02/2025</span>
                  <span style={{"fontSize": "0.8rem"}}>Edited 12/02/2025</span>
                </div>
              </div>
              <div className="actions">
                <span><i className="fa-solid fa-download"></i></span>
                <div style={{"flexGrow": "1"}}>
                  <span><i className="fa-solid fa-share-nodes"></i></span>
                </div>
                <div className="danger">
                  <span><i className="fa-solid fa-trash"></i></span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )  
}