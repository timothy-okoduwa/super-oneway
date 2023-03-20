import React, { useState, useEffect } from 'react';
import './Detailed.css';
import a from './image.png';
import Button from 'react-bootstrap/Button';
import { useParams, useNavigate } from 'react-router-dom';
import { usePaystackPayment } from 'react-paystack';
import { getDocs, doc, collection } from 'firebase/firestore';
import { db } from '../../../firebase';
import Card from 'react-bootstrap/Card';
import Form from 'react-bootstrap/Form';

import NewsLetter from '../../NewsLetter/Newsletter';

const Detailed = () => {
  const { templateId } = useParams();
  const [validated, setValidated] = useState(false);
  const [product, setProduct] = useState(null);
  const [business, setBusiness] = useState(null);

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

  const handleSubmit = (event) => {
    const form = event.currentTarget;
    if (form.checkValidity() === false) {
      event.preventDefault();
      event.stopPropagation();
    }

    setValidated(true);
  };

  const [email, setEmail] = useState('');
  const [name, setName] = useState('');

  const navigate = useNavigate();

  const config = {
    reference: new Date().getTime().toString(),
    email: email,
    phone: name,
    amount: product?.price * 100,
    publicKey: 'pk_live_dc0a46a8affdd06e7d7a9ce3bfd5c842c71d0511',
    // publicKey: 'pk_test_89aaa353160cbf6c9c97b5efb14e4e0ff3f5f5eb',
  };
  const onSuccess = (reference) => {
    navigate(
      `/pdownloadthakjeuyeyou112jrhghrhdgdhdgdvhd9876789jdEUIEU3U3U32UI43838ydjhgUYtyrtdhy9UJJSSH9276gdgnc12(*-*)487/${product?.templateId}`
    );
    setEmail(' ');
    setName(' ');
  };

  const onClose = () => {
    alert(
      'something went wrong make sure you enter your valid Email address 📧'
    );
    setEmail(' ');
    setName(' ');
  };

  const PaystackHookExample = () => {
    const initializePayment = usePaystackPayment(config);
    return (
      <div>
        <Button
          onClick={() => {
            initializePayment(onSuccess, onClose);
          }}
          className=" mt-2 biti "
          disabled={!email || !name}
        >
          Start Purchase
        </Button>
      </div>
    );
  };

  return product ? (
    <>
      {
        <div className="steady " style={{}}>
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
                      <Card.Text>₦ {product.price}</Card.Text>
                      <div>
                        <Form
                          noValidate
                          validated={validated}
                          onSubmit={handleSubmit}
                        >
                          <Form.Group controlId="validationCustom01">
                            <Form.Control
                              required
                              type="text"
                              placeholder="Enter your email"
                              value={email}
                              onChange={(e) => setEmail(e.target.value)}
                            />
                            <Form.Control.Feedback type="invalid">
                              please Enter number
                            </Form.Control.Feedback>
                          </Form.Group>

                          <Form.Group
                            controlId="validationCustom02"
                            className="mt-2"
                          >
                            <Form.Control
                              required
                              type="number"
                              placeholder="Enter your Phone Number"
                              value={name}
                              onChange={(e) => setName(e.target.value)}
                            />
                            <Form.Control.Feedback type="invalid">
                              please Enter number
                            </Form.Control.Feedback>
                          </Form.Group>

                          <PaystackHookExample />
                        </Form>
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
                  {/* <img src={} alt="" style={{ width: '100%' }} /> */}
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
                <NewsLetter />
              </div>
            </div>
          </div>
        </div>
      }
    </>
  ) : null;
};

export default Detailed;
