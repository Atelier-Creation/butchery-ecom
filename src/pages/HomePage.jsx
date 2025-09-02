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

const HomePage = () => {
  return (
    <>
    <Navbar/>
    <BannerSlider />
    <FeaturesSection />
    <ShopByCategory />
    <div className='h-[30vh] bg-white'>
    </div>
    <ExploreSection/>
    <Banner/>
    <QualitySection/>
    <HowItWorks/>
    <DeliverSection/>
    <TestimonialsSection/>
    </>
  )
}

export default HomePage
