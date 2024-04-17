import React from 'react'
import "./ExternalLink.css"

type LinkProps = {
    children: string
}

const ExternalLink = ({children}:LinkProps) => {
  return <span className="outer-link-container">
    <a 
        href={children}
        target='_blank'
        className='outer-link'
    >
        {children}
    </a>
    <a
        className="btn btn--outerLink"
        target='_blank'
        href={children}
    ></a>
  </span>
}

export default ExternalLink
