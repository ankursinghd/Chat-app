import React, { useContext, useState } from 'react'
import assets from '../assets/assets'
import { AuthContext } from '../context/AuthContext'

const LoginPage = () => {
  const [currState, setCurrState] = useState("Sign up")
  const [fullName, setFullName] = useState("")
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState("")
  const [bio, setBio] = useState("")
  const [isDataSubmitted, setIsDataSubmitted] = useState(false);

  const {login}=useContext(AuthContext)

  const onSubmitHandler = (event) => {
    event.preventDefault();
    if (currState === 'Sign up' && !isDataSubmitted) {
      setIsDataSubmitted(true);
      return;
    }
    // Here you can handle API call

    login(currState==="Sign up"? 'signup':'login',{fullName,email,password,
      bio
    })
  };

  return (
    <div className='min-h-screen bg-cover bg-center flex items-center justify-center gap-8 sm:justify-evenly max-sm:flex-col backdrop-blur-xl p-4'>
      {/* Left */}
      <img src={assets.logo_big} alt="" className='w-[min(30vw,250px)]' />

      {/* Right */}
      <form onSubmit={onSubmitHandler} className='border bg-white/20 text-white backdrop-blur-lg
      border-gray-500 p-6 flex flex-col gap-4 rounded-lg shadow-lg w-full max-w-sm'>

        <h2 className='font-semibold text-2xl flex justify-between items-center'>
          {currState}
          {isDataSubmitted && (
            <img
              onClick={() => setIsDataSubmitted(false)}
              src={assets.arrow_icon}
              alt="back"
              className='w-5 cursor-pointer'
            />
          )}
        </h2>

        {currState === "Sign up" && !isDataSubmitted && (
          <input
            onChange={(e) => setFullName(e.target.value)}
            value={fullName}
            type="text"
            className='p-2 border border-gray-500 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500 bg-transparent placeholder-gray-300'
            placeholder='Full Name'
            required
          />
        )}

        {!isDataSubmitted && (
          <>
            <input
              onChange={(e) => setEmail(e.target.value)}
              value={email}
              type="email"
              placeholder='Email Address'
              required
              className='p-2 border border-gray-500 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500 bg-transparent placeholder-gray-300'
            />
            <input
              onChange={(e) => setPassword(e.target.value)}
              value={password}
              type="password"
              placeholder='Password'
              required
              className='p-2 border border-gray-500 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500 bg-transparent placeholder-gray-300'
            />
          </>
        )}

        {currState === "Sign up" && isDataSubmitted && (
          <textarea
            onChange={(e) => setBio(e.target.value)}
            value={bio}
            rows={4}
            className='p-2 border border-gray-500 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500 bg-transparent placeholder-gray-300'
            placeholder='Provide a short bio...'
            required
          />
        )}

        <button type='submit' className='py-3 bg-gradient-to-r from-purple-400 to-violet-600 text-white rounded-md cursor-pointer'>
          {currState === 'Sign up' ? "Create Account" : "Login Now"}
        </button>

        <div className='flex items-center gap-2 text-sm'>
          <input type="checkbox" required />
          <p>Agree to the terms of use & privacy policy</p>
        </div>

        <div className='text-sm text-gray-300 text-center'>
          {currState === "Sign up" ? (
            <p>Already have an account? <span
              onClick={() => { setCurrState("Login"); setIsDataSubmitted(false); }}
              className='font-medium text-purple-300 cursor-pointer'>Login Here</span></p>
          ) : (
            <p>Don't have an account? <span
              onClick={() => { setCurrState("Sign up"); setIsDataSubmitted(false); }}
              className='font-medium text-purple-300 cursor-pointer'>Create Here</span></p>
          )}
        </div>
      </form>
    </div>
  );
}

export default LoginPage;
