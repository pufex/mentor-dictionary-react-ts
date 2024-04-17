import React, { useEffect, useRef } from 'react'
import { NavLink, useParams } from 'react-router-dom';
import DarkmodeToggle from '../DarkmodeToggle/DarkmodeToggle';
import FontToggle from '../FontToggle/FontToggle';
import "./Navbar.css"

const Navbar = (): React.ReactElement => {

    const NavbarRef = useRef<HTMLDivElement | null>(null)

    return <>
        <nav
            className="nav-container"
            ref={NavbarRef}
        >
            <div
                className="nav"
            >
                <section className="nav-left">
                    <NavLink
                        to="/"
                        className="nav-logo-link"
                    >
                        <div className="nav-logo"></div>
                    </NavLink>
                </section>
                <section className="nav-right">
                    <FontToggle />
                    <DarkmodeToggle />
                </section>
            </div>
        </nav>
    </>
  
}

export default Navbar
