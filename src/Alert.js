import React, { useEffect } from 'react'

const Alert = ({alert, showAlert, list}) => {
  const {show, msg, type} = alert;

  useEffect( () => {
    const timeout = setTimeout( () => { showAlert(false, '', '')}, 3000)
    return () => clearTimeout(timeout);
  }, [list])
  return (
    <div>
      { show ?
        <p className={`alert alert-${type}`}>{msg}</p> : 
        <p className="alert"></p>
      }
    </div>
    
  )
}

export default Alert
