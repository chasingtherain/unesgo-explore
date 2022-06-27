import React, { useState } from 'react'

function ResetPassword() {
  const [isResetClicked, setIsResetClicked] = useState(false)
  const handleResetBtnClick = () => {
    console.log("reset email sent!");
    setIsResetClicked(true)
  }

  return (
    <div className='flex flex-col items-center h-screen ml-2'>
        <p className='text-2xl my-8'>Password Reset</p>
        <div className="form-control">
            <label className="label">
                <span className="label-text">Enter your email address</span>
            </label>
            <div className="input-group">
                <input type="text" placeholder="admin@mail.com" className="input input-bordered"/>
                <button className="btn btn-square" onClick={handleResetBtnClick}>SEND</button>
            </div>
            {
            (isResetClicked) ? 
              (<div className='mt-5'>
              <p>Please check your email for instructions to reset your password</p>
            </div>)
              : <></>
            }

        </div>
    </div>
  )
}

export default ResetPassword