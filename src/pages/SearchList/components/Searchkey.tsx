import React, {useEffect} from 'react'
import type { KeyDict } from '../../../App'
import { Link } from 'react-router-dom'
import "./Searchkey.css"

type SearchKeyProps = Pick<KeyDict, "word" | "phonethics" | "meanings">

const Searchkey = ({word, meanings}:SearchKeyProps): React.ReactElement => {
    
    useEffect(() => {
        console.log(word)
        console.log(meanings)
    }, [])
  
    return <div
        className='searchkey-container'
    >
        <div
            className="searchkey-container--top"
        >
            <Link
                to={`/key/${word}`}
                style={{
                    textDecoration: "none",
                }}
            >
                <h1
                    className="searchkey-title"
                >
                    {word}
                </h1>
            </Link>
            <span className="searchkey__partOfSpeech">
                {meanings[0]?.partOfSpeech}
            </span>
        </div>
        <div
            className="searchkey-container--bottom"
        >
            <h2 className="searchkey__definition-heading">
                Definition:
            </h2>
            <span className="searchkey__definition">
                {meanings[0]?.definitions[0]?.definition}
            </span>
        </div>
  </div>
}

export default Searchkey
