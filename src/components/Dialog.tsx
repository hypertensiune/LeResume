import './components.scss';

export function Dialog({
  open,
  onClose, 
  onConfirm,
  type,
  children,
}: {
  open: boolean, 
  onClose: React.MouseEventHandler, 
  onConfirm: React.MouseEventHandler,
  type: 'info' | 'delete' | 'edit'
  children: any
}) {
  
  if(!open) {
    return <></>
  }

  return (
    <div className="overlay">
      <div className="dialog">
        {children}
        <div className="footer">
          <button className="secondary" onClick={onClose}>Cancel</button>
          <button className={`secondary ${type === 'delete' && 'delete'}`} onClick={onConfirm}>{type === 'delete' ? 'Delete' : 'Confirm'}</button>
        </div>
      </div>
    </div>
  )
}

export function Title({text, description}: {text: string, description?: string | undefined}) {
  return (
    <div className="title">
      <h1>{text}</h1>
      {description && <h2>{description}</h2>}
    </div>
  )
}

export function Body({children}: {children: any}) {
  return (
    <div className="body">
      {children}
    </div>
  )
}