import React, { useState, useEffect } from 'react';
import './DashBoard.css';
import SideBar from './SideBar';
import Chats from './Chats';
import FreeUpload from '../Upload/FreeUpload';
import CircularProgress from '@mui/material/CircularProgress';
import { MdLibraryBooks, MdPaid, MdFreeCancellation } from 'react-icons/md';
import { BsArrowUp, BsArrowDown, BsThreeDotsVertical } from 'react-icons/bs';
import { FcLineChart } from 'react-icons/fc';
import ReactAnimatedNumber from 'react-animated-number';
import FreeMap from './FreeMap';
import PaidMap from './PaidMap';
import {
  doc,
  getDocs,
  updateDoc,
  onSnapshot,
  collection,
} from 'firebase/firestore';
import { db } from '../../firebase';
const DashBoard = () => {
  const [paid, setPaid] = useState([]);
  const [paidCount, setPaidCount] = useState(0);
  const [free, setFree] = useState([]);
  const [freeCount, setFreeCount] = useState(0);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const docRef = doc(db, 'paid', 'paid');

    const unsubscribe = onSnapshot(docRef, (docSnap) => {
      if (docSnap.exists()) {
        setPaid(docSnap.data());
        setPaidCount(docSnap.data().products.length);
        setLoading(false);
      }
    });

    return () => unsubscribe();
  }, []);
  useEffect(() => {
    const docRef = doc(db, 'free', 'free');

    const unsubscribe = onSnapshot(docRef, (docSnap) => {
      if (docSnap.exists()) {
        setFree(docSnap.data());
        setFreeCount(docSnap.data().products.length);
        setLoading(false);
      }
    });

    return () => unsubscribe();
  }, []);


    if (loading) {
      return (
        <div
          style={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            height: '100vh',
            
          }}
        >
          <CircularProgress
            style={{ width: '70px', height: '70px', color: 'black' }}
          />
        </div>
      );
    } 
  return (
    <>
      <SideBar />
      <div className="soso">
        <div className="container">
          <div className="row">
            <div className="col-12 col-lg-4 mb-4">
              <div className="boxx container">
                <div className="d-flex justify-content-around pt-4">
                  <div>
                    <div className="headerr">Total Template</div>
                    <div className="winkk">
                      <ReactAnimatedNumber
                        value={paidCount + freeCount || 0}
                        duration={2000}
                        formatValue={(value) => value.toFixed(0)}
                      />
                    </div>
                  </div>
                  <div className="blend">
                    <MdLibraryBooks className="logo" />
                  </div>
                </div>
                <div>
                  {paidCount + freeCount < 10 ? (
                    <BsArrowDown className="arrwo2" />
                  ) : (
                    <BsArrowUp className="arrwo" />
                  )}
                </div>
              </div>
            </div>
            <div className="col-12 col-lg-4 mb-4">
              <div className="boxx container">
                <div className="d-flex justify-content-around pt-4">
                  <div>
                    <div className="headerr">Paid Template</div>
                    <div className="winkk">
                      {' '}
                      <ReactAnimatedNumber
                        value={paidCount || 0}
                        duration={2000}
                        formatValue={(value) => value.toFixed(0)}
                      />
                    </div>
                  </div>
                  <div className="blend2">
                    <MdPaid className="logo" />
                  </div>
                </div>
                <div>
                  {paidCount < 10 ? (
                    <BsArrowDown className="arrwo2" />
                  ) : (
                    <BsArrowUp className="arrwo" />
                  )}
                </div>
              </div>
            </div>

            <div className="col-12 col-lg-4 mb-4">
              <div className="boxx container">
                <div className="d-flex justify-content-around pt-4">
                  <div>
                    <div className="headerr">Free Template</div>
                    <div className="winkk">
                      {' '}
                      <ReactAnimatedNumber
                        value={freeCount || 0}
                        duration={2000}
                        formatValue={(value) => value.toFixed(0)}
                      />
                    </div>
                  </div>
                  <div className="blend3">
                    <MdFreeCancellation className="logo" />
                  </div>
                </div>
                <div>
                  {freeCount < 10 ? (
                    <BsArrowDown className="arrwo2" />
                  ) : (
                    <BsArrowUp className="arrwo" />
                  )}
                </div>
              </div>
            </div>
          </div>
          <div className="row mb-4 mt-2">
            <div className="col-12 col-lg-4 mb-4">
              <div className="boxx container">
                <div className="headerr pt-4 px-4">
                   Total downloads for <br />
                  Free Template
                </div>
                <div className="chartss">
                  <div className="winkkd px-4">
                    <ReactAnimatedNumber
                      value={free.Downloads || 0}
                      duration={2000}
                      formatValue={(value) => value.toFixed(0)}
                    />{' '}
                    <span className="noo">Downloads</span>
                  </div>
                  <div>
                    <FcLineChart className="codh" />
                  </div>
                </div>
              </div>
            </div>
            <div className="col-12 col-lg-4 ">
              <div className="boxx container">
                <div className="headerr pt-4 px-4">
                  Total downloads for <br />
                  Paid Template
                </div>
                <div className="chartss">
                  <div className="winkkd px-4">
                    <ReactAnimatedNumber
                      value={paid.Downloads || 0}
                      duration={2000}
                      formatValue={(value) => value.toFixed(0)}
                    />{' '}
                    <span className="noo">Downloads</span>
                  </div>
                  <div>
                    <FcLineChart className="codh" />
                  </div>
                </div>
              </div>
            </div>
            <div className="col-12 col-lg-4"></div>
          </div>
          <div className="row">
            <div className="col-12 col-lg-7 mb-4" style={{ height: '500px' }}>
              <Chats />
            </div>
            <div className="col-12 col-lg-5  never">
              <div className="mt-4 mb-4">
                <div>All Products in oneWay Template</div>
              </div>
              <div className="coker">
                <PaidMap />
                <FreeMap />
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default DashBoard;
