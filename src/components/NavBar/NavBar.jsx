import React, { useRef, useLayoutEffect } from 'react';
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
  useLayoutEffect(() => {
    const mainHeader = document?.getElementById('mainHeader');
    let fixedTop = stickyHeader?.current?.offsetTop;
    const fixedHeader = () => {
      if (window.pageYOffset > fixedTop) {
        mainHeader?.classList?.add('fixedTop');
      } else {
        mainHeader?.classList?.remove('fixedTop');
      }
    };
    window?.addEventListener('scroll', fixedHeader);
  }, []);
  return (
    <>
      {isHiddenPage2 ? null : (


      <div>
        <Navbar
          expand="lg"
          className="dark mainHeader "
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
