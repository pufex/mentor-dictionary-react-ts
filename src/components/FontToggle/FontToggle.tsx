import React from 'react'
import "./FontToggle.css"
import Dropdown from '../Dropdown/Dropdown'
import { useFontContext } from '../../App'

const FontToggle = (): React.ReactElement => {

  const {fonts, currentFont, switchFont} = useFontContext();

  return <Dropdown 
    list={fonts}
    currentChoice={currentFont}
    onChoice={switchFont}
  />
}

export default FontToggle
