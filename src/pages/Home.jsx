import { useDonation } from '../context/DonationContext'
import { useLanguage } from '../context/LanguageContext'
import { Heart, Users, Target, Shield, ArrowRight } from 'lucide-react'
import { Link } from 'react-router-dom'
import CampaignCard from '../components/CampaignCard'
import CategoryCard from '../components/CategoryCard'

const Home = () => {
  const { campaigns, categories, totalRaised, totalDonors } = useDonation()
  const { t } = useLanguage()

  const stats = [
    { icon: <Heart />, value: `৳${(totalRaised / 100000).toFixed(1)}M`, label: t('totalRaised') },
    { icon: <Users />, value: totalDonors, label: t('totalDonors') },
    { icon: <Target />, value: campaigns.length, label: t('activeCampaigns') },
    { icon: <Shield />, value: '1.2K', label: t('livesImpacted') },
  ]

  const featuredCampaigns = campaigns.slice(0, 3)

  return (
    <div className="space-y-16">
      {/* Hero Section */}
      <section className="text-center py-8 sm:py-12 md:py-20 px-4">
        <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold mb-4 sm:mb-6 leading-tight">
          <span className="text-primary-600 dark:text-primary-400">{t('donateSave')}</span>
          <br />
          <span className="text-secondary-500">{t('livesTogether')}</span>
        </h1>
        <p className="text-base sm:text-lg md:text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto mb-6 sm:mb-10 px-4">
          {t('heroDescription')}
        </p>
        <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center px-4">
          <Link to="/donate" className="btn-primary inline-flex items-center justify-center text-sm sm:text-base">
            {t('donateNow')} <ArrowRight className="ml-2" size={18} />
          </Link>
          <Link to="/apply" className="btn-outline inline-flex items-center justify-center text-sm sm:text-base">
            {t('needHelp')}
          </Link>
        </div>
      </section>

      {/* Stats Section */}
      <section className="grid grid-cols-2 md:grid-cols-4 gap-3 sm:gap-4 md:gap-6">
        {stats.map((stat, index) => (
          <div key={index} className="card text-center p-4 sm:p-6">
            <div className="inline-flex items-center justify-center w-10 h-10 sm:w-12 sm:h-12 bg-primary-100 dark:bg-primary-900/30 rounded-lg mb-3 sm:mb-4">
              {stat.icon}
            </div>
            <div className="text-xl sm:text-2xl md:text-3xl font-bold text-primary-600 dark:text-primary-400 mb-1 sm:mb-2">
              {stat.value}
            </div>
            <div className="text-xs sm:text-sm text-gray-600 dark:text-gray-400">{stat.label}</div>
          </div>
        ))}
      </section>

      {/* Categories Section */}
      <section>
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 sm:mb-8 gap-4">
          <h2 className="text-2xl sm:text-3xl font-bold">{t('donationCategories')}</h2>
          <Link to="/campaigns" className="text-primary-600 dark:text-primary-400 hover:underline flex items-center text-sm sm:text-base">
            {t('viewAll')} <ArrowRight className="ml-1" size={18} />
          </Link>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
          {categories.map((category) => (
            <CategoryCard key={category.id} category={category} />
          ))}
        </div>
      </section>

      {/* Featured Campaigns */}
      <section>
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 sm:mb-8 gap-4">
          <h2 className="text-2xl sm:text-3xl font-bold">{t('featuredCampaigns')}</h2>
          <Link to="/campaigns" className="text-primary-600 dark:text-primary-400 hover:underline flex items-center text-sm sm:text-base">
            {t('viewAllCampaigns')} <ArrowRight className="ml-1" size={18} />
          </Link>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
          {featuredCampaigns.map((campaign) => (
            <CampaignCard key={campaign.id} campaign={campaign} />
          ))}
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-gradient-to-r from-primary-500 to-secondary-500 rounded-2xl p-6 sm:p-8 md:p-12 text-white text-center">
        <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-3 sm:mb-4">{t('makeDifference')}</h2>
        <p className="text-base sm:text-lg md:text-xl mb-6 sm:mb-8 opacity-90 px-4">
          {t('ctaDescription')}
        </p>
        <Link to="/donate" className="bg-white text-primary-600 hover:bg-gray-100 font-bold py-2 sm:py-3 px-6 sm:px-8 rounded-lg text-base sm:text-lg inline-flex items-center">
          {t('startDonating')} <ArrowRight className="ml-2" size={18} />
        </Link>
      </section>
    </div>
  )
}

export default Home

