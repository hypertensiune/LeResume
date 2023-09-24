import { Children } from 'react'

import { languages } from '../hooks/useGithub'
import useScale from '../hooks/useScale';

const parseDate = (input: string) => ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"][parseInt(input.slice(-2)) - 1] + " " + input.slice(0, 4);

export function Resume({ mref, id, children }: any) {

  const scale = useScale();

  return (
    <>
      <div ref={mref} className="a4 pdf resume" id={id} style={{ transform: `scale(${scale})` }}>
        <div className="container">
          {children}
        </div>
      </div>
    </>
  )
}

export function Header({ name, title, children }: any) {
  return (
    <>
      <div className="header">
        <h1 className='name'>{name}</h1>
        {title && <h3 className='title'>{title}</h3>}
        {children}
      </div>
    </>
  )
}

export function Main({ children }: any) {
  return (
    <>
      <div className="main">
        {children}
      </div>
    </>
  )
}

export function Col({ width, className, children }: any) {
  return (
    <>
      <div className={`col ${className}`} style={{ width: width }}>
        {children}
      </div>
    </>
  )
}

export function SectionL({ name, spaced, subsection, children }: any) {
  return (
    <>
      <div className={subsection ? 'section inline subsection' : 'section inline'}>
        {name && <h4>{name}</h4>}
        <ul style={{ listStyle: "none", padding: 0 }} className={spaced ? 'spaced' : ''}>
          {Children.map(children, child => <li>{child}</li>)}
        </ul>
      </div>
    </>
  )
}

export function SectionI({ name, subsection, children }: any) {
  return (
    <>
      <div className={subsection ? 'section inline subsection' : 'section inline'}>
        {name && <h4>{name}</h4>}
        <div className='content'>
          {children}
        </div>
      </div>
    </>
  )
}

export const Line = () => <span className='line'></span>;
export const Text = ({ children }: any) => <li><span>{children}</span></li>

export function IconText({ icon, text }: any) {
  return (
    <>
      <div className='icon-text'>
        <span><i className={icon}></i></span>
        <span>{text}</span>
      </div>
    </>
  )
}

export function IconLink({ icon, text, link }: any) {
  return (
    <>
      <div className='icon-text'>
        <span><i className={icon}></i></span>
        <a href={link} target='_blank'>{text}</a>
      </div>
    </>
  )
}

export function EducationL({ education }: any) {
  return (
    <>
      <div className='education list'>
        <span className='top'>{education.degree || education.name}</span>
        <span className='middle'>{education.institution || education.issuer}</span>
        <span className='bottom'>{education.date || (education.start && parseDate(education.start) + " - " + parseDate(education.end))}</span>
      </div>
    </>
  );
}

export function EducationI({ education }: any) {
  return (
    <>
      <div className='education inline'>
        <span className='top'>{education.degree || education.name}</span>
        <div className='flex'>
          <span className='middle'>{education.institution || education.issuer}</span>
          <span className='bottom'>{education.date || (education.start && education.start + " - " + education.end)}</span>
        </div>
      </div>
    </>
  );
}

export function Work({ work }: { work: Work }) {
  return (
    <>
      <div className='work'>
        <div className='row'>
          <span className='pos'>{work.position}</span>
          <span>{work.start && parseDate(work.start) + " - " + ((work.end != undefined && work.end != "") ? parseDate(work.end) : "present")}</span>
        </div>
        <div className='row'>
          <span>{work.company}</span>
          <span>{work.location}</span>
        </div>
        <ul>
          {work.description.map((dsc: string) => <li><span>{dsc}</span></li>)}
        </ul>
      </div>
    </>
  )
}

function Language({ lang }: any) {
  return (
    <>
      <span className='lang'>
        <span className="language-color" style={{ backgroundColor: languages[lang] }}></span>
        <span className='language-name'>{lang}</span>
      </span>
    </>
  )
}

export function Project({ project }: { project: Project }) {
  return (
    <>
      <div className="project">
        <div className="row">
          <span className="name">{project.name}</span>
        </div>
        <div className="row">
          <div>
            {project.github && <IconLink text='Github' icon='fa-brands fa-github' link={"https://" + project.github} />}
          </div>
          <div>
            {[...project.languages].map((lang: string) => <Language key={lang} lang={lang} />)}
          </div>
        </div>
        {project.description.length > 0 &&
          <ul>
            {project.description.map((dsc: string, i) => <li key={i}><span>{dsc}</span></li>)}
          </ul>
        }
      </div>
    </>
  )
}
