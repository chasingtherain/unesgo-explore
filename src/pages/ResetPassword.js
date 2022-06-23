import React from 'react'

function ResetPassword() {
  return (
    <div className='flex flex-col items-center h-screen'>
        <p className='text-2xl my-8'>Password Reset</p>
        <div className="form-control">
            <label className="label">
                <span className="label-text">Enter your email address</span>
            </label>
            <div className="input-group">
                <input type="text" placeholder="admin@mail.com" className="input input-bordered" />
                <button className="btn btn-square">SEND</button>
            </div>
        </div>
    </div>
  )
}

export default ResetPassword