import React, { createContext, useContext, useState } from "react";
import { FaBicycle, FaTimes } from "react-icons/fa";

// Create context
const ModalContext = createContext();

// Provider to wrap the app
export const ModalProvider = ({ children }) => {
  const [modalContent, setModalContent] = useState(null); // content to render
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
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm">
          <div className="bg-white p-6 rounded-xl w-11/12 max-w-md shadow-lg relative">
            {modalContent}
            <div className="flex justify-end mt-4 absolute top-2 right-2">
              <button onClick={closeModal} className="px-4 py-2 rounded-md">
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
export const PincodeModal = ({ onCheck }) => {
  const [pincode, setPincode] = useState("");
  const [availability, setAvailability] = useState(null);
  const [loading, setLoading] = useState(false);
  const handleCheck = async () => {
    if (!pincode) {
      setAvailability("Please enter a pincode ❌");
      return;
    }

    setLoading(true);
    try {
      const res = await fetch(
        `https://api.postalpincode.in/pincode/${pincode}`
      );
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

  return (
    <div>
      <h2 className="text-xl font-semibold mb-4">Check Pincode Availability</h2>

      <div className="bg-[#EE1c25] flex flex-col items-center rounded-md justify-center text-center py-10 text-white w-1/2 mx-auto">
        <FaBicycle size={20} />
        <p className="text-white font-bold text-base">Delivery</p>
      </div>
      <p className="my-2 text-sm">Check delivery availability in your area</p>
      <div className="flex gap-2 items-center justify-between">
        <input
          type="text"
          value={pincode}
          onChange={(e) => setPincode(e.target.value)}
          placeholder="Enter Pincode"
          className="border border-gray-400 rounded-md w-full px-3 py-2 focus:border-gray-400"
        />
        <div className="flex justify-end gap-3">
          <button
            onClick={handleCheck}
            className="px-4 py-2 rounded-md bg-red-600 text-white"
          >
            {loading ? "Checking..." : "Check"}
          </button>
        </div>
      </div>
      {availability && (
        <p
          className={`text-sm mt-1 ${
            availability.includes("❌") ? "text-red-600" : "text-green-600"
          }`}
        >
          {availability}
        </p>
      )}

      <button
        onClick={handleCheck}
        className="px-4 py-2 rounded-md bg-red-600 text-white mt-4 w-full"
      >
        Check Out
      </button>
    </div>
  );
};
