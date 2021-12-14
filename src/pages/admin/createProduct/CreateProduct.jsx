import './CreateProduct.scss';
import { Link } from 'react-router-dom';
import { Add, ArrowBackSharp } from '@material-ui/icons';
import { useState, useEffect } from 'react';
import {
  getStorage,
  ref,
  getDownloadURL,
  uploadBytesResumable,
} from 'firebase/storage';
import app from '../../../firebase.js';
import axios from 'axios';

const CreateProduct = () => {
  const [values, setValues] = useState({
    product: '',
    desc: '',
    categories: '',
    sizes: '',
    colours: '',
    price: 0,
  });
  const [img, setImg] = useState(null);
  const [selectedFile, setSelectedFile] = useState();
  const handleTextValue = (e) => {
    const value = e.target.value;
    setValues({ ...values, [e.target.name]: value });
  };
  useEffect(() => {
    if (!selectedFile) {
      setImg(undefined);
      return;
    }

    const objectUrl = URL.createObjectURL(selectedFile);
    setImg(objectUrl);
    return () => URL.revokeObjectURL(objectUrl);
  }, [selectedFile]);

  const onSelectFile = (e) => {
    if (!e.target.files || e.target.files.length === 0) {
      setSelectedFile(undefined);
      return;
    }
    setSelectedFile(e.target.files[0]);
  };

  const [status, setStatus] = useState({ success: null, msg: '' });
  const [uploaded, setUploaded] = useState(false);

  const handleUpload = async (e) => {
    e.preventDefault();
    const storage = getStorage(app);
    setUploaded(false);
    try {
      const storageRef = ref(storage, selectedFile.name);
      const uploadTask = uploadBytesResumable(storageRef, selectedFile);
      await uploadTask.on(
        'state_changed',
        (snapshot) => {
          const progress =
            (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
          console.log('Upload is ' + progress + '% done');
          switch (snapshot.state) {
            case 'paused':
              console.log('Upload is paused');
              break;
            case 'running':
              console.log('Upload is running');
              break;
            default:
          }
        },
        (error) => {
          console.log(error);
        },
        () => {
          getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
            setImg(downloadURL);
            setUploaded(true);
          });
        }
      );
      setUploaded(true);
    } catch (error) {
      console.log(error);
    }
  };

  const handlePublish = async (e) => {
    e.preventDefault();
    const size = values.sizes.split(',');
    const colour = values.colours.split(',');
    const category = values.categories.split(',');
    const { product, desc, price } = values;
    try {
      await axios.post(
        `${process.env.REACT_APP_API}/products`,
        {
          product,
          desc,
          price,
          size,
          colour,
          category,
          img,
        },
        { headers: { authorization: `Bearer ${localStorage.getItem('x_3')}` } }
      );
      setStatus({ success: true, msg: 'Published Successfully' });
    } catch (error) {
      setStatus({
        success: false,
        msg: 'Some thing went wrong try again later',
      });
    }
  };
  return (
    <>
      <section className="create-product">
        <Link to="/admin/products" style={{ textDecoration: 'none' }}>
          <button className="b2p">
            <ArrowBackSharp style={{ fontSize: '1rem' }} />
            Back To Products List
          </button>
        </Link>
        <form className="create-form">
          <div className="text-input">
            <input
              type="text"
              placeholder="Product"
              name="product"
              onChange={handleTextValue}
              required
            />
            <textarea
              placeholder="Descriptions"
              name="desc"
              onChange={handleTextValue}
              required
            ></textarea>
            <input
              type="text"
              placeholder="Category"
              name="categories"
              onChange={handleTextValue}
              required
            />
            <input
              type="text"
              placeholder="Size"
              name="sizes"
              onChange={handleTextValue}
              required
            />
            <input
              type="text"
              placeholder="Colour"
              name="colours"
              onChange={handleTextValue}
              required
            />
            <input
              type="number"
              placeholder="Price"
              name="price"
              onChange={handleTextValue}
              required
            />
          </div>
          <div className="preview-section">
            <div className="preview">
              {selectedFile && (
                <img src={img} alt={Date.now()} className="preview-img" />
              )}
            </div>
            <label htmlFor="file">
              <Add />
              <input type="file" onChange={onSelectFile} id="file" />
            </label>
            {uploaded ? (
              <button onClick={handlePublish}>Publish</button>
            ) : (
              <button onClick={handleUpload}>Upload</button>
            )}
          </div>
        </form>
        {status.success === true && <p className="msg success">{status.msg}</p>}
        {status.success === false && <p className="msg fail">{status.msg}</p>}
      </section>
    </>
  );
};

export default CreateProduct;
