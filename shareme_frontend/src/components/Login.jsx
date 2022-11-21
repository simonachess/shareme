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
    const decoded = jwt_decode(response.credential)
    localStorage.setItem('user', JSON.stringify(decoded))
    const { name, sub, picture } = decoded

    const doc = {
      _id: sub,
      _type: 'user',
      userName: name,
      image: picture
    }

    client.createIfNotExists(doc)
      .then(() => {
        navigate('/', { replace: true })
      })
  }

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
