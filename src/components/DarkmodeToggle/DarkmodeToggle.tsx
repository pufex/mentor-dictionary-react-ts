import React from 'react'
import { useThemeContext } from '../../App'
import "./DarkmodeToggle.css"

const DarkmodeToggle = (): React.ReactElement => {

  const {theme, switchTheme} = useThemeContext();

  return <div
    className={
      theme == "dark" 
        ? "darkmode-toggle-container active"
        : "darkmode-toggle-container"
    }
  >
    <div 
      className="darkmode-toggle"
      onClick={switchTheme}
    >
      <div className="darkmode-toggle-circle"></div>
    </div>
    <div  className="darkmode-icon"></div>
  </div>
}

export default DarkmodeToggle
