import React, { useEffect, useState } from 'react';
import ProfilePageSidebar from './ProfilePageSidebar/ProfilePageSidebar';
import ProfilePageInfo from './ProfilePageInfo/ProfilePageInfo';
import './ProfilePage.css';
import ProductPageAddress from './ProductPageAddress/ProductPageAddress';
import Wishlist from './Wishlist/Wishlist';
import { useLocation } from 'react-router-dom';
import CartPageProfile from './CartPageProfile/CartPageProfile';
import MyOrders from './MyOrders/MyOrders';
import NewNavbar from '../../pages/MobileDesign/NewNavbar';
import MobileFooter from '../../pages/MobileDesign/MobileFooter';
function ProfilePage() {
   const location = useLocation();
  const [activeSection, setActiveSection] = useState('personal');
  const storedUser = localStorage.getItem("authUser");
  useEffect(() => {
    if (location.state?.section) {
      setActiveSection(location.state.section);
    }
  }, [location.state]);

  return (
    <>
    <NewNavbar/>
    <div className='categories-page-container'>
    </div>
    <div className='profile-page-wrapper'>
      <ProfilePageSidebar setActiveSection={setActiveSection} activeSection={activeSection} />
      <div className='profile-page-right-section'>
        {activeSection === 'personal' && <ProfilePageInfo />}
        {activeSection === 'address' && <ProductPageAddress/>}
        {activeSection === 'cart' && <CartPageProfile/>}
        {activeSection === 'wishlist' && <Wishlist />}
        {activeSection === 'orders' && <MyOrders/>}
        {activeSection === 'help' && <div><h1>Help Section</h1></div>}
      </div>
    </div>
    <MobileFooter/>
    </>
  );
}

export default ProfilePage;
