import { useSelector } from 'react-redux';
import { useRef, useState, useEffect } from 'react';
import { supabase } from '../supabase';
import { updateUserStart, updateUserSuccess, updateUserFailure, deleteUserFailure, deleteUserStart, deleteUserSuccess } from '../redux/user/userSlice.js';
import { useDispatch } from 'react-redux';


export default function Profile() {
  const { currentUser, loading, error } = useSelector((state) => state.user);
  console.log(currentUser);
  console.log('Avatar', currentUser?.avatar);
  const fileRef = useRef(null);
  const [file, setFile] = useState(undefined);
  const [formData, setFormData] = useState({});
  const [fileUploadError, setFileUploadError] = useState(false);
  const [filePerc, setFilePerc] = useState(false);
  const [updateSuccess, setUpdateSuccess]= useState(false);
  const dispatch = useDispatch();
  const handleFileUpload = async (file) => {
  try {
    setFileUploadError(false);
    setFilePerc(true); // uploading started

    if (file.size > 2 * 1024 * 1024) {
      setFileUploadError(true);
      setFilePerc(false);
      return;
    }

    const fileName = Date.now() + file.name;
    const { error } = await supabase.storage
      .from('avatars')
      .upload(fileName, file);

    if (error) {
      setFileUploadError(true);
      setFilePerc(false);
      return;
    }

    const { data: urlData } = supabase.storage
      .from('avatars')
      .getPublicUrl(fileName);

    setFormData({ ...formData, avatar: urlData.publicUrl });
    setFilePerc(false);
  } catch (error) {
    setFileUploadError(true);
    setFilePerc(false);
    console.error(error);
  }
};
useEffect(() => {
    if (file) {
      handleFileUpload(file);
    }
  }, [file]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      dispatch(updateUserStart());
      const res = await fetch(`/api/user/update/${currentUser._id}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });
      const data = await res.json();
      if (data.success === false) {
        console.log(data.message);
        dispatch(updateUserFailure(data.message));
        return;
      }
      console.log('Updated:', data);
      dispatch(updateUserSuccess(data));
      setUpdateSuccess(true);
    } catch (error) {
      console.log(error);
      dispatch(updateUserFailure(error.message));
    }
  };

  const handleDeleteUser = async () => {
    try {
      dispatch(deleteUserStart());
      const res = await fetch(`/api/user/delete/${currentUser._id}`, {
        method: 'DELETE',
      });
      const data = await res.json();
      if (data.success === false) {
        console.log(data.message);
        dispatch(deleteUserFailure(data.message));
        return;
      }
      dispatch(deleteUserSuccess(data));
    } catch (error) {
      dispatch(deleteUserFailure(error.message));
      
    }
  }

  return (
    <div className='p-3 max-w-lg mx-auto'>  
      <h1 className="text-3xl font-semibold text-center my-7 ">
        Profile
        </h1>
      <form onSubmit={handleSubmit} className='flex flex-col gap-4'>
        <input onChange={(e) => setFile(e.target.files[0])}
        type='file' ref={fileRef} hidden accept='image/*'/>
        <img 
        onClick={()=>fileRef.current.click()} src={formData.avatar || currentUser?.avatar} alt="Profile"
        width="200"
        onLoad={()=> console.log("Image loaded")}
        onError={()=> console.log("Image failed to load")}
        className='rounded-full h-24 w-24 object-cover cursor-pointer
        self-center mt-2' />
        <p className='text-sm self-center'>
          {fileUploadError ? (
            <span className='text-red-700'>
              Error uploading image (file must be less than 2MB)
            </span>
          ) : filePerc ? (
            <span className='text-slate-700'>Uploading...</span>
          ) : formData.avatar ? (
            <span className='text-green-700'>Image uploaded successfully!</span>
          ) : (
            ''
          )}
        </p>
        <input onChange={handleChange}
        type="text" placeholder='username'  defaultValue={currentUser?.username}id='username'
        className='border p-3 rounded-lg'  />
        <input onChange={handleChange}
        type="email" placeholder='email' defaultValue={currentUser?.email} id='email'
        className='border p-3 rounded-lg'  />
        <input onChange={handleChange}
        type="password" 
        placeholder='password' 
        defaultValue={currentUser?.password} id='password'
        className='border p-3 rounded-lg'  />

        <button disabled={loading} className='bg-slate-700 text-white rounded-lg p-3
        uppercase hover:opacity-95 disabled:opacity-80'>
          {loading ? 'Updating...' : 'Update'}
          </button>
      </form>
      <div className='flex justify-between mt-5'>
        <span onClick={handleDeleteUser} className='text-red-700 cursor-pointer'>Delete Account</span>
        <span className='text-red-700 cursor-pointer'>Sign Out</span>
      </div>
          <p className='text-green-700 mt-5'>{updateSuccess ? 'Profile updated successfully!' : ''}</p>

    </div>
  )
}
