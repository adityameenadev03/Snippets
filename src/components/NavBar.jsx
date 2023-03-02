import React, { useEffect, useRef, useState } from 'react'
import { MdOutlineToggleOn } from 'react-icons/md'
import { RiToggleFill } from 'react-icons/ri'
import { BsToggleOn, BsToggleOff } from 'react-icons/bs'
import { Link, Navigate } from 'react-router-dom'
import { signOut } from "firebase/auth";
import auth from '../firebase'
import { logout } from '../reducers/authSlice'
import { useSelector, useDispatch } from 'react-redux'


const NavBar = () => {
    const [isSticky, setIsSticky] = useState(false);
    const navbarRef = useRef();

    const dispatch = useDispatch();

    const user = useSelector(store => store.user.user)
    useEffect(() => {
        const handleScroll = () => {
            if (window.pageYOffset >= 80) {
                setIsSticky(true);
            } else {
                setIsSticky(false);
            }
        };
        window.addEventListener('scroll', handleScroll);
        return () => {
            window.removeEventListener('scroll', handleScroll);
        };
    }, []);

    function removeUser() {
        signOut(auth)
            .then(() => {
                dispatch(logout(null))
                localStorage.clear()
                console.log("User signed out successfully");
            })
            .catch((error) => {
                console.log(error.message);
            });
    }

    return (
        <div className={`navbar${isSticky ? 'sticky' : ''}`} ref={navbarRef}>
            <div className="logo">
                {/* <span>Snippty</span> */}
                <Link to={'/'} className="link" >
                    <h2 >Snippty</h2>
                </Link>
            </div>
            <div className="nav_links">
                <Link to={'/'} className="nav_link link">    <BsToggleOn className='darkMode' /></Link>
                <Link to={'/'} className="nav_link link">Snippets</Link>
                <Link to={'/create'} className="nav_link link">Create</Link>
                <span>{user.email}</span>
                <span className="nav_link link" onClick={removeUser}>Logout</span>
                {!user && <> <Link to={'/login'} className="nav_link link">Login</Link>
                    <Link to={'/signup'} className="nav_link link">Signup</Link> </>}

            </div>
        </div>
    )
}

export default NavBar