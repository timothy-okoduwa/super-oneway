import React, { useRef, useEffect, useState } from 'react';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import { NavLink, useLocation } from 'react-router-dom';
import './Navbar.css';

const NavBar = () => {
  const location = useLocation();
  const isHiddenPage2 =
    location.pathname === '/admin' ||
    location.pathname === '/paidupload' ||
    location.pathname === '/dashboard' ||
    location.pathname.startsWith('/freeupdate/') ||
    location.pathname.startsWith('/paidupdate/') ||
    location.pathname === '/freeupload';

 const stickyHeader = useRef();
 const [isSticky, setIsSticky] = useState(false);

 const scrollDistance = 50; // distance from top of page when navbar becomes sticky

 useEffect(() => {
   const handleScroll = () => {
     if (window.pageYOffset >= scrollDistance) {
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
  return (
    <>
      {isHiddenPage2 ? null : (
        <div className='whip'>
          <Navbar
          
            expand="lg"
            className={`dark mainHeader ${isSticky ? 'fixed-top' : ''}`}
            id="mainHeader"
            ref={stickyHeader}
          >
            <Container>
              <Navbar.Brand className="push">
                <b>Oneway Template</b>.
              </Navbar.Brand>
              <Navbar.Toggle
                aria-controls="basic-navbar-nav"
                className="bg-light"
              />
              <Navbar.Collapse id="basic-navbar-nav">
                <Nav className=" nav">
                  <NavLink to="/" style={{ textDecoration: 'none' }}>
                    <div className="wowww">Home</div>
                  </NavLink>

                  <NavLink to="/free" style={{ textDecoration: 'none' }}>
                    <div className="pushs">Free Template</div>
                  </NavLink>
                </Nav>
              </Navbar.Collapse>
            </Container>
          </Navbar>
        </div>
      )}
    </>
  );
};

export default NavBar;
