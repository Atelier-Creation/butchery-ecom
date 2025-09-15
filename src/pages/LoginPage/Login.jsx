import React,{useState,useEffect} from 'react'
import Footer from '../../components/Footer/Footer'
import MobileFooter from '../MobileDesign/MobileFooter'
import { useNavigate } from 'react-router-dom'
import NewNavbar from '../MobileDesign/NewNavbar'
import MobileNavbar from '../MobileDesign/MobileNavbar'
import IconMenu from '../MobileDesign/MobileIconMenu'
import Navbar from '../MobileDesign/Navbar'

const menuItems = [
  {
    label: "Chicken",
    link: "/collections/chicken",
    icon: "//lenaturelmeat.com/cdn/shop/files/turkey-chicken-svgrepo-com_32x32.svg?v=1752237020",
  },
  {
    label: "Mutton",
    link: "/collections/mutton",
    icon: "//lenaturelmeat.com/cdn/shop/files/meat-cut-svgrepo-com_1_32x32.svg?v=1752237274",
  },
  {
    label: "Egg",
    link: "/collections/eggs",
    icon: "//lenaturelmeat.com/cdn/shop/files/eggs-in-basket-svgrepo-com_32x32.svg?v=1752237467",
  },
  {
    label: "Fish",
    link: "/collections/fish",
    icon: "//lenaturelmeat.com/cdn/shop/files/fish-svgrepo-com_32x32.svg?v=1753957578",
  },
];
function Login() {
    const navigate = useNavigate();
    const [isMobile, setIsMobile] = useState(false);
  
    useEffect(() => {
      const handleResize = () => setIsMobile(window.innerWidth <= 768);
      handleResize(); // run once on mount
      window.addEventListener("resize", handleResize);
      return () => window.removeEventListener("resize", handleResize);
    }, []);
  return (
    <div>
      {isMobile ? <MobileNavbar /> : <Navbar/>}
      {isMobile ?<IconMenu items={menuItems} />: ""}
    <div className='flex flex-col lg:flex-col items-center justify-center gap-3 my-10 lg:w-120 md:w-110 w-full lg:mx-auto md:mx-auto px-5'>
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
