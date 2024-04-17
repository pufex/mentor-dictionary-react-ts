import React from 'react'
import "./Footer.css"

const Footer = (): React.ReactElement => {
  return <footer
    className="footer-container"
  >
    <div className="footer">
        <div className="footer-logo"></div>
        <span className="footer-copyright">
            © This site belongs to Dictionary™.
        </span>
    </div>
  </footer>
}

export default Footer
