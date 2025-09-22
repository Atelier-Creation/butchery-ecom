import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import NewNavbar from '../MobileDesign/NewNavbar';
import MobileNavbar from '../MobileDesign/MobileNavbar';
import IconMenu from '../MobileDesign/MobileIconMenu';
import MobileFooter from '../MobileDesign/MobileFooter';
import Navbar from '../MobileDesign/Navbar';
import { registerUser } from '../../api/authApi'; // import your API function

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

function CreateAccount() {
  const navigate = useNavigate();
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isMobile, setIsMobile] = useState(false);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth <= 768);
    handleResize(); 
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const handleCreate = async () => {
    if (!firstName || !lastName || !email || !password) {
      alert("All fields are required");
      return;
    }

    const userData = {
      name: `${firstName} ${lastName}`,
      email,
      password
    };

    try {
      setLoading(true);
      const response = await registerUser(userData);
      console.log("Registration success:", response);
      alert("Account created successfully ✅");
      navigate("/login");
    } catch (error) {
      console.error("Registration error:", error);
      alert(error.response?.data?.message || "Registration failed!");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      {isMobile ? <MobileNavbar /> : <Navbar />}
      {isMobile && <IconMenu items={menuItems} />}
      <div className='flex flex-col lg:flex-col items-center justify-center gap-3 my-10 lg:w-120 md:w-110 w-full lg:mx-auto md:mx-auto px-5'>
        <h1 className='text-3xl font-bold mb-4'>Create account</h1>
        <input
          value={firstName}
          onChange={(e) => setFirstName(e.target.value)}
          type='text'
          required
          placeholder='First Name'
          className='py-3 w-full pl-2 border border-gray-200 focus:border-gray-200 rounded-md'
        />
        <input
          value={lastName}
          onChange={(e) => setLastName(e.target.value)}
          type='text'
          required
          placeholder='Last Name'
          className='py-3 w-full pl-2 border border-gray-200 focus:border-gray-200 rounded-md mt-3'
        />
        <input
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          type='text'
          required
          placeholder='Email'
          className='py-3 w-full pl-2 border border-gray-200 focus:border-gray-200 rounded-md'
        />
        <input
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          type='password'
          required
          placeholder='Password'
          className='py-3 w-full pl-2 border border-gray-200 focus:border-gray-200 rounded-md mt-3'
        />
        <div>
          <button
            onClick={handleCreate}
            disabled={loading}
            className='py-3 px-7 bg-[#EE1c25] text-white rounded-md mt-3 cursor-pointer'
          >
            {loading ? "Creating..." : "Create"}
          </button>
        </div>
      </div>
      <MobileFooter />
    </div>
  );
}

export default CreateAccount;
