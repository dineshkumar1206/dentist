import React from 'react'
import Hero from './Hero'
import Welcome from './Welcome'
import DentalSpecialities from './Dentalspecialities'
import Whychooseus from './Whychooseus'
import Counter from './Counter'
import MainHero from './MainHero'

function Home() {
  return (
    <div>
        <MainHero/>
        <Hero/>
        <Welcome/>
        <DentalSpecialities/>
        <Counter/>
        <Whychooseus/>
        
    </div>
  )
}

export default Home