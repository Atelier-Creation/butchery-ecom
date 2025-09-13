import React,{useState} from 'react'
import NewNavbar from '../MobileDesign/NewNavbar'
import MobileFooter from '../MobileDesign/MobileFooter'
import { useNavigate } from 'react-router-dom'
function CreateAccount() {
    const navigate = useNavigate();
    const [firstName, setFirstName] = useState("")
    const [lastName, setLastName] = useState("")
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")

    const handleCreate = () => {
        if (!firstName || !lastName || !email || !password) {
          alert("All fields are required");
          return;
        }
      
        const userData = { firstName, lastName, email, password }
        localStorage.setItem("userData", JSON.stringify(userData))
        alert("Account created and saved ✅")
        navigate("/profile")
      }
      
  return (
    <div>
        <NewNavbar/>
          <div className='flex flex-col lg:flex-col items-center justify-center gap-3 my-10 w-120 mx-auto'>
      <h1 className='text-3xl font-bold mb-4'>Create account</h1>
      <input           value={firstName}
          onChange={(e) => setFirstName(e.target.value)} type='text' required placeholder='First Name' className=' py-3 w-full pl-2 border border-gray-200 focus:border-gray-200 rounded-md'/>
      <input           value={lastName}
          onChange={(e) => setLastName(e.target.value)} type='text' required placeholder='Last Name' className='py-3 w-full  pl-2 border border-gray-200 focus:border-gray-200 rounded-md mt-3'/>
      <input           value={email}
          onChange={(e) => setEmail(e.target.value)} type='text' required placeholder='Email' className=' py-3 w-full pl-2 border border-gray-200 focus:border-gray-200 rounded-md'/>
      <input           value={password}
          onChange={(e) => setPassword(e.target.value)} type='text' required placeholder='Password' className='py-3 w-full  pl-2 border border-gray-200 focus:border-gray-200 rounded-md mt-3'/>
      <div>
        <button onClick={handleCreate}  className='py-3 px-7 bg-[#EE1c25] text-white rounded-md mt-3 cursor-pointer'>Create</button>
      </div>
    </div>
    <MobileFooter/>
    </div>
  )
}

export default CreateAccount
