import React,{useState,useEffect} from 'react';
import Free from '../Free/Free';
import Newsletter from '../../NewsLetter/Newsletter';
import { RiSearchLine } from 'react-icons/ri';
import './Home.css';
import { Link } from 'react-scroll';
import CircularProgress from '@mui/material/CircularProgress';
import {
  doc,
  // deleteDoc,
  getDoc,
  updateDoc,
  onSnapshot,
} from 'firebase/firestore';
import { db } from '../../../firebase';
import a from './images/Group.png';
import Buttons from './FButtons';

const FHome = () => {
     const [search, setSearch] = useState('');
     const [originalUser, setOriginalUser] = useState([]);
    const [user, setUser] = useState([]);
     const [loading, setLoading] = useState(true);
    useEffect(() => {
      const docRef = doc(db, 'free', 'free');

      const unsubscribe = onSnapshot(docRef, (docSnap) => {
        if (docSnap.exists()) {
          setUser(docSnap.data());
           setOriginalUser(docSnap.data());
            setLoading(false);
        }
      });

      return () => unsubscribe();
    }, []);


  const menuItems =
    user?.products?.length > 0
      ? [...new Set(user?.products?.map((val) => val?.type))]
      : [];

  const filterItem = (curcat) => {
    const newItem = user?.products?.filter((newVal) => {
      return newVal?.type === curcat;
    });
    console.log(newItem);
    setUser({ ...user, products: newItem });
  };

  if (loading) {
    return (
      <div
        style={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          height: '100vh',
          backgroundColor: 'black',
        }}
      >
        <CircularProgress style={{ width: '70px', height: '70px',color:'white' }} />
      </div>
    );
  } 

  return (
    <>
      <div style={{ backgroundColor: 'black' }}>
        <div class="container22">
          <img
            src={a}
            alt="Snow"
            style={{ width: '100%', height: '100vh', objectFit: 'cover' }}
          />

          <div class="centered container">
            <div className="mt-5 ">
              <div className="firsts">
                Free Design Resources.
                <div className="introoo">
                  Get the best UI & Website Template
                </div>
              </div>
              <div className="searchbarholder">
                <div className="sighh">
                  <RiSearchLine className="tpti" />
                  <input
                    className="ok"
                    placeholder=" web, figma, xd 😉"
                    onChange={(event) => {
                      setSearch(event.target.value);
                    }}
                  />
                </div>
              </div>
              <div>
                <Link
                  to="Free"
                  spy={true}
                  offset={-70}
                  smooth={true}
                  duration={220}
                >
                  <Buttons
                    filterItem={filterItem}
                    setUser={setUser}
                    user={user}
                    menuItems={menuItems}
                    originalUser={originalUser}
                  />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>

      <Free search={search} user={user} />

      <Newsletter />
    </>
  );
};

export default FHome;
