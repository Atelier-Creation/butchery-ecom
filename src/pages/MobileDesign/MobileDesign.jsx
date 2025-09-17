import React, { useEffect, useState } from "react";
import MobileNavbar from "./MobileNavbar";
import MobileBanner from "./MobileBanner";
import MobileCategorySlider from "./MobileCategorySlider";
import MobileBestseller from "./MobileBestseller";
import IconMenu from "./MobileIconMenu";
import ImageWithText from "../../components/ImageWithText";
import FeatureSlider from "./MobileFeatureSlider";
import MobileFooter from "./MobileFooter";
import NewNavbar from "./NewNavbar";
import Navbar from "../../pages/MobileDesign/Navbar";
import AOS from "aos";
import "aos/dist/aos.css";
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
    title: {
      en: "Country Chicken (Naattu Kozhi) Curry Cut Meat",
      ta: "நாட்டு கோழி கறி கட்  இறைச்சி",
    },
    img: "https://lenaturelmeat.com/cdn/shop/files/NT4.png?v=1719991493&width=533",
    price: "₹385.00",
    oldPrice: "₹420.00",
    tag: "Sale",
  },
  {
    id: 2,
    title: {
      en: "Country Chicken (Naattu Kozhi) Boneless",
      ta: "எலும்பில்லா நாட்டு கோழி",
    },
    img: "https://lenaturelmeat.com/cdn/shop/files/Goat_Keema_3.jpg?v=1746256020&width=533",
    price: "₹250.00",
    oldPrice: "₹300.00",
    tag: "Sale",
  },
  {
    id: 3,
    title: {
      en: "Country Chicken (Naattu Kozhi) Lollipop Pack of 6",
      ta: "நாட்டு கோழி லாலிபாப் 6 பேக்",
    },
    img: "https://lenaturelmeat.com/cdn/shop/files/top-view-delicious-salmon-table.jpg?v=1753342530&width=533",
    price: "₹520.00",
    oldPrice: "₹600.00",
    tag: "",
  },
  {
    id: 4,
    title: {
      en: "Country Chicken (Naattu Kozhi) Chicken Mince/Keema",
      ta: "நாட்டு கோழி கீமா",
    },
    img: "https://lenaturelmeat.com/cdn/shop/files/Broiler1.jpg?v=1686210766&width=533",
    price: "₹250.00",
    oldPrice: "₹280.00",
    tag: "Sale",
  },
];

const Broilerproducts = [
  {
    id: 1,
    title: {
      en: "Broiler Chicken (Broiler Kozhi) Curry Cut Meat",
      ta: "ப்ரோய்லர் கோழி (Broiler Kozhi) கறி கட் மீட்",
    },
    img: "https://lenaturelmeat.com/cdn/shop/files/NT4.png?v=1719991493&width=533",
    price: "₹385.00",
    oldPrice: "₹420.00",
    tag: "Sale",
  },
  {
    id: 2,
    title: {
      en: "Broiler Chicken (Broiler Kozhi) Boneless",
      ta: "ப்ரோய்லர் கோழி (Broiler Kozhi) எலும்பில்லா",
    },
    img: "https://lenaturelmeat.com/cdn/shop/files/Goat_Keema_3.jpg?v=1746256020",
    price: "₹250.00",
    oldPrice: "₹300.00",
    tag: "Sale",
  },
  {
    id: 3,
    title: {
      en: "Broiler Chicken (Broiler Kozhi) Lollipop Pack of 6",
      ta: "ப்ரோய்லர் கோழி (Broiler Kozhi) லாலிபாப் 6 பேக்",
    },
    img: "https://lenaturelmeat.com/cdn/shop/files/top-view-delicious-salmon-table.jpg?v=1753342530",
    price: "₹520.00",
    oldPrice: "₹600.00",
    tag: "",
  },
  {
    id: 4,
    title: {
      en: "Country Chicken (Broiler Kozhi) Lollipop Pack of 6",
      ta: "நாட்டு கோழி (Broiler Kozhi) லாலிபாப் 6 பேக்",
    },
    img: "https://lenaturelmeat.com/cdn/shop/files/Lalipop1.webp?v=1756895386&width=360",
    price: "₹520.00",
    oldPrice: "₹600.00",
    tag: "",
  },
];

