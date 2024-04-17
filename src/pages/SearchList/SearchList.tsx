import React, { useEffect } from 'react'
import Search from '../../components/Search/Search'
import Searchkey from './components/Searchkey'
import { useKeysContext } from '../../App'
import { useSearchParams, Link, useParams } from 'react-router-dom'
import "./SearchList.css"

type SearchParamsType = {
    key: string,
}

const SearchList = (): React.ReactElement => {
    const [searchQuery, setSearchQuery] = useSearchParams(); 

    const keys = useKeysContext().filter((key) => {
        if(key.word.toLowerCase().includes(searchQuery.get("key")!.toLowerCase()))
            return true;
        else false;
    });

    let keysList = keys?.map((key, index) => {
        console.log(index, key)
        return <Searchkey
            word={key.word}
            phonethics={key.phonethics}
            meanings={key.meanings}
        />
    })

    return <main
        className="searchlist-main"
    >
        <div className="searchlist__searchbar-container">
            <Search
                placeholder='Search again...'
                defaultValue={searchQuery.get("key")!}
            />
        </div>
        <header
            className="searchlist__header"
        >
            <h1 className="searchlist__heading">
                {`Results for: ${searchQuery.get("key")!}`}
            </h1>
            <span className='searchlist__matches-amount'>
                {`This many keys matched the search: ${keys.length}`} 
            </span>
        </header>
        <ul
            className="searchlist"
        >
            {
                keys.length > 0
                    ? <>
                        {keysList}
                    </>
                    : <div className='searchlist-empty'>
                        <span className="searchlist__empty-information">
                            Looks like nothing matched!
                        </span>
                        <Link
                            to="/"
                            className='searchlist__link'
                        >
                            Go back home!
                        </Link>
                    </div>
            }
        </ul>
    </main>
}

export default SearchList
