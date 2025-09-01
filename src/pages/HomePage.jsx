import Navbar from '../components/Navbar'
import BannerSlider from '../components/BannerSlider'
import FeaturesSection from '../components/FeaturesSection'
import ShopByCategory from '../components/ShopByCategory'

const HomePage = () => {
  return (
    <>
    <Navbar/>
    <BannerSlider />
    <FeaturesSection />
    <ShopByCategory />
    <div className='h-[30vh] bg-white'>
    </div>
    </>
  )
}

export default HomePage
