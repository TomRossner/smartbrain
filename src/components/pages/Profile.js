import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { updateProfileImg, updateUser } from '../../http/requests';
import useAuth from '../../hooks/useAuth';
import { useDispatch } from 'react-redux';

const Profile = () => {
    const navigate = useNavigate();
    const {currentUser, setUser} = useAuth();
    const dispatch = useDispatch();

    const handleFileUpload = async (e) => {
        const reader = new FileReader();
        const filesLength = e.target.files.length;

        reader.addEventListener("load", async () => {
            await updateProfileImg(currentUser?.email, reader.result)
            dispatch(setUser({...currentUser, imgUrl: reader.result}))
        });

        if (filesLength) reader.readAsDataURL(e.target.files[0]);
    }

    const handleRemovePicture = async () => {
        dispatch(setUser({...currentUser, imgUrl: ""}));
        return await updateProfileImg({...currentUser, imgUrl: ""});
    }

  return (
    <div className='profile-container'>
        <div className='content'>
            <div className='img-container'>
                {currentUser.imgUrl?.length ? <img src={currentUser?.imgUrl} alt="Profile"/> : <div className='empty-picture-profile'></div>}
            </div>
            <label htmlFor="upload-profile-picture">{currentUser.imgUrl ? "Change profile picture" : "Upload profile picture"}</label>
            <input type="file" name="upload-profile-picture" id="upload-profile-picture" onChange={handleFileUpload}></input>
            {currentUser.imgUrl ? <button className='btn' onClick={handleRemovePicture}>Remove picture</button> : null}
            <p>Name: <span>{currentUser.name}</span></p>
            <p>Member since: <span>{currentUser.created_at.split("T")[0]}</span></p>
            <p>Email: <span>{currentUser.email}</span></p>
            <p>Submissions: <span>{currentUser.predictions}</span></p>
        </div>
    </div>
  )
}

export default Profile;