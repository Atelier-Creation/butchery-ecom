import React from 'react'
import NewNavbar from '../MobileDesign/NewNavbar'
import MobileFooter from '../MobileDesign/MobileFooter'
import { useNavigate } from 'react-router-dom'
function ResetPassword() {
    const navigate = useNavigate()
  return (
    <div>
        <NewNavbar/>
          <div className='flex flex-col lg:flex-col items-center justify-center gap-3 my-10 w-120 mx-auto'>
      <h1 className='text-3xl font-bold mb-2'>Reset your password</h1>
      <p className='text-base mb-4'>We will send you an email to reset your password</p>
      <input type='text' required placeholder='Email' className=' py-3 w-full pl-2 border border-gray-200 focus:border-gray-200 rounded-md'/>
      <div>
        <button onClick={()=>navigate('/profile')} className='py-3 px-7 bg-[#EE1c25] text-white rounded-md mt-3'>Submit</button>
      </div>
      <div className='text-center text-[#EE1c25] '>
      <a href='/' className='border-b text-center'>Cancel</a>
      </div>
    </div>
    <MobileFooter/>
    </div>
  )
}

export default ResetPassword
