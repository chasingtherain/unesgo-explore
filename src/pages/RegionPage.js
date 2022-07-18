import React from 'react'
import CountryCard from '../components/layout/CountryCard'


function RegionPage() {
    const seaCountries = ["Cambodia", "Indonesia", "Laos", "Malaysia", "Myanmar", "Philippines", "Singapore", "Thailand", "Vietnam"]
    return (
    <div>
        <div className="mt-5 flex flex-col justify-content items-center">
            {seaCountries.map((country, index) => <CountryCard key={index} name={country} />)}
        </div>
    </div>
    )
}

export default RegionPage