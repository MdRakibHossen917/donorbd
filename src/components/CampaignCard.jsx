import { Link } from 'react-router-dom'
import { Calendar, Target, Users, Heart } from 'lucide-react'
import { useLanguage } from '../context/LanguageContext'
import { useState } from 'react'

const CampaignCard = ({ campaign, viewMode = 'grid' }) => {
  const { t } = useLanguage()
  const [imageError, setImageError] = useState(false)
  
  const progress = (campaign.raised / campaign.target) * 100

  const getCategoryGradient = (category) => {
    const gradients = {
      'Emergency Relief': 'from-red-500 to-orange-500',
      'Education': 'from-blue-500 to-indigo-500',
      'Healthcare': 'from-green-500 to-teal-500',
      'Orphan Support': 'from-purple-500 to-pink-500',
      'Food & Nutrition': 'from-yellow-500 to-orange-500',
      'Shelter': 'from-gray-500 to-slate-500',
      'Livelihood': 'from-cyan-500 to-blue-500',
      'Environment': 'from-emerald-500 to-green-500'
    }
    return gradients[category] || 'from-primary-500 to-secondary-500'
  }
  
  if (viewMode === 'list') {
    return (
      <div className="card">
        <div className="flex flex-col md:flex-row md:items-center">
          <div className="md:w-1/3 mb-4 md:mb-0 md:mr-6">
            <div className="aspect-video rounded-lg overflow-hidden relative shadow-lg">
              {!imageError && campaign.image ? (
                <img 
                  src={campaign.image} 
                  alt={campaign.title}
                  className="w-full h-full object-cover"
                  onError={() => setImageError(true)}
                  loading="lazy"
                />
              ) : (
                <div className={`w-full h-full bg-gradient-to-r ${getCategoryGradient(campaign.category)} flex items-center justify-center text-white`}>
                  <Heart size={48} className="opacity-80" />
                </div>
              )}
              <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent"></div>
            </div>
          </div>
          <div className="flex-1">
            <div className="flex justify-between items-start mb-3">
              <div>
                <span className="inline-block px-3 py-1 bg-primary-100 dark:bg-primary-900/30 text-primary-600 dark:text-primary-400 rounded-full text-sm font-medium mb-2">
                  {campaign.category}
                </span>
                <h3 className="text-xl font-semibold mb-2">{campaign.title}</h3>
              </div>
              {campaign.urgent && (
                <span className="px-3 py-1 bg-red-100 dark:bg-red-900/30 text-red-600 dark:text-red-400 rounded-full text-sm font-medium">
                  {t('urgent')}
                </span>
              )}
            </div>
            
            <p className="text-gray-600 dark:text-gray-400 mb-4">
              {campaign.description.slice(0, 150)}...
            </p>
            
            <div className="mb-4">
              <div className="flex justify-between text-sm mb-1">
                <span>{t('raised')}: ৳{campaign.raised.toLocaleString()}</span>
                <span>{Math.round(progress)}%</span>
              </div>
              <div className="progress-bar">
                <div className="progress-fill" style={{ width: `${progress}%` }} />
              </div>
            </div>
            
            <div className="flex flex-wrap items-center justify-between">
              <div className="flex items-center space-x-4">
                <div className="flex items-center text-sm text-gray-600 dark:text-gray-400">
                  <Target size={16} className="mr-1" />
                  {t('target')}: ৳{campaign.target.toLocaleString()}
                </div>
                <div className="flex items-center text-sm text-gray-600 dark:text-gray-400">
                  <Calendar size={16} className="mr-1" />
                  {new Date(campaign.deadline).toLocaleDateString()}
                </div>
                <div className="flex items-center text-sm text-gray-600 dark:text-gray-400">
                  <Users size={16} className="mr-1" />
                  {campaign.donors} {t('donors')}
                </div>
              </div>
              <Link
                to={`/campaigns/${campaign.id}`}
                className="btn-primary mt-4 md:mt-0"
              >
                {t('donateNow')}
              </Link>
            </div>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="card hover:shadow-xl transition-all duration-300">
      <div className="relative">
        <div className="aspect-video rounded-lg overflow-hidden mb-4 relative shadow-lg">
          {!imageError && campaign.image ? (
            <img 
              src={campaign.image} 
              alt={campaign.title}
              className="w-full h-full object-cover"
              onError={() => setImageError(true)}
              loading="lazy"
            />
          ) : (
            <div className={`w-full h-full bg-gradient-to-r ${getCategoryGradient(campaign.category)} flex items-center justify-center text-white`}>
              <Heart size={48} className="opacity-80" />
            </div>
          )}
          <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent"></div>
          {campaign.urgent && (
            <div className="absolute top-4 left-4 z-10">
              <span className="px-3 py-1 bg-red-600 text-white rounded-full text-sm font-medium shadow-lg">
                {t('urgent')}
              </span>
            </div>
          )}
        </div>
      </div>
      
      <div className="mb-4">
        <div className="flex justify-between items-start mb-2">
          <span className="px-3 py-1 bg-primary-100 dark:bg-primary-900/30 text-primary-600 dark:text-primary-400 rounded-full text-sm font-medium">
            {campaign.category}
          </span>
        </div>
        <h3 className="text-xl font-semibold mb-2">{campaign.title}</h3>
        <p className="text-gray-600 dark:text-gray-400 text-sm">
          {campaign.description.slice(0, 100)}...
        </p>
      </div>
      
      <div className="mb-4">
        <div className="flex justify-between text-sm mb-1">
          <span>{t('raised')}: ৳{campaign.raised.toLocaleString()}</span>
          <span>{Math.round(progress)}%</span>
        </div>
        <div className="progress-bar">
          <div className="progress-fill" style={{ width: `${progress}%` }} />
        </div>
      </div>
      
      <div className="flex items-center justify-between text-sm text-gray-600 dark:text-gray-400 mb-6">
        <div className="flex items-center">
          <Target size={16} className="mr-1" />
          {t('target')}: ৳{campaign.target.toLocaleString()}
        </div>
        <div className="flex items-center">
          <Calendar size={16} className="mr-1" />
          {new Date(campaign.deadline).toLocaleDateString()}
        </div>
      </div>
      
      <Link
        to={`/campaigns/${campaign.id}`}
        className="btn-primary w-full text-center"
      >
        {t('donateNow')}
      </Link>
    </div>
  )
}

export default CampaignCard

