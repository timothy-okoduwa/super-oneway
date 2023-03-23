import React, { useState, useEffect } from 'react';
import Button from '@mui/material/Button';
import Form from 'react-bootstrap/Form';
import './Upload.css';
import { v4 as uuidv4 } from 'uuid';
import { BiUpload } from 'react-icons/bi';
import CircularProgress from '@mui/material/CircularProgress';
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
import { useNavigate } from 'react-router-dom';
import SideBar from '../DashBoard/SideBar';
const Upload = () => {
  const navigate = useNavigate();
  const [productImages, setProductImages] = useState([]);
  const [selectedImage, setSelectedImage] = useState(null);
  const [name, setName] = useState('');
  const [price, setPrice] = useState('');
  const [type, setType] = useState('');
  const [headDist, setHeadDist] = useState('');
  const [isButtonClicked, setIsButtonClicked] = useState(false);
  const [url, setUrl] = useState('');
  const [description, setDescription] = useState('');
  const [uploadProgress, setUploadProgress] = useState(0);
  const [info, setInfo] = useState({ error: null, loading: false });

  const { loading } = info;

  const [imageError, setImageError] = useState(null);

  const handleInvalidImage = () => {
    setImageError('Invalid file type. Please upload an image file.');
  };

  const freeAdd = async () => {
    setInfo({ ...info, error: null, loading: true });
    setIsButtonClicked(true);
    // Generate a unique ID for the product and image folders
    const uuid = uuidv4();

    const images = [];
    const uploadTasks = [];

    for (let i = 0; i < productImages.length; i++) {
      const fileName = productImages[i] ? productImages[i].name : null;

      if (fileName) {
        const imagesRef = ref(
          storage,
          `images/productImages/${uuid}/${fileName}`
        );
        const fileRef = ref(imagesRef);
        const uploadTask = uploadBytesResumable(fileRef, productImages[i]);

        uploadTasks.push(uploadTask);

        uploadTask.on('state_changed', (snapshot) => {
          const progress = Math.round(
            (snapshot.bytesTransferred / snapshot.totalBytes) * 100
          );
          console.log(`Upload of image ${i} is ${progress}% done`);
          setUploadProgress((prevProgress) => {
            const updatedProgress = [...prevProgress];
            updatedProgress[i] = progress;
            return updatedProgress;
          });
        });

        const snapshot = await uploadTask;
        const downloadURL = await getDownloadURL(snapshot.ref);

        images.push(downloadURL);
      }
    }

    // Initialize the upload progress state for all images to be 0%

    //add the template to firestore

    const docRef = doc(db, 'free', 'free');
    const docSnap = await getDoc(docRef);
    const businessData = docSnap.data();

    const newProduct = {
      name: name,
      price: price,
      type: type,
      headDist: headDist,
      url: url,
      description: description,
      dateAdded: Timestamp.fromDate(new Date()),
      imageUrls: images,
      templateId: uuid,
    };

    await updateDoc(docRef, {
      products: arrayUnion(newProduct),
    });
    setName('');
    setPrice('');
    setType('');
    setHeadDist('');
    setDescription('');

    navigate('/dashboard');
  };
  useEffect(() => {
    setUploadProgress(new Array(productImages.length).fill(0));
  }, [productImages]);

  const handleImageChange = (event) => {
    const images = [];
    const maxImages = 15; // maximum number of images

    if (event.target.files.length > maxImages) {
      alert('Sorry, you can only upload up to 15 images');
      for (let i = 0; i < maxImages; i++) {
        const file = event.target.files[i];
        const imgUrl = URL.createObjectURL(file);
        setSelectedImage(imgUrl);
        images.push(file);
      }
    } else {
      for (let i = 0; i < event.target.files.length; i++) {
        const file = event.target.files[i];
        const imgUrl = URL.createObjectURL(file);
        setSelectedImage(imgUrl);
        images.push(file);
      }
    }

    setProductImages(images);
  };

  const handleDeleteImage = (index, event) => {
    const updatedImages = [...productImages];
    updatedImages.splice(index, 1);
    setProductImages(updatedImages);
    // add this line to prevent the default form submission behavior
    event.stopPropagation();
  };

  return (
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
            upload for free Template
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
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                    />
                  </Form.Group>
                  <Form.Group className="mb-4" controlId="formBasicEmail">
                    <Form.Label className="banb">free Price</Form.Label>
                    <Form.Control
                      placeholder="Enter free Price"
                      value={price}
                      
                      onChange={(e) => setPrice(e.target.value)}
                    />
                  </Form.Group>
                  <Form.Group className="mb-4" controlId="formBasicEmail">
                    <Form.Label className="banb">Type</Form.Label>
                    <Form.Select
                      aria-label="Default select example"
                      className="form-control"
                      value={type}
                      onChange={(e) => setType(e.target.value)}
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
                    <Form.Label className="banb">Header Description</Form.Label>
                    <Form.Control
                      placeholder=" Headerdist"
                      value={headDist}
                      onChange={(e) => setHeadDist(e.target.value)}
                    />
                  </Form.Group>
                  <Form.Group className="mb-4" controlId="formBasicEmail">
                    <Form.Label className="banb">Template Url</Form.Label>
                    <Form.Control
                      placeholder="Enter Url"
                      value={url}
                      onChange={(e) => setUrl(e.target.value)}
                    />
                  </Form.Group>
                  <div className="mb-4" controlId="formBasicEmail">
                    <Form.Label className="banb">Discription</Form.Label>
                    <Form.Control
                      as="textarea"
                      rows={7}
                      placeholder="Enter Description"
                      value={description}
                      onChange={(e) => setDescription(e.target.value)}
                    />
                  </div>
                  <div className="push-down container">
                    <div className="hiih"> Product Images (Max 15)</div>

                    <div className="row jikl">
                      {productImages.map((image, index) => (
                        <div
                          className="col-6"
                          key={index}
                          style={{
                            position: 'relative',
                          }}
                        >
                          <img
                            src={URL.createObjectURL(image)}
                            alt={`Product mage ${index}`}
                            className="tambo img-fluid"
                            style={{
                              borderRadius: '9px',
                              border: '1px solid lightgrey',
                              objectFit: 'cover',
                              margin: '5px',
                              width: '100%',
                            }}
                            onError={handleInvalidImage}
                          />
                          <div
                            style={{
                              position: 'absolute',
                              top: '50%',
                              left: '50%',
                              transform: 'translate(-50%, -50%)',
                            }}
                          >
                            <div
                              className="pRogress"
                              style={{
                                background: '#E9ECEF',
                                borderRadius: '50%',
                                display: 'flex',
                                justifyContent: 'center',
                                alignItems: 'center',
                                height: '40px',
                                width: '40px',
                              }}
                            >
                              {uploadProgress[index] > 0 && (
                                <CircularProgress
                                  style={{ height: '25px', width: '25px' }}
                                  variant="determinate"
                                  value={uploadProgress[index]}
                                />
                              )}
                              {/* {uploadProgress[index]}% */}
                            </div>
                          </div>
                          {!isButtonClicked && (
                            <div
                              className="bubu"
                              onClick={(event) =>
                                handleDeleteImage(event, index)
                              }
                            >
                              X
                            </div>
                          )}
                        </div>
                      ))}

                      {productImages.length < 15 && (
                        <div className="">
                          <div className="realise">
                            <Button
                              variant="outlined"
                              as="label"
                              htmlFor="upload"
                              style={{
                                cursor: 'pointer',
                                display: 'flex',
                                alignItems: 'center',
                                borderRadius: '18px',
                              }}
                            >
                              <BiUpload
                                style={{
                                  fontSize: '20px',
                                  marginRight: '10px',
                                }}
                              />
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
                        </div>
                      )}
                    </div>

                    {imageError && (
                      <div className="text-danger">{imageError}</div>
                    )}
                  </div>

                  <div className="d-flex justify-content-center mt-5">
                    <Button
                      onClick={freeAdd}
                      variant="contained"
                      disabled={
                        !name ||
                        !price ||
                        !type ||
                        !headDist ||
                        !url ||
                        !description ||
                        !selectedImage
                      }
                    >
                      {loading ? (
                        <>
                          <span
                            style={{
                              display: 'flex',
                              justifyContent: 'center',
                              alignItems: 'center',
                            }}
                          >
                            Uploading{' '}
                            <CircularProgress
                              style={{
                                height: '25px',
                                width: '25px',
                                color: 'white',
                                marginLeft: '10px',
                              }}
                            />
                          </span>
                        </>
                      ) : (
                        'upload '
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
  );
};

export default Upload;
