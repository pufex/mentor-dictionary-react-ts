import React from 'react'
import {Link} from "react-router-dom"

const ErrorElement = (): React.ReactElement => {
  return <div className="error-component-container">
      <h1
        className="error-component__header"
      >
        {"There was a problem :("}
      </h1>
      <Link 
        to="/"
        className="error-component__link"
      >
        Go home
      </Link>
  </div>
}

export default Error
