import React, { useState, useEffect, useRef } from 'react';
import './DashBoard.css';
import IconButton from '@mui/material/IconButton';
import Tooltip from '@mui/material/Tooltip';
import a from './pp1.png';
import { Link } from 'react-router-dom';
import CircularProgress from '@mui/material/CircularProgress';
import { BsThreeDotsVertical } from 'react-icons/bs';
import { doc, getDoc, updateDoc, onSnapshot } from 'firebase/firestore';
import { ref, deleteObject,listAll } from 'firebase/storage';
import { db,storage } from '../../firebase';

const ProductItem = ({ product }) => {
  const [isSuseOn, setIsSuseOn] = useState(false);

 

const handleToggleSuse = () => {
  setIsSuseOn((prevIsSuseOn) => !prevIsSuseOn || false);
};



const handleDelete = async (templateId) => {
  const adminRef = doc(db, 'free', 'free');
  const adminDoc = await getDoc(adminRef);

  if (!adminDoc.exists()) {
    console.log('No such document!');
    return;
  }

  // Retrieve the products field from the document data
  const products = adminDoc.data().products;

  // Find the product to delete by templateId
  const productToDelete = products.find(
    (product) => product.templateId === templateId
  );

  const productImagesRef = ref(storage, `images/productImages/${templateId}`);

  // Delete all the files in the folder
  try {
    const listResult = await listAll(productImagesRef);
    const deletePromises = listResult.items.map((itemRef) =>
      deleteObject(itemRef)
    );
    await Promise.all(deletePromises);
    console.log('All files in folder deleted successfully.');
  } catch (error) {
    console.log('Error deleting files in folder:', error);
  }

  // Delete the folder itself
  try {
    await deleteObject(productImagesRef);
    console.log('Folder deleted successfully.');
  } catch (error) {
    console.log('Error deleting folder:', error);
  }

  // Update the products field of the document in Firestore
  const updatedProducts = products.filter(
    (product) => product.templateId !== templateId
  );
  await updateDoc(adminRef, { products: updatedProducts });
};
  return (
    <div>
      <div className="holders">
        <div onClick={() => setIsSuseOn(false)}>
          <div className="goeh">
            <div className="imagecard">
              <img src={product.imageUrls || a} alt="" className="imagecard" />
            </div>
            <div className="twooe">
              <div className="hce">{product.name}</div>
              <div className="times">
                {' '}
                created on {product.dateAdded.toDate().toDateString()}
              </div>
            </div>
          </div>
        </div>
        <div className={isSuseOn ? 'leban ' : 'leban hidden'}>
          <Link
            to={`/freeupdate/${product.templateId}`}
            style={{ textDecoration: 'none', color: 'black' }}
          >
            <div className="ed">edit template</div>
          </Link>

          <div className="ed" onClick={() => handleDelete(product.templateId)}>
            delete template
          </div>
        </div>
        <div className="suse">
          {' '}
          <Tooltip title="options">
            <IconButton onClick={handleToggleSuse}>
              <BsThreeDotsVertical style={{ fontSize: '17px' }} />
            </IconButton>
          </Tooltip>
        </div>
      </div>
    </div>
  );
};

const FreeMap = () => {
  const [user, setUser] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const docRef = doc(db, 'free', 'free');

    const unsubscribe = onSnapshot(docRef, (docSnap) => {
      if (docSnap.exists()) {
        setUser(docSnap.data());

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
            marginTop: '107px',
            marginBottom: '22px',
          }}
        >
          <CircularProgress
            style={{
              width: '35px',
              height: '35px',
              color: 'black',
              display: 'flex',
              justifyContent: 'center',
            }}
          />
        </div>
      );
    }

  return (
    <div>
      <div className="pdisk">free Templates</div>
      <>
        {user?.products?.map((product) => (
          <ProductItem key={product.id} product={product} />
        ))}
      </>
    </div>
  );
};

export default FreeMap;
