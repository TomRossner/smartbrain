import React, { useEffect, useRef, useState } from 'react';
import { predict, updateUser } from '../../http/requests';
import BoundingBox from '../BoundingBox';
import loader from "../../assets/loader.png";
import { useDispatch } from 'react-redux';
import useAuth from '../../hooks/useAuth';
import useImage from '../../hooks/useImage';

const Home = () => {
    const [inputFieldValue, setInputFieldValue] = useState("");
    const [boundingBoxes, setBoundingBoxes] = useState([]);
    const [isLoading, setLoading] = useState(false);
    const imgRef = useRef(null);
    const [error, setError] = useState("");
    const dispatch = useDispatch();
    const {setUser, currentUser} = useAuth();
    const {setImageUrl, imageUrl} = useImage();

    const handleFileUpload = (e) => {
      const reader = new FileReader();
      const filesLength = e.target.files.length;
      reader.addEventListener("load", () => dispatch(setImageUrl(reader.result)));

      if (filesLength) reader.readAsDataURL(e.target.files[0]);
      if (boundingBoxes.length) resetBoundingBoxes();
      return reader.removeEventListener("load", dispatch(setImageUrl(reader.result)));
    }

    const handleInputChange = (e) => setInputFieldValue(e.target.value);

    const handleAddImage = () => {
      if (!inputFieldValue) return;

      if (boundingBoxes.length) resetBoundingBoxes();

      if (error) resetError();

      dispatch(setImageUrl(inputFieldValue));

      return setInputFieldValue("");
    }

    const resetBoundingBoxes = () => setBoundingBoxes([]);

    const resetError = () => setError("");

    const predictImage = async () => {
      try {
        const {data: {results}} = await predict(imageUrl);

        const calculatedResults = results[0].map(result => {
          const {region_info: {bounding_box}} = result;
          return calculateFaceLocation(bounding_box);
        });

        if (error) resetError();

        setBoundingBoxes(calculatedResults);
      } catch ({response}) {
        return setError(response.data.error);
      }
    }

    const handleDetect = async () => {
      setLoading(true);

      if (boundingBoxes) resetBoundingBoxes();

      if (currentUser) {
        await predictImage();
        dispatch(setUser({...currentUser, predictions: currentUser.predictions + 1}));
        setLoading(false);
      } else {
        await predictImage();
        setLoading(false);
      }
    }

    const calculateFaceLocation = (face) => {
      const image = imgRef.current;
      const width = Number(image.width);
      const height = Number(image.height);
      return {
        left: face.left_col * width,
        top: face.top_row * height,
        right: width - (face.right_col * width),
        bottom: height - (face.bottom_row * height)
      }
    }

    useEffect(() => {
      const update = async () => {
        if (currentUser) return await updateUser(currentUser);
      }
      update();
    }, [currentUser]);

  return (
    <div className='container'>
      <h1>Welcome to Smart Brain</h1>
        <div className='input-container'>
        {currentUser ?
        <>
          <h2>Hi {currentUser.name.substring(0, 1).toUpperCase() + currentUser.name.substring(1, currentUser.name.length)}</h2>
          <p>So far, you have made {currentUser.predictions} submissions</p>
        </> : null}
            <div className='insert-img-url'>
              <input type="text" placeholder='Insert image URL' value={inputFieldValue} onChange={handleInputChange}/>
              <button type='button' id='add-img' className='btn' onClick={handleAddImage}>Add</button>
            </div>
            <div className='upload-from-computer'>
              <span className='or'>OR</span>
              <label className='btn' htmlFor='uploadFromComputer'>Upload from device</label>
            </div>
            <input
              type="file"
              placeholder='Insert image URL'
              id='uploadFromComputer'
              accept='image/png, image/jpg, image/jpeg'
              onChange={handleFileUpload}
            />
        </div>
        {error && <p className='error'>{error}</p>}
        {imageUrl ? <button type='button' id='detect' className='btn' onClick={handleDetect}>Detect faces</button> : null}
        <div className='image-container'>
            {isLoading ? <div className='loading-overlay on'><div className='spinner-container'><img src={loader} alt="loader"></img></div></div> : <div className='loading-overlay off'></div>}
            <img src={imageUrl} ref={imgRef} alt=""/>
            {boundingBoxes.map((box, index) => <BoundingBox key={index} box={box}/>)}
        </div>
    </div>
  )
}

export default Home;