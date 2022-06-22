import React from 'react'
import Card from '../components/layout/Card'
import Select from '../components/layout/Select'

function LandingPage() {
  return (
    <div>
      <Select/>
      <div class="lg:grid-cols-4 md:grid-cols-2 sm: grid-cols-1 h-min grid grid-cols-4 gap-4...">
        <Card/>
        <Card/>
        <Card/>
        <Card/>
      </div>
    </div>
  )
}

export default LandingPage