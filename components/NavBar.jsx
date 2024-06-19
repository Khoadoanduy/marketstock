'use client'
import React, { useRef } from 'react';
import { useRouter } from 'next/router';
import { HiOutlineMenuAlt4 } from 'react-icons/hi';
import { AiOutlineClose } from 'react-icons/ai';
import { FaFacebook, FaInstagram, FaPinterest, FaTwitter, FaYoutube } from 'react-icons/fa';
import "@/styles/NavBar.css";
import Link from 'next/link';
function NavBar() {
    const navRef = useRef(null);
    const logoRef = useRef(null);
    const mobileMenuRef = useRef(null);
    const iconRef = useRef(null);
    // const router = useRouter();

    const handleNav = () => {
        const nav = navRef.current;
        const logo = logoRef.current;
        const mobileMenu = mobileMenuRef.current;
        const icon = iconRef.current;

        if (nav.classList.contains('navbar-bg')) {
            nav.classList.remove('navbar-bg');
            logo.classList.remove('dark');
            mobileMenu.classList.remove('active');
            icon.classList.remove('close-icon');
        } else {
            nav.classList.add('navbar-bg');
            logo.classList.add('dark');
            mobileMenu.classList.add('active');
            icon.classList.add('close-icon');
        }
    };

    // const showClick = () => {
    //     router.push('/login');
    // };

    return (
        <div>
            <div name='home' ref={navRef} className='navbar'>
                <div ref={logoRef} className='logo'>
                    <h2>Stock market</h2>
                </div>
                <ul className="nav-menu">
                    <li><Link href='/' legacyBehavior><a>Home</a></Link></li>
                    <li><Link href='/about' legacyBehavior><a>About</a></Link></li>
                </ul>
                {/* <div className="login-wrapper">
                    <a className="login" onClick={showClick}>Login</a>
                </div> */}
                <Link className="text-sm mt-3 text-right" href={"/login"}>
                    Log in
                </Link>
                <div className="hamburger" onClick={handleNav}>
                    <HiOutlineMenuAlt4 ref={iconRef} className='icon' />
                </div>
                <div ref={mobileMenuRef} className='mobile-menu'>
                    <ul className="mobile-nav">
                        <li><Link href='/' legacyBehavior><a>Home</a></Link></li>
                        <li><Link href='/about' legacyBehavior><a>About</a></Link></li>
                    </ul>
                    <div className="mobile-menu-bottom">
                        <div className="social-icons">
                            <FaFacebook className='icon' />
                            <FaInstagram className='icon' />
                            <FaTwitter className='icon' />
                            <FaPinterest className='icon' />
                            <FaYoutube className='icon' />
                        </div>
                    </div>
                </div>
            </div>
            <hr className="line"></hr>
        </div>
    );
}

export default NavBar;
