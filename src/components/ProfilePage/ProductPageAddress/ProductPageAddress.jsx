import React,{useState,useEffect} from 'react'
import './ProductPageAddress.css'
function ProductPageAddress() {
  const [addresses, setAddresses] = useState([]);
  const [editAddressId, setEditAddressId] = useState(null);
  const [addressForm, setAddressForm] = useState({});
  const [message, setMessage] = useState("");
  const [isAddingNew, setIsAddingNew] = useState(false);
    useEffect(() => {
      const storedUser = localStorage.getItem("user");
      if (!storedUser) return;
  
      const parsedUser = JSON.parse(storedUser);
      const userId = parsedUser.id || parsedUser._id;
  
      const loadAddresses = async () => {
        try {
          const addressData = await getAddressByUserId(userId);
          const allAddresses = addressData.addresses || [];
    
          // Sort by createdAt (latest first) and take only 2
          const latestTwo = [...allAddresses]
            .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
            .slice(0, 2);
    
          setAddresses(latestTwo);
        } catch (err) {
          console.error("Failed to fetch addresses:", err);
        }
      };
  
      loadAddresses();
    }, []);

    const handleEditClick = (addr) => {
      setEditAddressId(addr._id);
      setIsAddingNew(false);
      setAddressForm({ ...addr }); // pre-fill
      setMessage("");
    };
    const handleAddNew = () => {
      setIsAddingNew(true);
      setEditAddressId(null);
      setAddressForm({
        street: "",
        city: "",
        district: "",
        pincode: "",
        state: "",
        phone:""
      });
      setMessage("");
    };
    const handleChange = (e) => {
      const { name, value } = e.target;
      setAddressForm((prev) => ({ ...prev, [name]: value }));
    };
  
    const handleSave = async () => {
      try {
        if (isAddingNew) {
          const storedUser = JSON.parse(localStorage.getItem("authUser"));
          const userId = storedUser.id || storedUser._id;
  
          const created = await createAddress({ ...addressForm, userId });
          setAddresses((prev) => [...prev, created.address || created]);
          setMessage("✅ Address created successfully!");
        } else {
          const updated = await updateAddressById(editAddressId, addressForm);
          setAddresses((prev) =>
            prev.map((a) =>
              a._id === editAddressId ? (updated.address || updated) : a
            )
          );
          setMessage("✅ Address updated successfully!");
        }
  
        setEditAddressId(null);
        setIsAddingNew(false);
        setAddressForm({});
      } catch (err) {
        console.error("Save failed:", err);
        setMessage("❌ Failed to save address.");
      }
    };
  
    const handleCancel = () => {
      setEditAddressId(null);
      setIsAddingNew(false);
      setAddressForm({});
    };


  return (
    <div className='profile-page-info-con'>
      <div className="saved-address-heading">
      <h2>Saved Addresses</h2>
      <button className='new-address-add-btn'  onClick={handleAddNew}>
        + ADD NEW ADDRESS
      </button>
      </div>
      {isAddingNew && (
          <form className="user-address-container-edit"
          onSubmit={(e) => {
            e.preventDefault();
            handleSave();
          }}>
            <input
            required
              type="text"
              name="street"
              value={addressForm.street || ""}
              onChange={handleChange}
              placeholder="Street"
            />
            <input
            required
              type="text"
              name="city"
              value={addressForm.city || ""}
              onChange={handleChange}
              placeholder="City"
            />
            <input
            required
              type="text"
              name="district"
              value={addressForm.district || ""}
              onChange={handleChange}
              placeholder="District"
            />
            <input
            required
              type="text"
              name="pincode"
              value={addressForm.pincode || ""}
              onChange={handleChange}
              placeholder="Pincode"
            />
            <input
            required
              type="text"
              name="state"
              value={addressForm.state || ""}
              onChange={handleChange}
              placeholder="State"
            />
                              <input
                    type="text"
                    name="phone"
                    value={addressForm.phone || ""}
                    onChange={handleChange}
                    placeholder="phone"
                    required
                  />

            <div className="address-edit-btns">
              <button onClick={handleSave} className="address-save-btn">
                Save
              </button>
              <button onClick={handleCancel} className="address-cancel-btn">
                Cancel
              </button>
            </div>
          </form>
        )}
    <div className="user-address-con">
    {addresses.length > 0 ? (
          addresses.map((addr) => (
      <div className="user-address-container-div">
        <div className="user-address-container-head">
          <h6>{addr.type || "Address"}</h6>
                <i
                  className="bi bi-pencil-square"
                  onClick={() => handleEditClick(addr)}
                ></i>
        </div>
        {editAddressId === addr._id ? (
                <form className="user-address-container-edit"
                onSubmit={(e) => {
                  e.preventDefault();
                  handleSave();
                }}>
                  <input
                    type="text"
                    name="street"
                    value={addressForm.street || ""}
                    onChange={handleChange}
                    placeholder="Street"
                    required
                  />
                  <input
                    type="text"
                    name="city"
                    value={addressForm.city || ""}
                    onChange={handleChange}
                    placeholder="City"
                    required
                  />
                  <input
                    type="text"
                    name="district"
                    value={addressForm.district || ""}
                    onChange={handleChange}
                    placeholder="District"
                    required
                  />
                  <input
                    type="text"
                    name="pincode"
                    value={addressForm.pincode || ""}
                    onChange={handleChange}
                    placeholder="Pincode"
                    required
                  />
                  <input
                    type="text"
                    name="state"
                    value={addressForm.state || ""}
                    onChange={handleChange}
                    placeholder="State"
                    required
                  />

                  <div className="address-edit-btns">
                    <button onClick={handleSave} className="address-save-btn">
                      Save
                    </button>
                    <button onClick={handleCancel} className="address-cancel-btn">
                      Cancel
                    </button>
                  </div>
                </form>
              ) : (
                <div className="user-address-container-value">
                  <h5>{addr.name || "Name"}</h5>
                  <p>
                    {addr.doorNo || ""}, {addr.street}, {addr.city},{" "}
                    {addr.district} - {addr.pincode}, {addr.state}
                  </p>
                </div>
              )}
            </div>
          ))
        ) : (
          <p>You have no other address entries in your address book.</p>
        )}
    </div>

      {/* <div className='profile-page-info-input'>
        <input
          type='text'
          placeholder='Door No'
          name='doorNo'
          value={formData.firstName}
          onChange={handleInputChange}
          disabled={!editMode}
        />
        <input
          type='text'
          placeholder='Street'
          name='street'
          value={formData.lastName}
          onChange={handleInputChange}
          disabled={!editMode}
        />
      </div>

      <div className='profile-page-info-input'>
        <input
          type='text'
          placeholder='city'
          name='city'
          value={formData.email}
          onChange={handleInputChange}
          disabled={!editMode}
        />
      </div>

      <div className='profile-page-info-input'>
        <input
          type='text'
          placeholder='District'
          name='district'
          value={formData.mobile}
          onChange={handleInputChange}
          disabled={!editMode}
        />
      </div>
      <div className='profile-page-info-input'>
        <input
          type='text'
          placeholder='State'
          name='state'
          value={formData.mobile}
          onChange={handleInputChange}
          disabled={!editMode}
        />
      </div>
      <div className='profile-page-info-input'>
        <input
          type='text'
          placeholder='Pincode'
          name='pincode'
          value={formData.mobile}
          onChange={handleInputChange}
          disabled={!editMode}
        />
      </div>

      <div className='profile-info-btn-div'>
        {!editMode ? (
          <button onClick={handleEdit} className='profile-info-btn-edit'>Edit</button>
        ) : (
          <div className='profile-info-btns-div'>
            <button onClick={handleSave} className='profile-info-btn-save'>Save</button>
            <button onClick={handleCancel} className='profile-info-btn-cancel'>Cancel</button>
          </div>
        )}
      </div> */}
    </div>
  )
}

export default ProductPageAddress
