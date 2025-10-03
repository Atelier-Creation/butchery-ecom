import React, { useEffect, useState } from "react";
import "./ProfilePageInfo.css";
import { Mail, SquarePen } from 'lucide-react';
import { useNavigate } from "react-router-dom";
import { S3Client } from "@aws-sdk/client-s3";
import { Upload } from "@aws-sdk/lib-storage";
import profileImage from '../../../assets/images/user-icon-trendy-flat-style-600nw-1697898655-removebg-preview.png'
// ------------------- DigitalOcean Spaces Config -------------------
const s3 = new S3Client({
  endpoint: "https://blr1.digitaloceanspaces.com",
  region: "us-east-1",
  credentials: {
    accessKeyId: import.meta.env.VITE_DO_SPACES_KEY,
    secretAccessKey: import.meta.env.VITE_DO_SPACES_SECRET,
  },
});

async function uploadToSpaces(file) {
  if (!file) return null;

  const bucketName = "knobsshopcdn";
  const fileKey = `uploads/${Date.now()}-${file.name}`;

  try {
    const parallelUploads3 = new Upload({
      client: s3,
      params: {
        Bucket: bucketName,
        Key: fileKey,
        Body: file,
        ACL: "public-read",
        ContentType: file.type,
      },
    });

    parallelUploads3.on("httpUploadProgress", (progress) => {
      console.log("Upload progress:", progress);
    });

    await parallelUploads3.done();

    const publicUrl = `https://${bucketName}.blr1.digitaloceanspaces.com/${fileKey}`;
    return publicUrl;
  } catch (err) {
    console.error("Error uploading to Spaces:", err);
    throw err;
  }
}

