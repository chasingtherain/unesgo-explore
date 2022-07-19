import React from 'react'
import { Link } from 'react-router-dom'



function CountryCard({name}) {
  // const isoCode = "CN"
  return (
    <div className="card card-compact w-72 bg-base-100 shadow-xl border-2 my-3">
        {/* <figure><img src={`https://countryflagsapi.com/svg/${isoCode}`} alt="country flag" /></figure> */}
        <div className="card-body text-center items-center">
            <p className='text-3xl mb-2'>{name}</p>
            <div className="card-actions">
                <button className="btn btn-primary">
                  <Link to="/site">View UNESCO Sites</Link>
                </button>
            </div>
            {
            // for time being, show province list only for CN
            (name === "China") ? 
              (<div className="card-actions">
                  <button className="btn btn-secondary">
                    <Link to="/province-list">View Province List</Link>
                  </button>
              </div>)
              : <></>
            }
        </div>
    </div>
  )
}

export default CountryCard