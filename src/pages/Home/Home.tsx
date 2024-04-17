import React from 'react'
import Search from '../../components/Search/Search'
import "./Home.css"

const Home = (): React.ReactElement => {
    return <main
        className="home"
    >
        <div
            className="home__trademark-container"
        >
            <div className='home__trademark'></div>
            <h1 className="home__bussiness-title">
                Dictionary
            </h1>
        </div>
        <div
            className="home__search-container"
        >
            <Search
                placeholder="Find a keyword!"
            />
        </div>
    </main>
}

export default Home