function ProfilePageInfo() {
  const navigate = useNavigate();
  const [localUser, setLocalUser] = useState(null);
  const [user, setUser] = useState(null);
  const [addresses, setAddresses] = useState([]);
  const [editMode, setEditMode] = useState(false);
  const [addressEditId, setAddressEditId] = useState(null);
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    email: "",
  });
  const [addressForm, setAddressForm] = useState({});
  const [errorMessage, setErrorMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const [selectedFile, setSelectedFile] = useState(null);
  const [previewUrl, setPreviewUrl] = useState(
    user?.profileImage
  );

  useEffect(() => {
    const stored = localStorage.getItem("user");
    if (stored) {
      setLocalUser(JSON.parse(stored));
      console.log("user data : " ,stored)
    }
  }, []);

  useEffect(() => {
  const storedUser = localStorage.getItem("user"); // ✅ match login.jsx
  if (!storedUser) return;

  const parsedUser = JSON.parse(storedUser);
  const id = parsedUser.id || parsedUser._id;

  const loadUser = async () => {
    try {
      const data = await getUserById(id);
      setUser(data.user);
      setFormData({
        name: data.user.name || "",
        phone: data.user.phone || "",
        email: data.user.email || "",
      });
      const addressData = await getAddressByUserId(id);
      setAddresses(addressData.addresses?.slice(0, 2) || []);
    } catch (err) {
      setErrorMessage("Failed to load profile.");
    }
  };

  loadUser();
}, []);


  const handleEditClick = () => {
    setEditMode(true);
    setErrorMessage("");
    setSuccessMessage("");
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSave = async () => {
    try {
      let updatedData = { ...formData };

      // ✅ If user selected a new file, upload it
      if (selectedFile) {
        const imageUrl = await uploadToSpaces(selectedFile);
        updatedData.profileUrl = imageUrl; // must match backend field
      }
      const updated = await updateUser(user._id, updatedData);
      localStorage.setItem("authUser", JSON.stringify(updated.user));
      console.log("Updated user data:", updated);
      setUser(updated.user);
      setEditMode(false);
      setErrorMessage("");
      setSuccessMessage("Profile updated successfully!");
    } catch (err) {
      console.error("Update failed:", err);

      let message = "Something went wrong. Please try again.";

      // ✅ Case 1: Backend gave a direct error message
      if (err?.error && err.error !== "Server error") {
        message = err.error;
      }

      // ✅ Case 2: Duplicate key error from Mongo
      else if (err?.err?.code === 11000) {
        const field = Object.keys(err.err.keyPattern || {})[0];
        const value = err.err.keyValue?.[field];
        message = `The ${field} "${value}" is already in use. Please use a different one.`;
      }

      // ✅ Case 3: Generic server error
      else if (err?.error === "Server error") {
        message = "Server error. Please try again later.";
      }

      setSuccessMessage("");
      setErrorMessage(message);
    }
  };

  const handleCancel = () => {
    setFormData({ name: user.name, phone: user.phone, email: user.email });
    setEditMode(false);
    setErrorMessage("");
    setSuccessMessage("");
  };

  const handleAddressEdit = (addr) => {
    setAddressEditId(addr._id);
    setAddressForm({ ...addr }); // pre-fill form
  };

  const handleAddressChange = (e) => {
    const { name, value } = e.target;
    setAddressForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleAddressSave = async () => {
    try {
      const updated = await updateAddressById(addressEditId, addressForm);
      console.log("Updated Address Response:", updated);

      setAddresses((prev) =>
        prev.map((a) =>
          a._id === addressEditId ? updated.address || updated : a
        )
      );

      setAddressEditId(null);
      setSuccessMessage("Address updated successfully!");
    } catch (err) {
      console.error("Address update failed:", err);
      setErrorMessage("Failed to update address. Try again.");
    }
  };

  const handleAddressCancel = () => {
    setAddressEditId(null);
  };
  useEffect(() => {
    console.log("address :", addresses);
  }, [addresses]);
  const handleProfileImageChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    setSelectedFile(file);

    // Show preview immediately
    const reader = new FileReader();
    reader.onloadend = () => {
      setPreviewUrl(reader.result);
    };
    reader.readAsDataURL(file);
  };
  if (!localUser && !user) {
    return <p>Loading...</p>;
  }
  
  return (
    <div className="profile-page-info-con z-[-1]">
      {/* ✅ Show messages */}
      <div className="user-info-con z-[-1]">
        <div className="profile-image-wrapper">
          <img
            src={user?.profileUrl || profileImage || previewUrl}
            alt="Profile"
            className="profile-image"
          />
          {editMode && (
            <div
              className="edit-overlay"
              onClick={(e) => {
                e.stopPropagation();
                document.getElementById("profileFileInput").click();
              }}
            >
              <SquarePen />
            </div>
          )}
          <input
            type="file"
            accept="image/*"
            id="profileFileInput"
            style={{ display: "none" }}
            onChange={handleProfileImageChange}
          />
        </div>

        {!editMode && (
          <SquarePen onClick={handleEditClick}/>
          // <i className="bi bi-pencil-square" onClick={handleEditClick}></i>
        )}
        <div className="user-info-name-phone-email-con">
          {editMode ? (
            <>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleInputChange}
                className="edit-mode-input-field"
              />
              <input
                type="text"
                name="phone"
                value={formData.phone}
                onChange={handleInputChange}
                className="edit-mode-input-field"
              />
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleInputChange}
                className="edit-mode-input-field"
              />
              {errorMessage && <p style={{ color: "red" }}>{errorMessage}</p>}
              {successMessage && (
                <p style={{ color: "green" }}>{successMessage}</p>
              )}
              <div className="profile-info-btns-div">
                <button onClick={handleSave} className="profile-info-btns-save">
                  Save
                </button>
                <button
                  onClick={handleCancel}
                  className="profile-info-btns-cancel"
                >
                  Cancel
                </button>
              </div>
            </>
          ) : (
            <>
              <h2>{user?.name || localUser?.name}</h2>
              <div className="user-phone-email-info">
                {/* <div className="user-phone-icon-div">
                  <i class="bi bi-telephone"></i>
                  <p>{user.number}</p>
                </div> */}
                <div className="user-phone-icon-div">
                  <Mail />
                  <p>{user?.email || localUser?.email}</p>
                </div>
              </div>
            </>
          )}
        </div>
      </div>
      <div className="saved-address-heading">
        <h2>Saved Addresses</h2>
        <p
          className="profile-page-view-all-text-p"
          style={{ cursor: "pointer" }}
          onClick={() =>
            navigate("/account", { state: { section: "address" } })
          }
        >
          VIEW ALL
        </p>
      </div>
      <div className="user-address-con">
        {Array.isArray(addresses) && addresses.length > 0 ? (
          addresses.map((addr, index) =>
            addr ? (
              <div
                className="user-address-container-div"
                key={addr._id || index}
              >
                <div className="user-address-container-head">
                  <h6>
                    {index === 0 ? "Delivery Address" : "Billing Address"}
                  </h6>
                  <SquarePen />
                </div>

                {addressEditId === addr._id ? (
                  <div className="user-address-container-edit">
                    <input
                      type="text"
                      name="street"
                      value={addressForm.street || ""}
                      onChange={handleAddressChange}
                      placeholder="Street"
                    />
                    <input
                      type="text"
                      name="city"
                      value={addressForm.city || ""}
                      onChange={handleAddressChange}
                      placeholder="City"
                    />
                    <input
                      type="text"
                      name="district"
                      value={addressForm.district || ""}
                      onChange={handleAddressChange}
                      placeholder="District"
                    />
                    <input
                      type="text"
                      name="pincode"
                      value={addressForm.pincode || ""}
                      onChange={handleAddressChange}
                      placeholder="Pincode"
                    />
                    <input
                      type="text"
                      name="state"
                      value={addressForm.state || ""}
                      onChange={handleAddressChange}
                      placeholder="State"
                    />
                    <input
                      type="text"
                      name="phone"
                      value={addressForm.phone || ""}
                      onChange={handleAddressChange}
                      placeholder="Phone"
                    />

                    <div className="address-edit-btns">
                      <button
                        onClick={handleAddressSave}
                        className="address-save-btn"
                      >
                        Save
                      </button>
                      <button
                        onClick={handleAddressCancel}
                        className="address-cancel-btn"
                      >
                        Cancel
                      </button>
                    </div>
                  </div>
                ) : (
                  <div className="user-address-container-value">
                    <h5>{user?.name || "Name"}</h5>
                    <p>
                      {addr.street}, {addr.city}, {addr.district} -{" "}
                      {addr.pincode}, {addr.state}
                    </p>
                  </div>
                )}
              </div>
            ) : null
          )
        ) : (
          <p>No addresses found.</p>
        )}
      </div>

      {/* <div className="profile-page-info-input">
        <input
          type="text"
          placeholder="First Name"
          name="firstName"
          value={formData.firstName}
          onChange={handleInputChange}
          disabled={!editMode}
        />
      </div>

      <div className="profile-page-info-input">
        <input
          type="text"
          placeholder="Email"
          name="email"
          value={formData.email}
          onChange={handleInputChange}
          disabled={!editMode}
        />
      </div>

      <div className="profile-page-info-input">
        <input
          type="text"
          placeholder="Mobile Number"
          name="mobile"
          value={formData.mobile}
          onChange={handleInputChange}
          disabled={!editMode}
        />
        <input
          type="date"
          name="dob"
          value={formData.dob ? formData.dob.slice(0, 10) : ""}
          onChange={handleInputChange}
          disabled={!editMode}
        />
      </div>

      <div className="profile-info-gender-div">
        <div
          className={`profile-info-gender-icon ${
            selectedGender === "female" ? "selected-gender" : ""
          }`}
          onClick={() => handleGenderClick("female")}
        >
          <i className="bi bi-gender-female"></i>
          <p>Female</p>
        </div>
        <div
          className={`profile-info-gender-icon ${
            selectedGender === "male" ? "selected-gender" : ""
          }`}
          onClick={() => handleGenderClick("male")}
        >
          <i className="bi bi-gender-male"></i>
          <p>Male</p>
        </div>
      </div>

      <div className="profile-info-btn-div">
        {!editMode ? (
          <button onClick={handleEdit} className="profile-info-btn-edit">
           {isediting? "Editing..." :  "Edit"}
          </button>
        ) : (
          <div className="profile-info-btns-div">
            <button onClick={handleSave} className="profile-info-btn-save">
              Save
            </button>
            <button onClick={handleCancel} className="profile-info-btn-cancel">
              Cancel
            </button>
          </div>
        )}
      </div> */}
    </div>
  );
}

export default ProfilePageInfo;
