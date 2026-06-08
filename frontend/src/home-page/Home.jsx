import React from 'react'
import Hero from './Hero'
import Welcome from './Welcome'
import DentalSpecialities from './Dentalspecialities'
import WhyChooseUs from './WhyChooseUs'
import Counter from './Counter'

function Home() {
  return (
    <div>
        <Hero/>
        <Welcome/>
        <DentalSpecialities/>
        <Counter/>
        <WhyChooseUs/>
        
    </div>
  )
}

export default Home