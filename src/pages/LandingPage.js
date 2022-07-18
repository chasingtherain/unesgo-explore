import React from 'react'
import CountryCard from '../components/layout/CountryCard'
import RegionCard from '../components/layout/RegionCard'


function LandingPage() {
  return (
    <div>
      <div className="mt-5 flex flex-col justify-content items-center">
        <CountryCard name="China"/>
        <RegionCard name="Southeast Asia" />
      </div>
    </div>
  )
}

export default LandingPage