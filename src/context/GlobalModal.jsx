import React, { createContext, useContext, useState } from "react";
import { FaBicycle, FaTimes } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

// Create context
const ModalContext = createContext();

// Provider to wrap the app
export const ModalProvider = ({ children }) => {
  const [modalContent, setModalContent] = useState(null);
  const [isOpen, setIsOpen] = useState(false);

  const openModal = (content) => {
    setModalContent(content);
    setIsOpen(true);
  };

  const closeModal = () => {
    setModalContent(null);
    setIsOpen(false);
  };

  return (
    <ModalContext.Provider value={{ openModal, closeModal }}>
      {children}

      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm p-4">
          <div className="bg-white rounded-xl shadow-lg w-full max-w-md relative mx-auto overflow-y-auto">
            {modalContent}
            <div className="absolute top-2 right-2">
              <button
                onClick={closeModal}
                className="px-2 py-2 rounded-md bg-gray-100 hover:bg-gray-200"
              >
                <FaTimes size={20} />
              </button>
            </div>
          </div>
        </div>
      )}
    </ModalContext.Provider>
  );
};


// Custom hook to use modal
export const useModal = () => useContext(ModalContext);

/* ----------------- PincodeModal component ----------------- */
export const PincodeModal = () => {
  const [pincode, setPincode] = useState("");
  const [availability, setAvailability] = useState(null);
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();
  const { closeModal } = useModal();

  const handleCheck = async () => {
    if (!pincode) {
      setAvailability("Please enter a pincode ❌");
      return;
    }

    setLoading(true);
    try {
      const res = await fetch(`https://api.postalpincode.in/pincode/${pincode}`);
      const data = await res.json();

      if (data[0].Status === "Success" && data[0].PostOffice.length > 0) {
        const placeName = data[0].PostOffice[0].Name;
        setAvailability(`Delivery available in ${placeName} ✅`);
      } else {
        setAvailability("Sorry, delivery not available ❌");
      }
    } catch (error) {
      console.error(error);
      setAvailability("Error checking delivery. Try again later ❌");
    } finally {
      setLoading(false);
    }
  };

  const handleCheckOut = () => {
    // Only proceed if delivery is available (green text)
    if (availability && availability.includes("✅")) {
      // closeModal();           // Close the modal
      navigate("/checkout");  // Redirect to checkout
    } else {
      alert("Please check delivery availability first ✅");
    }
  };

  return (
     <div className="flex flex-col items-center justify-center text-center w-full p-4">
      <h2 className="text-xl font-semibold mb-6">Check Pincode Availability</h2>

      <div className="bg-red-600 flex flex-col items-center justify-center text-center py-10 text-white w-1/2 mx-auto rounded-md mb-6">
        <FaBicycle size={24} />
        <p className="text-white font-bold text-base mt-2">Delivery</p>
      </div>

      <p className="mb-4 text-sm">Check delivery availability in your area</p>

      <div className="flex gap-2 items-center w-full max-w-sm mb-3">
        <input
          type="text"
          value={pincode}
          onChange={(e) => setPincode(e.target.value)}
          placeholder="Enter Pincode"
          className="border border-gray-400 rounded-md w-full px-3 py-2 focus:outline-none focus:ring-2 focus:ring-red-600"
        />
        <button
          onClick={handleCheck}
          className="px-4 py-2 rounded-md bg-red-600 text-white"
        >
          {loading ? "Checking..." : "Check"}
        </button>
      </div>

      {availability && (
        <p
          className={`text-sm mb-4 ${
            availability.includes("❌") ? "text-red-600" : "text-green-600"
          }`}
        >
          {availability}
        </p>
      )}

      <button
        onClick={handleCheckOut}
        className="px-6 py-3 rounded-md bg-red-600 text-white w-full max-w-sm"
      >
        Check Out
      </button>
    </div>
  );
};
