import React from 'react'
import { Link } from 'react-router-dom'



function Card() {
  const isoCode = "CN"
  return (
    <div className="card card-compact w-72 bg-base-100 shadow-xl ml-10">
        <figure><img src={`https://countryflagsapi.com/svg/${isoCode}`} alt="country flag" /></figure>
        <div className="card-body text-center items-center">
            <p className='text-4xl mb-3'>China</p>
            <div className="card-actions">
                <button className="btn btn-outline btn-info">
                  <Link to="/site">View UNESCO Sites</Link>
                </button>
            </div>
        </div>
    </div>
  )
}

export default Card