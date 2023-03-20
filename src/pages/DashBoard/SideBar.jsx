import React, { useState ,useEffect} from 'react';
import './DashBoard.css';
import a from './one.ico';
import {
  RiDashboardFill,
  RiUploadCloud2Fill,
  RiSettings4Fill,
} from 'react-icons/ri';
import { SiUploaded } from 'react-icons/si';
import { AiOutlinePoweroff } from 'react-icons/ai';
import { NavLink,useNavigate } from 'react-router-dom';
import { FaBars, FaTimes } from 'react-icons/fa';

const SideBar = () => {
      const [isSidebarVisible, setIsSidebarVisible] = useState(true);
const navigate = useNavigate()

const move =()=>{
  navigate('/')
}
const move2 =()=>{
  navigate('/admin')
}
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth <= 991) {
        setIsSidebarVisible(false);
      } else {
        setIsSidebarVisible(true);
      }
    };

    window.addEventListener('resize', handleResize);

    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const toggleSidebar = () => {
    setIsSidebarVisible(!isSidebarVisible);
  };

  return (
    <>
      <div
        className="height"
        style={{
          transform: isSidebarVisible ? 'translateX(0)' : 'translateX(-100%)',
        }}
      >
        <div className="switch-container">
          <div onClick={toggleSidebar} className="switch">
            {isSidebarVisible ? <FaTimes /> : <FaBars />}
          </div>
        </div>
        <div>
          <div className=" seat">
            <div onClick={move}>
              <img src={a} alt="" style={{ width: '30%' }} />
            </div>
            <div className="div">
              <div className="flow">
                <div className="boly">
                  <NavLink
                    style={{ textDecoration: 'none' }}
                    to="/dashboard"
                    activeClassName="active"
                    exact
                  >
                    <div className="icon">
                      <RiDashboardFill className="icon" />
                    </div>
                  </NavLink>
                </div>
              </div>
              <div className="mt-3 nono">dashboard</div>
            </div>
            <div className="div">
              <div className="flow">
                <div className="boly">
                  <NavLink style={{ textDecoration: 'none' }} to="/paidupload">
                    <div className="icon">
                      <RiUploadCloud2Fill className="icon" />
                    </div>
                  </NavLink>
                </div>
              </div>
              <div className="mt-3 nono">Paid upload</div>
            </div>
            <div className="div">
              <div className="flow">
                <div className="boly">
                  <NavLink style={{ textDecoration: 'none' }} to="/freeupload">
                    <div className="icon">
                      <SiUploaded className="icon" />
                    </div>
                  </NavLink>
                </div>
              </div>
              <div className="mt-3 nono">Free upload</div>
            </div>
            <div className="div">
              <div className="flow">
                <div className="boly">
                  <div className="icon">
                    <RiSettings4Fill className="icon" />
                  </div>
                </div>
              </div>
            </div>
            <div className="bottom">
              <AiOutlinePoweroff className="icon2" onClick={move2} />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default SideBar;
