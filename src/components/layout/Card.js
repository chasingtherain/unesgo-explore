import React from 'react'
import { Link } from 'react-router-dom'

function Card() {
  const isoCode = "CN"
  return (
    <div class="card w-84 bg-base-100 shadow-xl mx-10 mb-10">
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