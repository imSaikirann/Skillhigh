import React from 'react'
import Course_Banner from '../components/Course_Banner'
import ContactUs from '../components/ContactUs'
import Course_pricing from '../components/Course_pricing'
import Certificates from '../components/Certificates'

export default function Course() {
  return (
   <>
   <Course_Banner/>
   <Course_pricing/>
   <Certificates/>
   <ContactUs/>
   </>
  )
}
