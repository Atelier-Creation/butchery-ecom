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
import Testimonials from "./Testimonials";
import AboutUs from "../../components/AboutUs";
import { getProducts } from "../../api/productApi";
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
      ta: "எலும்பில்லா நாட்டு கோழி இறைச்சி",
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
      ta: "நாட்டு கோழி கீமா இறைச்சி",
    },
    img: "https://lenaturelmeat.com/cdn/shop/files/Broiler1.jpg?v=1686210766&width=533",
    price: "₹250.00",
    oldPrice: "₹280.00",
    tag: "Sale",
  },
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
      en: "Chicken (Broiler Kozhi) Lollipop Pack of 6",
      ta: "கோழி (Broiler Kozhi) லாலிபாப் 6 பேக்",
    },
    img: "https://lenaturelmeat.com/cdn/shop/files/Lalipop1.webp?v=1756895386&width=360",
    price: "₹520.00",
    oldPrice: "₹600.00",
    tag: "",
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
  // Transform API products to MobileBestseller format
  const formatProductsForBestseller = (apiProducts) => {
    return apiProducts.map((prod) => {
      // Pick the first weight option as default
      const defaultWeightOption = prod.weightOptions?.[0] || {
        price: 0,
        weight: 0,
      };

      return {
        id: prod._id,
        title: {
          en: prod.name,
          ta: prod.name, // You can replace with Tamil translation if available
        },
        img: prod.images?.[0] || "", // first image
        price: `₹${defaultWeightOption.price.toFixed(2)}`,
        oldPrice: `₹${defaultWeightOption.price.toFixed(2) * 1.85}`, // If you have a discount or old price
        tag: "Sale", // You can set tags like "Sale" if needed
        unit: prod.unit,
        weightOptions: prod.weightOptions,
        cutType: prod.cutType,
      };
    });
  };

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth <= 768);
    handleResize(); // run once on mount
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  // console.log(productss)

  useEffect(() => {
    (async () => {
      try {
        const data = await getProducts();
        const formattedProducts = formatProductsForBestseller(data);
        setProducts(formattedProducts);
      } catch (err) {
        console.error("Error fetching products:", err);
      } finally {
        setLoading(false);
      }
    })();
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
          {/* <IconMenu items={menuItems} /> */}
        </div>
      ) : null}

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
        {/* <ImageWithText /> */}
        <AboutUs />
      </div>

      {/* <div data-aos="zoom-in" data-aos-delay="100">
        <MobileBestseller
          title="We Produce The Best Selected Broiler Chicken For You"
          subtitle="Most popular product near you!"
          products={Broilerproducts}
          onViewAll={() => console.log("View all clicked")}
        />
      </div> */}

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

      <div data-aos="fade-up" data-aos-delay="100">
        <Testimonials />
      </div>

      <MobileFooter />
    </div>
  );
};

export default MobileDesign;
