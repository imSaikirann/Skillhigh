import React from 'react'
import Hero from '../components/Hero'
import ContactUs from '../components/ContactUs'
import FQA from '../components/FQA'
import Hero2 from '../components/Hero2'
import Choose from '../components/Choose'
import Needhelp from '../components/Needhelp'


function Home() {
  return (
    <>
    <Hero/>
    <Hero2/>
    <Choose/>
    {/* <VerticalCarousel/> */}
    <Needhelp/>
    <FQA/>
    <ContactUs/>

    </>
  )
}

export default Home