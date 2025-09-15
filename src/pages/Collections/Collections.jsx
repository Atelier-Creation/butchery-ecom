import React, { useState, useEffect } from "react";
import MobileNavbar from "../MobileDesign/MobileNavbar";
import IconMenu from "../MobileDesign/MobileIconMenu";
import MobileFooter from "../MobileDesign/MobileFooter";
import Collectiongrid from "./Collectiongrid";
import NewNavbar from "../MobileDesign/NewNavbar";
import Navbar from "../MobileDesign/Navbar";

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
const Collections = () => {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth <= 768);
    handleResize(); // run once on mount
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);
  return (
    <>
      {isMobile ? <MobileNavbar /> : <Navbar/>}
      {isMobile ? <IconMenu items={menuItems} /> : ""}
      {/* <IconMenu items={menuItems} /> */}
      <Collectiongrid />
      <MobileFooter />
    </>
  );
};

export default Collections;
