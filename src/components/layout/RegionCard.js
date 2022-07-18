import { Link } from 'react-router-dom'



function RegionCard({name}) {
    // remove spacing and add "-" to region name 
    let regionPathName = name.toLowerCase().replace(" ", "-")

    return (
    <div className="card card-compact w-72 bg-base-100 shadow-xl border-2 my-3">
        <div className="card-body text-center items-center">
            <p className='text-4xl mb-3'>{name}</p>
            <div className="card-actions">
                <button className="btn btn-primary">
                    <Link to={`/${regionPathName}`} >View UNESCO Sites</Link>
                </button>
            </div>
        </div>
    </div>
    )
}

export default RegionCard