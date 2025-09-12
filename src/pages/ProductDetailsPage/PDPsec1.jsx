import React,{useState} from 'react'
import { FaBook, FaChevronDown, FaMinus, FaChevronUp, FaNotesMedical, FaPlus } from 'react-icons/fa';

function PDPsec1() {
    const [selected, setSelected] = useState("0.500 Grms");
    const [quantity, setQuantity] = useState(1);
    const [open, setOpen] = useState(false);
    const increase = () => setQuantity(quantity + 1);
    const decrease = () => {
        if (quantity > 1) setQuantity(quantity - 1);
      };

    const options = ["0.500 Grms", "0.750 Grms", "1 KG"];
  return (
    <div className='flex flex-col lg:flex-row justify-evenly gap-3 p-10 '>
        <div className='relative w-3/4 px-10 flex flex-col gap-8 min-h-screen'>
            <img src='https://lenaturelmeat.com/cdn/shop/files/NT4.png?v=1719991493&width=533' className='w-full h-120 aspect-square object-cover rounded-3xl'/>
            <div className='flex flex-row lg:flex-row lg:gap-5'>
                <img src='https://lenaturelmeat.com/cdn/shop/files/Lalipop1.webp?v=1756895386&width=360' className='w-32 h-32 aspect-square object-cover rounded-3xl border-2'/>
                <img src='https://lenaturelmeat.com/cdn/shop/files/top-view-delicious-salmon-table.jpg?v=1753342530' className='w-32 h-32 aspect-square object-cover rounded-3xl border-2'/>
                <img src='https://lenaturelmeat.com/cdn/shop/files/Goat_Keema_3.jpg?v=1746256020' className='w-32 h-32 aspect-square object-cover rounded-3xl border-2'/>
            </div>
        </div>
        <div className='w-1/2'>
      <div className='sticky top-10 flex flex-col gap-3'>
        <p className='text-xs'>LE NATUREL MEAT</p>
        <h1 className='text-4xl font-bold'>Goat - Mutton Keema</h1>
        <div className='flex flex-row gap-2 items-center'>
            <p className='text-lg font-semibold'>Rs. 275.00</p>
            <p className='text-gray-500 line-through'>Rs. 1,350.00</p>
            <button className='bg-[#EE1c25] text-white text-base px-5 py-0.5 rounded-md'>sale</button>
        </div>
        <div>
            <p className='text-base'>Size</p>
            <div className='flex lg:flex-row lg:gap-3 lg:my-3'>
            {options.map((option) => (
        <button
          key={option}
          onClick={() => setSelected(option)}
          className={`px-5 py-2 rounded-md text-base border transition duration-300 
            ${
              selected === option
                ? "bg-[#EE1c25] text-white border-[#EE1c25]"
                : "bg-transparent text-black border-gray-400"
            }`}
        >
          {option}
        </button>
      ))}
            </div>
        </div>
        <div>
            <p className='text-base'>Quantity</p>
            <div className="flex items-center border border-gray-400 py-2 px-2 w-fit rounded-md lg:my-3">
      {/* Decrease button */}
      <button
        onClick={decrease}
        className="px-3 py-1 cursor-pointer"
      >
        <FaMinus size={15}/>
      </button>

      {/* Quantity input */}
      <input
        type="text"
        value={quantity}
        readOnly
        className="w-12 text-center focus:outline-0"
      />

      {/* Increase button */}
      <button
        onClick={increase}
        className="px-3 py-1 cursor-pointer"
      >
        <FaPlus size={15}/>
      </button>
    </div>
        </div>

        <div className='flex flex-col gap-3 lg:pr-10'>
            <button className='border py-3 rounded-2xl border-[#EE1c25]'>
                Add to cart
            </button>
            <button className='border py-3 rounded-2xl border-[#EE1c25] bg-[#EE1c25] text-white'>
                Buy it now
            </button>
        </div>

        <div className='lg:pr-10'>
            <p className='text-base'>Order Notes</p>
            <textarea className='border border-gray-400 rounded-md w-full h-30 my-3' />
        </div>

        <div className='lg:pr-10'>
            <div onClick={() => setOpen(!open)} className='flex flex-row justify-between items-center border-t border-b border-gray-200 py-4 px-2'>
                <div className='flex flex-row gap-3 items-center'>
            <FaBook/>
            <p className='text-base font-semibold'>Description</p>
            </div>
            {open ? <FaChevronUp size={15} /> : <FaChevronDown size={15} />}
            </div>
            {open && (
        <ul className="mt-2 ml-8 list-disc text-gray-600">
          <li>Le Naturel Mutton Keema is finely minced meat that brings rich flavor and unmatched tenderness to your dishes.</li>
          <li>Raised naturally without antibiotics or hormones, this keema is sourced from goats that are nurtured with care, ensuring a premium product for your meals.</li>
          <li>Packed with protein, iron, and essential vitamins, Le Naturel Mutton Keema is perfect for a variety of dishes, from classic keema pav and mutton cutlets to hearty curries and fillings for pastries.</li>
          <li>Its versatility allows it to shine in any kitchen, whether you're making an everyday meal or preparing something special.</li>
          <li>With its ethical sourcing and fresh, natural flavor, this keema will add depth and richness to your culinary creations.</li>
        </ul>
      )}
        </div>
      </div>
      </div>
    </div>
  )
}

export default PDPsec1
