import { useState } from 'react'
import { useDonation } from '../context/DonationContext'
import { useLanguage } from '../context/LanguageContext'
import CampaignCard from '../components/CampaignCard'
import { Search, Filter, Grid, List } from 'lucide-react'

const Campaigns = () => {
  const { campaigns, categories } = useDonation()
  const { t } = useLanguage()
  
  const [search, setSearch] = useState('')
  const [selectedCategory, setSelectedCategory] = useState('all')
  const [viewMode, setViewMode] = useState('grid')
  const [sortBy, setSortBy] = useState('newest')

  const filteredCampaigns = campaigns
    .filter(campaign => {
      const matchesSearch = campaign.title.toLowerCase().includes(search.toLowerCase()) ||
                          campaign.description.toLowerCase().includes(search.toLowerCase())
      const matchesCategory = selectedCategory === 'all' || campaign.category === selectedCategory
      return matchesSearch && matchesCategory
    })
    .sort((a, b) => {
      switch (sortBy) {
        case 'newest':
          return new Date(b.createdAt) - new Date(a.createdAt)
        case 'deadline':
          return new Date(a.deadline) - new Date(b.deadline)
        case 'mostFunded':
          return (b.raised / b.target) - (a.raised / a.target)
        case 'leastFunded':
          return (a.raised / a.target) - (b.raised / b.target)
        default:
          return 0
      }
    })

  return (
    <div>
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold mb-4">{t('activeCampaigns')}</h1>
        <p className="text-gray-600 dark:text-gray-300 text-lg max-w-3xl mx-auto">
          {t('campaignsDescription')}
        </p>
      </div>

      {/* Filters & Search */}
      <div className="card mb-6 sm:mb-8">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
          {/* Search */}
          <div className="sm:col-span-2 lg:col-span-2">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
              <input
                type="text"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder={t('searchCampaigns')}
                className="input-field pl-9 sm:pl-10 text-sm sm:text-base"
              />
            </div>
          </div>

          {/* Category Filter */}
          <div>
            <div className="relative">
              <Filter className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
              <select
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
                className="input-field pl-9 sm:pl-10 text-sm sm:text-base"
              >
                <option value="all">{t('allCategories')}</option>
                {categories.map(category => (
                  <option key={category.id} value={category.id}>
                    {category.name}
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* Sort By */}
          <div>
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="input-field text-sm sm:text-base"
            >
              <option value="newest">{t('newest')}</option>
              <option value="deadline">{t('deadline')}</option>
              <option value="mostFunded">{t('mostFunded')}</option>
              <option value="leastFunded">{t('leastFunded')}</option>
            </select>
          </div>
        </div>

        {/* View Toggle */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mt-4 sm:mt-6 pt-4 sm:pt-6 border-t border-gray-100 dark:border-gray-700 gap-3">
          <div className="text-sm sm:text-base text-gray-600 dark:text-gray-400">
            {t('found')} <span className="font-bold text-primary-600 dark:text-primary-400">
              {filteredCampaigns.length}
            </span> {t('campaigns')}
          </div>
          <div className="flex items-center space-x-2">
            <button
              onClick={() => setViewMode('grid')}
              className={`p-2 rounded-lg ${viewMode === 'grid' ? 'bg-primary-100 dark:bg-primary-900/30 text-primary-600' : 'text-gray-400'}`}
              aria-label="Grid view"
            >
              <Grid size={18} className="sm:w-5 sm:h-5" />
            </button>
            <button
              onClick={() => setViewMode('list')}
              className={`p-2 rounded-lg ${viewMode === 'list' ? 'bg-primary-100 dark:bg-primary-900/30 text-primary-600' : 'text-gray-400'}`}
              aria-label="List view"
            >
              <List size={18} className="sm:w-5 sm:h-5" />
            </button>
          </div>
        </div>
      </div>

      {/* Campaigns Grid/List */}
      <div className={viewMode === 'grid' 
        ? 'grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6' 
        : 'space-y-6'
      }>
        {filteredCampaigns.map(campaign => (
          <CampaignCard 
            key={campaign.id} 
            campaign={campaign} 
            viewMode={viewMode}
          />
        ))}
      </div>

      {filteredCampaigns.length === 0 && (
        <div className="text-center py-16">
          <div className="text-6xl mb-4">🔍</div>
          <h3 className="text-2xl font-semibold mb-2">{t('noCampaignsFound')}</h3>
          <p className="text-gray-600 dark:text-gray-400">
            {t('tryDifferentSearch')}
          </p>
        </div>
      )}
    </div>
  )
}

export default Campaigns

