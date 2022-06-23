import React from 'react'
import { Link } from 'react-router-dom'



function Card() {
  const isoCode = "CN"
  return (
    // <div class="card compact card-bordered w-96 bg-base-100 shadow-xl ml-5">
    <div class="card card-compact w-72 bg-base-100 shadow-xl ml-10">
        <figure><img src={`https://countryflagsapi.com/svg/${isoCode}`} alt="country flag" /></figure>
        <div class="card-body text-center items-center">
            <p className='text-4xl mb-3'>China</p>
            <div class="card-actions">
                <button class="btn btn-outline btn-info">
                  <Link to="/site">View UNESCO Sites</Link>
                </button>
            </div>
        </div>
    </div>
  )
}

export default Card