const muttonProducts = [
  {
    id: 1,
    title: {
      en: "Mutton Curry Cut (Goat)",
      ta: "மட்டன் கறி கட் (ஆடு)",
    },
    img: "https://lenaturelmeat.com/cdn/shop/files/MUTTON4.jpg?v=1686218107&width=533",
    price: "₹690.00",
    oldPrice: "₹750.00",
    tag: "Sale",
    link: "/products/mutton-curry-cut-goat",
  },
  {
    id: 2,
    title: {
      en: "Mutton Boneless (Goat)",
      ta: "எலும்பில்லா மட்டன் (ஆடு)",
    },
    img: "https://lenaturelmeat.com/cdn/shop/files/MUTTON4.jpg?v=1686218107&width=533",
    price: "₹890.00",
    oldPrice: "₹950.00",
    tag: "Sale",
    link: "/products/mutton-boneless-goat",
  },
  {
    id: 3,
    title: {
      en: "Mutton Keema (Goat)",
      ta: "மட்டன் கீமா (ஆடு)",
    },
    img: "https://lenaturelmeat.com/cdn/shop/files/MUTTON4.jpg?v=1686218107&width=360",
    price: "₹580.00",
    oldPrice: "₹620.00",
    tag: "Offer",
    link: "/products/mutton-keema-goat",
  },
  {
    id: 4,
    title: {
      en: "Mutton Liver (Goat)",
      ta: "மட்டன் கல்லீரல் (ஆடு)",
    },
    img: "https://lenaturelmeat.com/cdn/shop/files/MUTTON4.jpg?v=1686218107&width=533",
    price: "₹450.00",
    oldPrice: "₹500.00",
    tag: "Sale",
    link: "/products/mutton-liver-goat",
  },
];

const featuresData = [
  {
    title: {
      en: "No Added Hormones",
      ta: "கூடுதல் ஹார்மோன்கள் சேர்க்கப்படவில்லை",
    },
    img: "https://lenaturelmeat.com/cdn/shop/files/No_ANTIBIOTICS_NO_HORMONES_ICON_9603e568-5392-42f0-a6a8-c128a2ad6f79-removebg-preview.png?v=1754041538",
  },
  {
    title: {
      en: "Organic & Fresh",
      ta: "ஆர்கானிக் & புதியது",
    },
    img: "https://lenaturelmeat.com/cdn/shop/files/Organic_Fresh_Country_chicken.png?v=1687589175",
  },
  {
    title: {
      en: "100% Natural",
      ta: "100% இயற்கை",
    },
    img: "https://lenaturelmeat.com/cdn/shop/files/natural.png?v=1751627000",
  },
  {
    title: {
      en: "No Antibiotics",
      ta: "ஆண்டிபயாடிக்ஸ் இல்லை",
    },
    img: "https://lenaturelmeat.com/cdn/shop/files/No_ANTIBIOTICS_NO_HORMONES-removebg-preview.png?v=1754041465",
  },
];

const MobileDesign = () => {
  const [isMobile, setIsMobile] = useState(false);
  useEffect(() => {
    AOS.init({
      duration: 1000, // animation duration
      easing: "ease-in-out", // animation easing
      once: true, // whether animation should happen only once
    });
  }, []);

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth <= 768);
    handleResize(); // run once on mount
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);
  return (
    <div className="bg-white min-h-screen">
      {isMobile ? <MobileNavbar /> : <Navbar />}

      {isMobile ? (
        <div>
          <IconMenu items={menuItems} />
        </div>
      ) : null}

      <div data-aos="fade-up" data-aos-delay="100">
        <MobileBanner />
      </div>

      {!isMobile ? (
        <div data-aos="fade-up" data-aos-delay="100">
          <IconMenu items={menuItems} />
        </div>
      ): null}

      <div data-aos="zoom-in" data-aos-delay="100">
        <MobileCategorySlider />
      </div>

      <div data-aos="fade-right" data-aos-delay="100">
        <MobileBestseller
          title="We Produce The Best Selected Meats For You"
          subtitle="Most popular product near you!"
          products={products}
          onViewAll={() => console.log("View all clicked")}
        />
      </div>

      <div data-aos="fade-up" data-aos-delay="100">
        <ImageWithText />
      </div>

      <div data-aos="zoom-in" data-aos-delay="100">
        <MobileBestseller
          title="We Produce The Best Selected Broiler Chicken For You"
          subtitle="Most popular product near you!"
          products={Broilerproducts}
          onViewAll={() => console.log("View all clicked")}
        />
      </div>

      {/* <div>
    <MobileBestseller
      title="We Produce The Best Selected Mutoom For You"
      subtitle="Most popular product near you!"
      products={muttonProducts}
      onViewAll={() => console.log("View all clicked")}
    />
  </div> */}

      <div data-aos="zoom-in" data-aos-delay="100">
        <FeatureSlider features={featuresData} />
      </div>

      <MobileFooter />
    </div>
  );
};

export default MobileDesign;
