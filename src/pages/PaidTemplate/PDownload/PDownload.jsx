import React,{useState,useEffect} from 'react';
import './PDownload.css';
import f from './fin.png'
import { useParams, useNavigate } from 'react-router-dom';
import Button from 'react-bootstrap/Button';
import {
  getDocs,
  doc,
  collection,
  getDoc,
  Timestamp,
  updateDoc,
  increment,
} from 'firebase/firestore';
import { getAnalytics, logEvent } from 'firebase/analytics';
import { db } from '../../../firebase';
const PDownload = () => {

 const { templateId } = useParams();
  const [product, setProduct] = useState(null);
 const [business, setBusiness] = useState(null);
const analytics = getAnalytics();


 const [users, setUsers] = useState([]);
 const usersCollectionRef = collection(db, 'paid');

 useEffect(() => {
   const getUsers = async () => {
     const data = await getDocs(usersCollectionRef);
     setUsers(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
   };

   getUsers();
 }, []);



const userClick = async () => {
  const freeRef = doc(db, 'paid', 'paid');
  const currentDate = new Date();
  const currentYear = currentDate.getFullYear();
  const currentMonth = currentDate.getMonth();
  const currentMonthName = currentDate.toLocaleString('default', {
    month: 'long',
  });
  const freeDocSnap = await getDoc(freeRef);
  const freeDocData = freeDocSnap.data();
  const totalDownloads = freeDocData.totalDownloads || {};

  const currentYearArray = totalDownloads[currentYear] || {};
  const currentMonthObj = currentYearArray[currentMonth] || {
    name: currentMonthName,
    count: 0,
  };

  await updateDoc(freeRef, {
    Downloads: increment(1),
    dateDownloaded: Timestamp.fromDate(currentDate),
    totalDownloads: {
      ...totalDownloads,
      [currentYear]: {
        ...currentYearArray,
        [currentMonth]: {
          ...currentMonthObj,
          count: currentMonthObj.count + 1,
          lastDownloadDate: Timestamp.fromDate(currentDate),
        },
      },
    },
  });

  // console.log(totalDownloads);
};








  useEffect(() => {
    const getProduct = async () => {
      try {
        const querySnapshot = await getDocs(collection(db, 'paid'));
        querySnapshot.forEach((doc) => {
          const businessData = doc.data();
          const products = businessData.products;
          const product = products?.find(
            (product) => product.templateId === templateId
          );
          if (product) {
            console.log(product); // Add this line to check if the product state is being set
            setProduct(product || {});
            setBusiness(businessData || {});
          }
        });
      } catch (error) {
        console.error(error);
      }
    };

    getProduct();
  }, [db, templateId]);




  const navigate = useNavigate();

  const move = () => {
    navigate('/');
 





  };
  return product ? (
    <>
      {
        <div
          style={{
            backgroundColor: 'black',
            paddingTop: '200px',
            color: 'white',
          }}
        >
          <div className="container">
            <div className="center">
              Thank you for choosing <b className="Tempp">{product.name}</b>{' '}
              Template 🙏
            </div>
            <div className="cent">
              <div className="imgcc">
                <img src={product.imageUrls || f} alt="" className="imgcc" />
              </div>
            </div>
            <div className="buttt">
              {' '}
              <a
                href={product.url}
                target="_blank"
                rel="noopener noreferrer"
                style={{ textDecoration: 'none', color: 'white' }}
              >
                <Button
                  type="submit"
                  className="mt-2"
                  onClick={() => {
                    move();
                    userClick();
                    logEvent(analytics, 'free_download', {
                      item_name: product.name,
                      item_id: doc(product).id,
                    });
                  }}
                >
                  Download
                </Button>
              </a>
            </div>
            {users.map((user) => {
              return (
                <div className="otal">
                  we have a total number of{' '}
                  <span className=" mx-2">{user.Downloads || 0}</span> paid
                  downloads
                </div>
              );
            })}
          </div>
        </div>
      }
    </>
  ) : null;
};

export default PDownload;
