import React,{useState} from 'react'
import Button from '@mui/material/Button';
import Form from 'react-bootstrap/Form';
import './Upload.css'
import { v4 as uuidv4 } from 'uuid';
import {BiUpload} from 'react-icons/bi'
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
import { db,storage } from '../../firebase';
import { useNavigate } from 'react-router-dom';
import SideBar from '../DashBoard/SideBar';
const Upload = () => {
     const navigate = useNavigate();
     const [productImages, setProductImages] = useState([]);
  const [selectedImage, setSelectedImage] = useState(null);
const [name,setName]= useState('')
const [price,setPrice]= useState('')
const [type,setType]= useState('')
const [headDist,setHeadDist]= useState('')
const [url,setUrl]= useState('')
const [description,setDescription]= useState('')
const [uploadProgress, setUploadProgress] = useState(0);
  const [info, setInfo] = useState({ error: null, loading: false });

  const [imageError, setImageError] = useState(null);

  const handleInvalidImage = () => {
    setImageError('Invalid file type. Please upload an image file.');
  };


   const { loading } = info;
const paidAdd = async () => {
  setInfo({ ...info, error: null, loading: true });

  // Generate a unique ID for the product and image folders
  const uuid = uuidv4();

  const images = [];
  //upload multiple image to firebase storage
  for (let i = 0; i < productImages.length; i++) {
    const fileName = productImages[i] ? productImages[i].name : null;

    if (fileName) {
      const imagesRef = ref(
        storage,
        `images/productImages/${uuid}/${fileName}`
      );
      const fileRef = ref(imagesRef);
      const uploadTask = uploadBytesResumable(fileRef, productImages[i]);

      let totalBytesTransferred = 0;
      let totalBytes = 0;

      uploadTask.on('state_changed', (snapshot) => {
        // Keep track of the total bytes transferred and total bytes of all files
        totalBytesTransferred += snapshot.bytesTransferred;
        totalBytes += snapshot.totalBytes;

        // Calculate the overall progress percentage
        const progress = Math.round((totalBytesTransferred / totalBytes) * 100);
        console.log(`Upload is ${progress}% done`);
        setUploadProgress(progress);
      });

      const snapshot = await uploadTask;
      const downloadURL = await getDownloadURL(snapshot.ref);

      images.push(downloadURL);
    }
  }

  //add the template to firestore

  const docRef = doc(db, 'paid', 'paid');
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
            upload for paid Template
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
                    <Form.Label className="banb">Price</Form.Label>
                    <Form.Control
                      placeholder="Enter Price"
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
                        <div className="col-6  " key={index}>
                          <img
                            src={URL.createObjectURL(image)}
                            alt={`Product mage ${index}`}
                            className="tambo img-fluid"
                            style={{
                              borderRadius: '9px',
                              border: '1px solid lightgrey',
                              objectFit: 'cover',
                              margin: '5px',
                              // set image height
                              width: '100%', // set image width to fill the column
                            }}
                            onError={handleInvalidImage}
                          />
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
                      onClick={paidAdd}
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
                          <span style={{ marginLeft: '10px' }}>
                            Upload is {uploadProgress}% done
                          </span>
                        </>
                      ) : (
                        <>add Template</>
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
}

export default Upload