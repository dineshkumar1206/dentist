import React from 'react'
import Hero from './Hero'
import Welcome from './Welcome'
import DentalSpecialities from './Dentalspecialities'
import Whychooseus from './Whychooseus'
import Counter from './Counter'

function Home() {
  return (
    <div>
        <Hero/>
        <Welcome/>
        <DentalSpecialities/>
        <Counter/>
        <Whychooseus/>
        
    </div>
  )
}

export default Home