import React from 'react'
import "./Loading.css"

const Loading = (): React.ReactElement => {
  return (
    <div className='loading-container'>
      <div className='loading'>
          <div className="loading-dial"></div>
      </div>
    </div>
  )
}

export default Loading
