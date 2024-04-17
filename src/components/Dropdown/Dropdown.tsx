import React, {useState} from 'react'
import "./Dropdown.css"

type DropdownProps = {
    list: string[],
    currentChoice: string,
    onChoice: (newChoice: string) => void,
}

const Dropdown = ({list, onChoice, currentChoice}:DropdownProps) => {

    const [dropped, setDropped] = useState<boolean>(false)

    const dropdownList = list?.map((item) => {
        return <li
            className="dropdown__list-item"
            onClick={() => {
                onChoice(item)
                setDropped(false)
            }}
        >   
            {item}
        </li>
    })

    return <div className="dropdown">
        <div className="dropdown__choice-container">
            <span className='dropdown__choice'>
                {currentChoice}
            </span>
            <button
                className={
                    dropped
                        ? 'btn btn--dropdown active'
                        : 'btn btn--dropdown'
                }
                onClick={() => {
                    setDropped(previousState => !previousState)
                }}
            ></button>
        </div>
        <div 
            className={
                dropped 
                    ? "dropdown__list-container active"
                    : "dropdown__list-container"
            }
            style={{
                height: `${
                    list.length < 4
                        ? list.length*2
                        : 8
                }rem`,
            }}
        >
            <ul className="dropdown__list">
                {dropdownList}
            </ul>
        </div>
    </div>
  
}

export default Dropdown
