import Navbar from '../components/Navbar'
import BannerSlider from '../components/BannerSlider'
import FeaturesSection from '../components/FeaturesSection'
import ShopByCategory from '../components/ShopByCategory'
import ExploreSection from '../components/ExploreSection/ExploreSection'
import Banner from '../components/Banner/Banner'
import QualitySection from '../components/QualitySection/QualitySection'

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
    </>
  )
}

export default HomePage
