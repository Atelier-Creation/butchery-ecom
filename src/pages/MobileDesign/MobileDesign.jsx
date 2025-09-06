import React from 'react'
import MobileNavbar from './MobileNavbar'
import MobileBanner from './MobileBanner'
import MobileCategorySlider from './MobileCategorySlider'
import MobileBestseller from './MobileBestseller'

const MobileDesign = () => {
  return (
    <div className='bg-[#ffeee8] min-h-screen'>
    <MobileNavbar/>
    <MobileBanner/>
    <MobileCategorySlider/>
    <MobileBestseller/> 
    </div>
  )
}

export default MobileDesign