import { sendPasswordResetEmail } from 'firebase/auth';
import React, { useState } from 'react'
import Footer from '../components/Footer';
import {auth} from "../firebase-config"

function ResetPassword() {
  const [isResetClicked, setIsResetClicked] = useState(false)
  const [emailInput, setEmailInput] = useState("")
  const [error, setError] = useState("")

  const handleResetBtnClick = async (email) => {
    sendPasswordResetEmail(auth, email)
    .then(() => {
      // Password reset email sent!
      setIsResetClicked(true)
      // hides error if user inputs valid email on second attempt
      setError("")
    })
    .catch((error) => {
      const errorCode = error.code;
      setError(errorCode)
    })
    
  }

  return (
    <div className='flex flex-col items-center h-screen ml-2'>
        <p className='text-2xl my-8'>Password Reset</p>
        <div className="form-control">
            <label className="label">
                <span className="label-text">Enter your email address</span>
            </label>
            <div className="input-group">
                <input type="text" placeholder="admin@mail.com" onChange={(e) => setEmailInput(e.target.value)} className="input input-bordered"/>
                <button className="btn btn-square" onClick={() => handleResetBtnClick(emailInput)}>SEND</button>
            </div>
            {
            (isResetClicked) ? 
              (<div className='mt-5'>
              <p>Please check your email for instructions on how to reset your password</p>
            </div>)
              : <></>
            }
            {error && <p>{error}</p>}
          <Footer/>
        </div>
    </div>
  )
}

export default ResetPassword