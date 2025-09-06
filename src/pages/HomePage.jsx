import Navbar from '../components/Navbar'
import BannerSlider from '../components/BannerSlider'
import FeaturesSection from '../components/FeaturesSection'
import ShopByCategory from '../components/ShopByCategory'
import ExploreSection from '../components/ExploreSection/ExploreSection'
import Banner from '../components/Banner/Banner'
import QualitySection from '../components/QualitySection/QualitySection'
import HowItWorks from '../components/HowItWorks/HowItWorks'
import DeliverSection from '../components/DeliverSection/DeliverSection'
import TestimonialsSection from '../components/TestimonialsSection/TestimonialsSection'
import FaqSection from '../components/FaqSection/FaqSection'
import OurBlog from '../components/OurBlog/OurBlog'
import FindStore from '../components/FindStore/FindStore'
import Footer from '../components/Footer/Footer'

const HomePage = () => {
  return (
    <>
    <Navbar/>
    <BannerSlider />
    <FeaturesSection />
    <ShopByCategory />
    <ExploreSection/>
    <Banner/>
    <QualitySection/>
    <HowItWorks/>
    <DeliverSection/>
    <TestimonialsSection/>
    <FaqSection/>
    <OurBlog/>
    <FindStore/>
    <Footer/>
    </>
  )
}

export default HomePage
