import React from 'react'
// import GoogleLogin from 'react-google-login'
import { useNavigate } from 'react-router-dom'
import shareVideo from '../assets/share.mp4'
import logo from '../assets/logowhite.png'
import { client } from '../client'
import { GoogleLogin } from '@react-oauth/google'
import jwt_decode from 'jwt-decode'

const Login = () => {

  const navigate = useNavigate()

  const createOrGetUser = async (response) => {
    try {
      const decoded = jwt_decode(response.credential);
      const { name, sub, picture } = decoded;
  
      // Store user data in localStorage
      localStorage.setItem('user', JSON.stringify(decoded));
  
      // Example document structure for client.createIfNotExists
      const doc = {
        _id: sub,
        _type: 'user',
        userName: name,
        image: picture
      };
  
      // Assuming client.createIfNotExists returns a promise
      await client.createIfNotExists(doc);
  
      // Navigate to '/' after successful creation or retrieval
      navigate('/', { replace: true });
    } catch (error) {
      console.error('Error creating or getting user:', error);
      // Handle error (e.g., show error message to user, retry logic, etc.)
    }
  };

  return (
    <div className="flex justify-start items-center flex-col h-screen">
     <div className="relative w-full h-full">
      <video
        src={shareVideo}
        type="video/mp4"
        loop
        controls={false}
        muted
        autoPlay
        className="w-full h-full object-cover"
      />
      <div className="absolute flex flex-col justify-center items-center inset-0 bg-blackOverlay">
        <div className="p-5">
          <img src={logo} width="130px" alt="logo" />
        </div>
        <div className="shadow-2xl">
          <GoogleLogin
            onSuccess={credentialResponse => {
              createOrGetUser(credentialResponse)
              navigate('/', { replace: true })
            }}
            onError={() => {
              console.log('Login Failed');
            }}
            auto_select
            useOneTap
          />
        </div>
      </div>
     </div>
    </div>
  )
}

export default Login
