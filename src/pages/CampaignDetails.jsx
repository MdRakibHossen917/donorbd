import { useParams, Link } from 'react-router-dom'
import { useDonation } from '../context/DonationContext'
import { useLanguage } from '../context/LanguageContext'
import { Calendar, Target, Users, MapPin, Share2, Heart, AlertTriangle } from 'lucide-react'
import { useState } from 'react'
import toast from 'react-hot-toast'

const CampaignDetails = () => {
  const { id } = useParams()
  const { campaigns, addToCart } = useDonation()
  const { t } = useLanguage()
  
  const [selectedAmount, setSelectedAmount] = useState('')
  const [customAmount, setCustomAmount] = useState('')
  
  const campaign = campaigns.find(c => c.id === parseInt(id))
  
  if (!campaign) {
    return (
      <div className="text-center py-20">
        <h2 className="text-3xl font-bold mb-4">{t('campaignNotFound')}</h2>
        <Link to="/campaigns" className="btn-primary">
          {t('backToCampaigns')}
        </Link>
      </div>
    )
  }

  const progress = (campaign.raised / campaign.target) * 100
  const presetAmounts = [500, 1000, 2000, 5000, 10000]

  const handleDonate = () => {
    const amount = customAmount || selectedAmount
    if (!amount) {
      toast.error(t('selectAmountError'))
      return
    }

    const donationItem = {
      id: Date.now(),
      campaignId: campaign.id,
      campaignTitle: campaign.title,
      category: campaign.category,
      amount: parseFloat(amount),
      type: 'one-time',
      date: new Date().toISOString()
    }

    addToCart(donationItem)
    toast.success(t('donationAddedToCart'))
  }

  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: campaign.title,
        text: campaign.description,
        url: window.location.href,
      })
    } else {
      navigator.clipboard.writeText(window.location.href)
      toast.success(t('linkCopied'))
    }
  }

  return (
    <div className="max-w-6xl mx-auto px-4">
      {/* Breadcrumb */}
      <div className="flex items-center text-xs sm:text-sm text-gray-600 dark:text-gray-400 mb-4 sm:mb-6 overflow-x-auto">
        <Link to="/" className="hover:text-primary-600">{t('home')}</Link>
        <span className="mx-2">/</span>
        <Link to="/campaigns" className="hover:text-primary-600">{t('campaigns')}</Link>
        <span className="mx-2">/</span>
        <span className="text-primary-600 dark:text-primary-400">{campaign.title}</span>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 sm:gap-8">
        {/* Main Content */}
        <div className="lg:col-span-2 order-2 lg:order-1">
          <div className="card">
            <div className="flex justify-between items-start mb-6">
              <div>
                {campaign.urgent && (
                  <span className="inline-flex items-center px-3 py-1 bg-red-100 dark:bg-red-900/30 text-red-600 dark:text-red-400 rounded-full text-sm font-medium mb-3">
                    <AlertTriangle size={14} className="mr-1" /> {t('urgent')}
                  </span>
                )}
                <h1 className="text-2xl sm:text-3xl font-bold mb-3">{campaign.title}</h1>
                <div className="flex flex-col sm:flex-row items-start sm:items-center gap-2 sm:gap-4 text-gray-600 dark:text-gray-400 text-sm">
                  <span className="flex items-center">
                    <MapPin size={14} className="mr-1 sm:w-4 sm:h-4" />
                    {campaign.location}
                  </span>
                  <span className="flex items-center">
                    <Calendar size={14} className="mr-1 sm:w-4 sm:h-4" />
                    {new Date(campaign.deadline).toLocaleDateString()}
                  </span>
                </div>
              </div>
              <button
                onClick={handleShare}
                className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg"
                title={t('share')}
              >
                <Share2 size={20} />
              </button>
            </div>

            {/* Campaign Image */}
            <div className="aspect-video bg-gradient-to-r from-primary-500 to-secondary-500 rounded-xl overflow-hidden mb-8">
              <div className="w-full h-full flex items-center justify-center text-white">
                <Heart size={64} />
              </div>
            </div>

            {/* Progress */}
            <div className="mb-8">
              <div className="flex justify-between items-center mb-4">
                <div>
                  <div className="text-2xl font-bold">৳{campaign.raised.toLocaleString()}</div>
                  <div className="text-gray-600 dark:text-gray-400">
                    {t('raised')} of ৳{campaign.target.toLocaleString()} {t('target')}
                  </div>
                </div>
                <div className="text-right">
                  <div className="text-2xl font-bold text-primary-600 dark:text-primary-400">
                    {Math.round(progress)}%
                  </div>
                  <div className="text-gray-600 dark:text-gray-400">
                    {campaign.donors} {t('donors')}
                  </div>
                </div>
              </div>
              <div className="progress-bar h-4">
                <div className="progress-fill h-4" style={{ width: `${progress}%` }} />
              </div>
            </div>

            {/* Description */}
            <div className="prose dark:prose-invert max-w-none">
              <h2 className="text-2xl font-semibold mb-4">{t('aboutThisCampaign')}</h2>
              <p className="text-gray-700 dark:text-gray-300 mb-6">
                {campaign.description}
              </p>
              
              <h3 className="text-xl font-semibold mb-3">{t('howFundsWillBeUsed')}</h3>
              <ul className="space-y-2 mb-6">
                <li className="flex items-center">
                  <div className="w-2 h-2 bg-primary-500 rounded-full mr-3"></div>
                  {t('item1')}
                </li>
                <li className="flex items-center">
                  <div className="w-2 h-2 bg-primary-500 rounded-full mr-3"></div>
                  {t('item2')}
                </li>
                <li className="flex items-center">
                  <div className="w-2 h-2 bg-primary-500 rounded-full mr-3"></div>
                  {t('item3')}
                </li>
              </ul>

              <h3 className="text-xl font-semibold mb-3">{t('impact')}</h3>
              <p className="text-gray-700 dark:text-gray-300">
                {t('impactDescription')}
              </p>
            </div>
          </div>

          {/* Updates Section */}
          <div className="card mt-8">
            <h2 className="text-2xl font-semibold mb-6">{t('campaignUpdates')}</h2>
            <div className="space-y-6">
              <div className="border-l-4 border-primary-500 pl-4 py-2">
                <div className="text-sm text-gray-500 dark:text-gray-400 mb-1">
                  January 15, 2024
                </div>
                <p className="text-gray-700 dark:text-gray-300">
                  {t('update1')}
                </p>
              </div>
              <div className="border-l-4 border-primary-500 pl-4 py-2">
                <div className="text-sm text-gray-500 dark:text-gray-400 mb-1">
                  January 10, 2024
                </div>
                <p className="text-gray-700 dark:text-gray-300">
                  {t('update2')}
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Donation Sidebar */}
        <div className="order-1 lg:order-2">
          <div className="card sticky top-20 lg:top-24">
            <h2 className="text-2xl font-semibold mb-6">{t('supportThisCampaign')}</h2>
            
            <div className="mb-6">
              <div className="text-sm font-medium mb-3">{t('selectAmount')}</div>
              <div className="grid grid-cols-3 gap-2 mb-4">
                {presetAmounts.map(amount => (
                  <button
                    key={amount}
                    onClick={() => {
                      setSelectedAmount(amount.toString())
                      setCustomAmount('')
                    }}
                    className={`py-3 border rounded-lg font-medium transition-all ${
                      selectedAmount === amount.toString()
                        ? 'border-primary-500 bg-primary-500 text-white'
                        : 'border-gray-300 dark:border-gray-600 hover:border-primary-500'
                    }`}
                  >
                    ৳{amount.toLocaleString()}
                  </button>
                ))}
              </div>
              
              <div className="relative">
                <span className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-500">
                  ৳
                </span>
                <input
                  type="number"
                  value={customAmount}
                  onChange={(e) => {
                    setCustomAmount(e.target.value)
                    setSelectedAmount('')
                  }}
                  placeholder={t('customAmountPlaceholder')}
                  className="input-field pl-10"
                  min="100"
                />
              </div>
            </div>

            <div className="mb-6">
              <div className="text-sm font-medium mb-3">{t('donationType')}</div>
              <div className="grid grid-cols-2 gap-3">
                <button className="py-3 border border-gray-300 dark:border-gray-600 rounded-lg font-medium hover:border-primary-500">
                  {t('oneTime')}
                </button>
                <button className="py-3 border border-gray-300 dark:border-gray-600 rounded-lg font-medium hover:border-primary-500">
                  {t('monthly')}
                </button>
              </div>
            </div>

            <button
              onClick={handleDonate}
              className="btn-primary w-full mb-4"
            >
              <Heart size={20} className="mr-2 inline" />
              {t('donateNow')}
            </button>

            <div className="text-center">
              <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">
                {t('securePayment')}
              </p>
              <div className="flex justify-center space-x-4">
                <div className="w-10 h-6 bg-gray-200 dark:bg-gray-700 rounded"></div>
                <div className="w-10 h-6 bg-gray-200 dark:bg-gray-700 rounded"></div>
                <div className="w-10 h-6 bg-gray-200 dark:bg-gray-700 rounded"></div>
              </div>
            </div>

            <div className="mt-8 pt-8 border-t border-gray-200 dark:border-gray-700">
              <h3 className="font-semibold mb-3">{t('campaignOrganizer')}</h3>
              <div className="flex items-center">
                <div className="w-12 h-12 bg-primary-100 dark:bg-primary-900/30 rounded-full flex items-center justify-center text-primary-600 dark:text-primary-400 font-bold text-xl mr-3">
                  D
                </div>
                <div>
                  <div className="font-medium">DonorBD Foundation</div>
                  <div className="text-sm text-gray-600 dark:text-gray-400">
                    12 {t('campaigns')} • 98% {t('successRate')}
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Quick Stats */}
          <div className="card mt-6">
            <h3 className="font-semibold mb-4">{t('campaignStats')}</h3>
            <div className="space-y-4">
              <div className="flex justify-between">
                <span className="text-gray-600 dark:text-gray-400">{t('daysLeft')}</span>
                <span className="font-medium">45</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600 dark:text-gray-400">{t('averageDonation')}</span>
                <span className="font-medium">৳2,580</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600 dark:text-gray-400">{t('socialShares')}</span>
                <span className="font-medium">1,245</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600 dark:text-gray-400">{t('verified')}</span>
                <span className="text-green-600 dark:text-green-400">✓</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default CampaignDetails

