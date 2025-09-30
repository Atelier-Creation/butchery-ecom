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
  const [showList, setShowList] = useState(false); // ✅ toggle list visibility

  const navigate = useNavigate();
  const { closeModal } = useModal();

  // ✅ Allowed service areas
  const allowedPincodes = {
    641011: "Saibaba Colony",
    641004: "Peelamedu",
    641012: "Gandhipuram",
    641002: "R.S. Puram",
    641035: "Saravanampatti",
    641018: "Race Course",
    641005: "Singanallur",
    641014: "Coimbatore Civil Aerodrome",
    641015: "Uppilipalayam",
    641016: "Ondipudur",
  };

  const handleCheck = () => {
    if (!pincode) {
      setAvailability("Please enter a pincode ❌");
      return;
    }

    setLoading(true);
    setTimeout(() => {
      if (allowedPincodes[pincode]) {
        setAvailability(`Delivery available in ${allowedPincodes[pincode]} ✅`);
      } else {
        setAvailability("Sorry, delivery not available ❌");
      }
      setLoading(false);
    }, 800);
  };

  const handleCheckOut = () => {
    if (allowedPincodes[pincode]) {
      closeModal();
      navigate("/checkout");
    } else {
      setAvailability("Sorry, delivery not available ❌");
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

      {/* ✅ Input + Check Button */}
      <div className="flex gap-2 items-center w-full max-w-sm mb-2">
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

      {/* ✅ View available pincodes link */}
      <button
        onClick={() => setShowList((prev) => !prev)}
        className="text-red-600 text-sm underline mb-4 hover:text-red-800 cursor-pointer"
      >
        {showList ? "Hide Available Pincodes" : "View Available Pincodes"}
      </button>

      {/* ✅ List of pincodes */}
      {showList && (
        <div className="w-full max-w-sm mb-4 border border-gray-400 rounded-md shadow-sm bg-gray-50 max-h-48 overflow-y-auto">
          <table className="w-full text-sm text-left border-gray-300">
            <thead className="bg-gray-100 sticky top-0">
              <tr>
                <th className="px-3 py-2 font-semibold text-gray-700">
                  Pincode
                </th>
                <th className="px-3 py-2 font-semibold text-gray-700">
                  Area / City
                </th>
              </tr>
            </thead>
            <tbody>
              {Object.entries(allowedPincodes).map(([code, area]) => (
                <tr
                  key={code}
                  className="border-t border-gray-400 cursor-pointer hover:bg-gray-200"
                  onClick={() => {
                    setPincode(code); // ✅ Fill input
                    setShowList(false); // ✅ Hide table
                    handleCheck()
                  }}
                >
                  <td className="px-3 py-1 text-gray-700">{code}</td>
                  <td className="px-3 py-1 text-gray-700">{area}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* ✅ Availability message */}
      {availability && (
        <p
          className={`text-sm mb-4 ${
            availability.includes("❌") ? "text-red-600" : "text-green-600"
          }`}
        >
          {availability}
        </p>
      )}

      {/* ✅ Checkout */}
      <button
        onClick={handleCheckOut}
        className="px-6 py-3 rounded-md bg-red-600 text-white w-full max-w-sm cursor-pointer hover:bg-red-700 transition"
      >
        Check Out
      </button>
    </div>
  );
};
