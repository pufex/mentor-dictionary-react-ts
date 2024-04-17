import React, { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import "./NotFound.css"

const NotFound = (): React.ReactElement => {

    let navigate = useNavigate();

    const [time, setTime] = useState<number>(5);

    useEffect(() => {
        let intervalId = setInterval(() => {
            setTime(previousTime => previousTime-1)
        }, 1000)
        return () => {
            clearInterval(intervalId);
        }
    }, [])

    useEffect(() => {
        if(time <= 0)
            navigate("/")
    }, [time])

    return <main className="unfound__main">
        <h1 className="unfound__heading">
            Error 404
        </h1>
        <p className="unfound__message">
            The site you're looking for wasn't found!
        </p>
        <span className='unfound--bottom'>
            <Link
                to="/"
                className={"unfound__link"}
            >
                {"Go back home"}
            </Link>
            <span className='unfound__message'>
                {` or get moved there in ${time.toString()}sec...`}
            </span>
        </span>
    </main>
}

export default NotFound
