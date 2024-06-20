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

  // const createOrGetUser = async (response) => {
  //   const decoded = jwt_decode(response.credential)
  //   response.setHeader('Access-Control-Allow-Credentials', true)
  //   response.setHeader('Access-Control-Allow-Origin', '*')
  //   response.setHeader('Access-Control-Allow-Methods', 'GET,OPTIONS,PATCH,DELETE,POST,PUT')
  //   response.setHeader(
  //   'Access-Control-Allow-Headers',
  //   'X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version'
  // )
  //   localStorage.setItem('user', JSON.stringify(decoded))
  //   const { name, sub, picture } = decoded

  //   const doc = {
  //     _id: sub,
  //     _type: 'user',
  //     userName: name,
  //     image: picture
  //   }

  //   client.createIfNotExists(doc)
  //     .then(() => {
  //       navigate('/', { replace: true })
  //     })
  // }

  const createOrGetUser = async (response) => {
    try {
      // Assuming `response` contains some data to decode
      const decoded = jwt_decode(response.credential); // Example: Decode JWT token
      response.setHeader('Access-Control-Allow-Credentials', true)
      response.setHeader('Access-Control-Allow-Origin', '*')
      response.setHeader('Access-Control-Allow-Methods', 'GET,OPTIONS,PATCH,DELETE,POST,PUT')
      response.setHeader(
        'Access-Control-Allow-Headers',
        'X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version'
      )
      // Setting local storage with decoded user information
      localStorage.setItem('user', JSON.stringify(decoded));
      
      // Extracting necessary properties from decoded JWT
      const { name, sub, picture } = decoded;
      
      // Example document structure for client.createIfNotExists
      const doc = {
        _id: sub,
        _type: 'user',
        userName: name,
        image: picture
      };
      
      // Example of how to use client.createIfNotExists (adjust as per your client API)
      await client.createIfNotExists(doc);
      
      // Navigating to '/' after successful creation
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
