import './CreateProduct.scss';
import { Link } from 'react-router-dom';
import { Add, ArrowBackSharp } from '@material-ui/icons';
import { useState, useEffect } from 'react';
import { useParams } from 'react-router';
import {
  getStorage,
  ref,
  getDownloadURL,
  uploadBytesResumable,
} from 'firebase/storage';
import app from '../../../firebase.js';
import axios from 'axios';

const EditProduct = () => {
  const productId = useParams().id;
  const [values, setValues] = useState({});
  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const res = await axios.get(
          `${process.env.REACT_APP_API}/products/${productId}`,
          {
            headers: { authorization: `Bearer ${localStorage.getItem('x_3')}` },
          }
        );
        const { category, size, colour, ...rest } = res.data;
        setValues({
          ...rest,
          size: size.join(','),
          category: category.join(','),
          colour: colour.join(','),
        });
      } catch (error) {
        console.log(error);
      }
    };
    fetchProduct();
  }, [productId]);

  const [selectedFile, setSelectedFile] = useState();
  const [preview, setPreview] = useState(null);
  const handleTextValue = (e) => {
    const value = e.target.value;
    setValues({ ...values, [e.target.name]: value });
  };

  useEffect(() => {
    if (!selectedFile) {
      setPreview(undefined);
      return;
    }

    const objectUrl = URL.createObjectURL(selectedFile);
    setPreview(objectUrl);
    return () => URL.revokeObjectURL(objectUrl);
  }, [selectedFile]);
  const onSelectFile = (e) => {
    if (!e.target.files || e.target.files.length === 0) {
      setSelectedFile(undefined);
      return;
    }
    setSelectedFile(e.target.files[0]);
  };

  const [uploaded, setUploaded] = useState(false);
  const [status, setStatus] = useState({ success: null, msg: '' });

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
            setPreview(downloadURL);
            setUploaded(true);
          });
        }
      );
      setUploaded(true);
    } catch (error) {
      console.log(error);
    }
  };

  const handleEdit = async (e) => {
    e.preventDefault();
    const { product, desc, price } = values;
    try {
      await axios.patch(
        `${process.env.REACT_APP_API}/products/${productId}`,
        {
          product,
          desc,
          price,
          size: values.size.split(','),
          colour: values.colour.split(','),
          category: values.category.split(','),
          img: preview,
        },
        { headers: { authorization: `Bearer ${localStorage.getItem('x_3')}` } }
      );
      setStatus({ success: true, msg: 'Edited Successfully' });
      window.location.reload();
    } catch (error) {
      console.log(error);
      setStatus({
        success: false,
        msg: 'Some thing went wrong try again later',
      });
    }
  };
  return (
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
            value={values.product}
            name="product"
            onChange={handleTextValue}
          />
          <textarea
            value={values.desc}
            placeholder="Descriptions"
            name="desc"
            onChange={handleTextValue}
          ></textarea>
          <input
            value={values.category}
            type="text"
            placeholder="Category"
            name="category"
            onChange={handleTextValue}
          />
          <input
            value={values.size}
            type="text"
            placeholder="Size"
            name="size"
            onChange={handleTextValue}
          />
          <input
            value={values.colour}
            type="text"
            placeholder="Colour"
            name="colour"
            onChange={handleTextValue}
          />
          <input
            value={values.price}
            type="number"
            placeholder="Price"
            name="price"
            onChange={handleTextValue}
          />
        </div>
        <div className="preview-section">
          <div className="preview">
            {selectedFile ? (
              <img src={preview} alt={Date.now()} className="preview-img" />
            ) : (
              <img src={values.img} alt={Date.now()} className="preview-img" />
            )}
          </div>
          <label htmlFor="file">
            <Add />
            <input type="file" onChange={onSelectFile} id="file" />
          </label>
          {uploaded ? (
            <button onClick={handleEdit}>Edit</button>
          ) : (
            <button onClick={handleUpload}>Upload</button>
          )}
        </div>
      </form>
      {status.success === true && <p className="msg success">{status.msg}</p>}
      {status.success === false && <p className="msg fail">{status.msg}</p>}
    </section>
  );
};

export default EditProduct;
