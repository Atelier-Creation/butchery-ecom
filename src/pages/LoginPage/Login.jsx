import React from 'react'
import NewNavbar from '../MobileDesign/NewNavbar'
import Footer from '../../components/Footer/Footer'
import MobileFooter from '../MobileDesign/MobileFooter'
import { useNavigate } from 'react-router-dom'
function Login() {
    const navigate = useNavigate();
  return (
    <div>
        <NewNavbar/>
    <div className='flex flex-col lg:flex-col items-center justify-center gap-3 my-10 w-120 mx-auto'>
      <h1 className='text-3xl font-bold mb-4'>Login</h1>
      <input type='text' required placeholder='Email' className=' py-3 w-full pl-2 border border-gray-200 focus:border-gray-200 rounded-md'/>
      <input type='text' required placeholder='Password' className='py-3 w-full  pl-2 border border-gray-200 focus:border-gray-200 rounded-md mt-3'/>
        <div className='text-start text-[#EE1c25] w-full'>
      <a href='/forgot-password' className='border-b text-start '>Forgot your password?</a>
      </div>
      <div>
        <button onClick={()=>navigate("/profile")} className='py-3 px-7 bg-[#EE1c25] text-white rounded-md mt-3 cursor-pointer'>Sign in</button>
      </div>
      <div className='text-center text-[#EE1c25]'>
      <a href='/create-account' className='border-b text-center cursor-pointer'>Create account</a>
      </div>
    </div>
    <MobileFooter/>
    </div>
  )
}

export default Login
