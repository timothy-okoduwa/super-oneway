import React, { useState, useEffect } from 'react';
import './FDetail.css';
import a from './image.png';

import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import { getDocs, doc, collection } from 'firebase/firestore';
import { db } from '../../../../firebase';
import { useParams, useNavigate } from 'react-router-dom';

import Newsletter from '../../../NewsLetter/Newsletter';

const FDetail = () => {
  const { templateId } = useParams();
  const [product, setProduct] = useState(null);
  const [business, setBusiness] = useState(null);

  useEffect(() => {
    const getProduct = async () => {
      try {
        const querySnapshot = await getDocs(collection(db, 'free'));
        querySnapshot.forEach((doc) => {
          const businessData = doc.data();
          const products = businessData.products;
          const product = products?.find(
            (product) => product.templateId === templateId
          );
          if (product) {
            // console.log(product); // Add this line to check if the product state is being set
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

  const onSuccess = () => {
    navigate(`/fdownloadthankfree183636egndh03984*5^n/${product.templateId}`);
  };

  return product ? (
    <>
      {
        <div className="steadyy" style={{}}>
          <div class="container22">
            <img
              src={a}
              alt="Snow"
              style={{ width: '100%', height: '50vh', objectFit: 'cover' }}
            />

            <div class="centered">
              <div className="mt-5">
                <div className="firstsss">{product.name} </div>
                <div className="introoo">{product.headDist}</div>
              </div>
            </div>
          </div>

          <div className="" style={{ marginTop: '120px' }}>
            <div className="container">
              <div className="gistss">
                <div className="row">
                  <div className="col-12 mt-4 col-lg-11 ">
                    {product.imageUrls &&
                      product.imageUrls.map((url, index) => (
                        <div
                          key={index}
                          style={{ display: 'flex', flexDirection: 'row' }}
                        >
                          <img
                            style={{
                              width: '100%',
                              marginTop: '30px',
                              height: '500px',
                              objectFit: 'cover',
                            }}
                            src={url}
                            alt={`Slide ${index}`}
                          />
                        </div>
                      ))}
                  </div>
                </div>
                <div>
                  <Card style={{ width: '18rem' }} className="vard mt-5">
                    <Card.Img
                      variant="top"
                      src={product.imageUrls || a}
                      className="p-2"
                      style={{
                        borderRadius: '15px',
                        height: '230px',
                        objectFit: 'cover',
                      }}
                    />
                    <Card.Body>
                      <Card.Title className="cname">{product.name}</Card.Title>
                      <Card.Text>✓ {product.type}</Card.Text>
                      <Card.Text> {product.price}</Card.Text>
                      <div>
                        <Button onClick={onSuccess} className="mt-3">
                          {' '}
                          Proceed Download
                        </Button>
                      </div>
                    </Card.Body>
                  </Card>
                </div>
              </div>
            </div>

            <div className="dowmm">
              <div className="container mt-5 ">
                <div className="view">
                  <b>Overview</b>
                  <div className="mt-4">{product.description}</div>
                </div>

                <br />
                <div className=" lay">Compatability</div>
                <div className="compact">
                  {/* <img src={a} alt="" style={{ width: '100%' }} /> */}
                  <div
                    style={{
                      color: 'white',
                      marginTop: '10px',
                      fontSize: '20px',
                      fontWeight: 'bold',
                    }}
                  >
                    {product.type}
                  </div>
                </div>

                <Newsletter />
              </div>
            </div>
          </div>
        </div>
      }
    </>
  ) : null;
};

export default FDetail;
