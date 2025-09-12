import React from "react";
import MobileNavbar from "./MobileNavbar";
import MobileBanner from "./MobileBanner";
import MobileCategorySlider from "./MobileCategorySlider";
import MobileBestseller from "./MobileBestseller";
import IconMenu from "./MobileIconMenu";
import ImageWithText from "../../components/ImageWithText";
import FeatureSlider from "./MobileFeatureSlider";
import MobileFooter from "./MobileFooter";
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

const products = [
  {
    id: 1,
    title: "Country Chicken (Naattu Kozhi) Curry Cut Meat",
    img: "https://lenaturelmeat.com/cdn/shop/files/NT4.png?v=1719991493&width=533",
    price: "₹385.00",
    oldPrice: "₹420.00",
    tag: "Sale",
  },
  {
    id: 2,
    title: "Country Chicken (Naattu Kozhi) Boneless",
    img: "https://lenaturelmeat.com/cdn/shop/files/Goat_Keema_3.jpg?v=1746256020&width=533",
    price: "₹250.00",
    oldPrice: "₹300.00",
    tag: "Sale",
  },
  {
    id: 3,
    title: "Country Chicken (Naattu Kozhi) Lollipop Pack of 6",
    img: "https://lenaturelmeat.com/cdn/shop/files/top-view-delicious-salmon-table.jpg?v=1753342530&width=533",
    price: "₹520.00",
    oldPrice: "₹600.00",
    tag: "",
  },
  {
    id: 4,
    title: "Country Chicken (Naattu Kozhi) Chicken Mince/Keema",
    img: "https://lenaturelmeat.com/cdn/shop/files/Broiler1.jpg?v=1686210766&width=533",
    price: "₹250.00",
    oldPrice: "₹280.00",
    tag: "Sale",
  },
];
const Broilerproducts = [
  {
    id: 1,
    title: "Broiler Chicken (Broiler Kozhi) Curry Cut Meat",
    img: "https://lenaturelmeat.com/cdn/shop/files/NT4.png?v=1719991493&width=533",
    price: "₹385.00",
    oldPrice: "₹420.00",
    tag: "Sale",
  },
  {
    id: 2,
    title: "Broiler Chicken (Broiler Kozhi) Boneless",
    img: "https://lenaturelmeat.com/cdn/shop/files/Goat_Keema_3.jpg?v=1746256020",
    price: "₹250.00",
    oldPrice: "₹300.00",
    tag: "Sale",
  },
  {
    id: 3,
    title: "Broiler Chicken (Broiler Kozhi) Lollipop Pack of 6",
    img: "https://lenaturelmeat.com/cdn/shop/files/top-view-delicious-salmon-table.jpg?v=1753342530",
    price: "₹520.00",
    oldPrice: "₹600.00",
    tag: "",
  },
  {
    id: 3,
    title: "Country Chicken (Broiler Kozhi) Lollipop Pack of 6",
    img: "	https://lenaturelmeat.com/cdn/shop/files/Lalipop1.webp?v=1756895386&width=360",
    price: "₹520.00",
    oldPrice: "₹600.00",
    tag: "",
  },
];

const muttonProducts = [
  {
    id: 1,
    title: "Mutton Curry Cut (Goat)",
    img: "https://lenaturelmeat.com/cdn/shop/files/MUTTON4.jpg?v=1686218107&width=533",
    price: "₹690.00",
    oldPrice: "₹750.00",
    tag: "Sale",
    link: "/products/mutton-curry-cut-goat"
  },
  {
    id: 2,
    title: "Mutton Boneless (Goat)",
    img: "https://lenaturelmeat.com/cdn/shop/files/MUTTON4.jpg?v=1686218107&width=533",
    price: "₹890.00",
    oldPrice: "₹950.00",
    tag: "Sale",
    link: "/products/mutton-boneless-goat"
  },
  {
    id: 3,
    title: "Mutton Keema (Goat)",
    img: "https://lenaturelmeat.com/cdn/shop/files/MUTTON4.jpg?v=1686218107&width=533=360",
    price: "₹580.00",
    oldPrice: "₹620.00",
    tag: "",
    link: "/products/mutton-keema-goat"
  },
  {
    id: 4,
    title: "Mutton Liver (Goat)",
    img: "https://lenaturelmeat.com/cdn/shop/files/MUTTON4.jpg?v=1686218107&width=533",
    price: "₹450.00",
    oldPrice: "₹500.00",
    tag: "Sale",
    link: "/products/mutton-liver-goat"
  }
];
const featuresData = [
  {
    title: "No Added Hormones",
    img: "https://lenaturelmeat.com/cdn/shop/files/No_ANTIBIOTICS_NO_HORMONES_ICON_9603e568-5392-42f0-a6a8-c128a2ad6f79-removebg-preview.png?v=1754041538",
  },
  {
    title: "Organic & Fresh",
    img: "https://lenaturelmeat.com/cdn/shop/files/Organic_Fresh_Country_chicken.png?v=1687589175",
  },
  {
    title: "100% Natural",
    img: "https://lenaturelmeat.com/cdn/shop/files/natural.png?v=1751627000",
  },
  {
    title: "No Antibiotics",
    img: "https://lenaturelmeat.com/cdn/shop/files/No_ANTIBIOTICS_NO_HORMONES-removebg-preview.png?v=1754041465",
  },
];
const MobileDesign = () => {
  return (
    <div className="bg-white min-h-screen">
      <MobileNavbar />
      <IconMenu items={menuItems} />
      <MobileBanner />
      <MobileCategorySlider />
      <MobileBestseller
        title="We Produce The Best Selected Meats For You"
        subtitle="Most popular product near you!"
        products={products}
        onViewAll={() => console.log("View all clicked")}
      />
      <MobileBestseller
        title="We Produce The Best Selected Broiler Chicken For You"
        subtitle="Most popular product near you!"
        products={Broilerproducts}
        onViewAll={() => console.log("View all clicked")}
      />
      <ImageWithText/>
      <MobileBestseller
        title="We Produce The Best Selected Mutoom For You"
        subtitle="Most popular product near you!"
        products={muttonProducts}
        onViewAll={() => console.log("View all clicked")}
      />
      <FeatureSlider features = {featuresData}/>
      <MobileFooter/>
    </div>
  );
};

export default MobileDesign;
