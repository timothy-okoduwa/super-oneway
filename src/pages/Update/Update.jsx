import React, { useState, useEffect } from 'react';
import Button from '@mui/material/Button';
import Form from 'react-bootstrap/Form';
import CircularProgress from '@mui/material/CircularProgress';
import './Update.css';
import { v4 as uuidv4 } from 'uuid';
import {
  doc,
  updateDoc,
  arrayUnion,
  Timestamp,
  getDoc,
} from 'firebase/firestore';
import {
  getStorage,
  ref,
  uploadBytesResumable,
  getDownloadURL,
} from 'firebase/storage';
import { db, storage } from '../../firebase';
import { useNavigate, useParams } from 'react-router-dom';
import SideBar from '../DashBoard/SideBar';
const Update = () => {
  const { templateId } = useParams();
  const navigate = useNavigate();

  const [business, setBusiness] = useState(null);
  const [product, setProduct] = useState({
    productImages: [],
    name: '',
    price: '',
    type: '',
    headDist: '',
    url: '',
    description: '',
  });

  const [uploadProgress, setUploadProgress] = useState(0);
  const [info, setInfo] = useState({ error: null, loading: false });

  const { loading } = info;
  useEffect(() => {
    const getProduct = async () => {
      try {
        const docRef = doc(db, 'paid', 'paid');
        const docSnap = await getDoc(docRef);
        const businessData = docSnap.data();
        const products = businessData.products;
        const product = products.find(
          (product) => product.templateId === templateId
        );
        console.log(product); // Add this line to check if the product state is being set
        setProduct(product || {});
        setBusiness(businessData || {});
      } catch (error) {
        console.error(error);
      }
    };

    getProduct();
  }, [db, templateId]);

  const handleSubmit = async (event) => {
    event.preventDefault();
    setInfo({ ...info, error: null, loading: true });

    try {
      const docRef = doc(db, 'paid', 'paid');
      const docSnap = await getDoc(docRef);
      const businessData = docSnap.data();
      const products = businessData?.products;
      const newProducts = products?.map((p) =>
        p.templateId === templateId ? product : p
      );
      await updateDoc(docRef, { products: newProducts });
      // show success message
    } catch (error) {
      console.error(error);
      // show error message
    }
    navigate('/dashboard');
  };
  const handleTemplatePriceChange = (event) => {
    setProduct((prevState) => ({
      ...prevState,
      price: event.target.value,
    }));
  };
  const handleTemplateNameChange = (event) => {
    setProduct((prevState) => ({
      ...prevState,
      name: event.target.value,
    }));
  };
  const handleTemplateTypeChange = (event) => {
    setProduct((prevState) => ({
      ...prevState,
      type: event.target.value,
    }));
  };
  const handleTemplateHeadDistChange = (event) => {
    setProduct((prevState) => ({
      ...prevState,
      headDist: event.target.value,
    }));
  };
  const handleTemplateUrlChange = (event) => {
    setProduct((prevState) => ({
      ...prevState,
      url: event.target.value,
    }));
  };
  const handleTemplateDescriptionChange = (event) => {
    setProduct((prevState) => ({
      ...prevState,
      description: event.target.value,
    }));
  };

  return product ? (
    <>
      <SideBar />

      <div
        className=""
        style={{
          paddingTop: '100px',
          backgroundColor: 'rgb(236, 236, 236)',
          paddingBottom: '70px',
        }}
      >
        <div className="container">
          <div
            style={{
              textAlign: 'center',
              color: 'black',
              fontWeight: 'bold',
              fontSize: '22px',
            }}
          >
            update for paid Template
          </div>
          <div className="row mt-5">
            <div className="col-12 col-lg-3"></div>
            <div className="col-12 col-lg-6">
              <div>
                <Form>
                  <Form.Group className="mb-4" controlId="formBasicEmail">
                    <Form.Label className="banb">Name</Form.Label>
                    <Form.Control
                      placeholder="Enter Name"
                      defaultValue={product.name}
                      onChange={handleTemplateNameChange}
                    />
                  </Form.Group>
                  <Form.Group className="mb-4" controlId="formBasicEmail">
                    <Form.Label className="banb">Price</Form.Label>
                    <Form.Control
                      placeholder="Enter Price"
                      defaultValue={product.price}
                      onChange={handleTemplatePriceChange}
                    />
                  </Form.Group>
                  <Form.Group className="mb-4" controlId="formBasicEmail">
                    <Form.Label className="banb">Type</Form.Label>
                    <Form.Select
                      aria-label="Default select example"
                      className="form-control"
                      defaultValue={product.type}
                      onChange={handleTemplateTypeChange}
                    >
                      <option>Template Type</option>
                      <option value="XD">XD</option>
                      <option value="FIGMA">FIGMA</option>
                      <option value="WEB">WEB</option>
                      <option value="CANVA">CANVA</option>
                      <option value="PSD">PSD</option>
                    </Form.Select>
                  </Form.Group>
                  <Form.Group className="mb-4" controlId="formBasicEmail">
                    <Form.Label className="banb">Headerdist</Form.Label>
                    <Form.Control
                      placeholder=" Headerdist"
                      defaultValue={product.headDist}
                      onChange={handleTemplateHeadDistChange}
                    />
                  </Form.Group>
                  <Form.Group className="mb-4" controlId="formBasicEmail">
                    <Form.Label className="banb">Template Url</Form.Label>
                    <Form.Control
                      placeholder="Enter Url"
                      defaultValue={product.url}
                      onChange={handleTemplateUrlChange}
                    />
                  </Form.Group>
                  <div className="mb-4" controlId="formBasicEmail">
                    <Form.Label className="banb">Description</Form.Label>
                    <Form.Control
                      as="textarea"
                      rows={7}
                      placeholder="Enter Description"
                      defaultValue={product.description}
                      onChange={handleTemplateDescriptionChange}
                    />
                  </div>
                  {/* <div className="push-down container">
                    <div className=" hiih"> Product Images (Max 15)</div>

                    <div className="jikl">
                      <div className="terapist">
                        {productImages.length > 0 &&
                          productImages.map((image, index) => (
                            <img
                              key={index}
                              src={URL.createObjectURL(image)}
                              alt={`Product mage ${index}`}
                              className="plsna"
                              style={{
                                borderRadius: '9px',
                                border: '1px solid lightgrey',
                                objectFit: 'cover',
                                margin: '5px',
                              }}
                            />
                          ))}
                      </div>
                    </div>
                    <div className="realise">
                      <Button
                        variant="outlined"
                        as="label"
                        htmlFor="upload"
                        style={{ cursor: 'pointer' }}
                      >
                        upload image
                        <Form.Control
                          id="upload"
                          type="file"
                          multiple
                          required
                          accept="image/*"
                          style={{ display: 'none' }}
                          onChange={handleImageChange}
                        />
                      </Button>
                    </div>
                  </div> */}
                  <div className="d-flex justify-content-center mt-5">
                    <Button variant="contained" onClick={handleSubmit}>
                      {loading ? (
                        <CircularProgress
                          style={{
                            width: '25px',
                            height: '25px',
                            color: 'white',
                          }}
                        />
                      ) : (
                        'update profile'
                      )}
                    </Button>
                  </div>
                </Form>
              </div>
            </div>
            <div className="col-12 col-lg-3"></div>
          </div>
        </div>
      </div>
    </>
  ) : null;
};

export default Update;
