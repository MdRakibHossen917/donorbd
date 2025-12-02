import { useState } from 'react'
import { Link } from 'react-router-dom'
import { useLanguage } from '../context/LanguageContext'
import { iconMap } from '../data/mockData'

const CategoryCard = ({ category }) => {
  const { t } = useLanguage()
  const IconComponent = iconMap[category.iconName]
  const [imageError, setImageError] = useState(false)

  // Background images for each category
  const categoryImages = {
    education: "https://images.unsplash.com/photo-1503676260728-1c00da094a0b?w=800&h=600&fit=crop&q=80",
    healthcare: "https://images.unsplash.com/photo-1576091160399-112ba8d25d1f?w=800&h=600&fit=crop&q=80",
    shelter: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=800&h=600&fit=crop&q=80",
    food: "https://images.unsplash.com/photo-1542838132-92c53300491e?w=800&h=600&fit=crop&q=80",
    orphan: "https://images.unsplash.com/photo-1503454537195-1dcabb73ffb9?w=800&h=600&fit=crop&q=80",
    emergency: "https://images.unsplash.com/photo-1582213782179-e0d53f98f2ca?w=800&h=600&fit=crop&q=80",
    livelihood: "https://images.unsplash.com/photo-1521737604893-d14cc237f11d?w=800&h=600&fit=crop&q=80",
    environment: "https://images.unsplash.com/photo-1441974231531-c6227db76b6e?w=800&h=600&fit=crop&q=80",
  }

  // Gradient overlays for each category
  const categoryGradients = {
    education: 'from-blue-600/90 via-primary-600/85 to-blue-500/90',
    healthcare: 'from-red-600/90 via-pink-600/85 to-red-500/90',
    shelter: 'from-amber-600/90 via-orange-600/85 to-amber-500/90',
    food: 'from-green-600/90 via-emerald-600/85 to-green-500/90',
    orphan: 'from-purple-600/90 via-indigo-600/85 to-purple-500/90',
    emergency: 'from-red-700/90 via-secondary-600/85 to-red-600/90',
    livelihood: 'from-teal-600/90 via-cyan-600/85 to-teal-500/90',
    environment: 'from-green-700/90 via-emerald-700/85 to-green-600/90',
  }

  const imageUrl = categoryImages[category.id] || categoryImages.education
  const gradient = categoryGradients[category.id] || categoryGradients.education

  return (
    <Link
      to={`/campaigns?category=${category.id}`}
      className="group relative block rounded overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-500 hover:-translate-y-2 cursor-pointer h-full"
    >
      {/* Background Image */}
      <div className="relative h-48 sm:h-56 overflow-hidden">
        {!imageError ? (
          <img 
            src={imageUrl} 
            alt={category.name}
            className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
            loading="lazy"
            onError={() => setImageError(true)}
          />
        ) : (
          <div className={`w-full h-full bg-gradient-to-br ${gradient}`}></div>
        )}
        {/* Gradient Overlay */}
        <div className={`absolute inset-0 bg-gradient-to-br ${gradient}`}></div>
        
        {/* Pattern Overlay */}
        <div className="absolute inset-0 opacity-10" style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='40' height='40' viewBox='0 0 40 40' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='%23ffffff' fill-opacity='0.4'%3E%3Cpath d='M20 20.5V18H0v-2h20v-2H0v-2h20v-2H0V8h20V6H0V4h20V2H0V0h22v20h2V0h2v20h2V0h2v20h2V0h2v22H20v-1.5zM0 20h2v20H0V20zm4 0h2v20H4V20zm4 0h2v20H8V20zm4 0h2v20h-2V20zm4 4h20v2H20v-2zm0 4h20v2H20v-2zm0 4h20v2H20v-2zm0 4h20v2H20v-2z'/%3E%3C/g%3E%3C/svg%3E")`,
        }}></div>

        {/* Icon */}
        <div className="absolute top-4 left-4">
          <div className="w-12 h-12 bg-white/20 backdrop-blur-md rounded flex items-center justify-center text-white shadow-lg group-hover:scale-110 group-hover:rotate-6 transition-all duration-300">
            {IconComponent && <IconComponent size={24} />}
          </div>
        </div>

        {/* Campaign Count Badge */}
        <div className="absolute top-4 right-4">
          <div className="px-3 py-1.5 bg-white/20 backdrop-blur-md rounded-full text-white text-sm font-semibold shadow-lg">
            {category.count} {t('campaigns')}
          </div>
        </div>
      </div>

      {/* Content Section */}
      <div className="relative bg-white dark:bg-gray-800 p-5 sm:p-6">
        <h3 className="text-xl font-bold mb-2 text-gray-900 dark:text-white group-hover:text-primary-600 dark:group-hover:text-primary-400 transition-colors duration-300">
          {category.name}
        </h3>
        <p className="text-gray-600 dark:text-gray-400 text-sm leading-relaxed mb-4 line-clamp-2">
          {t(category.id + 'Description') || `${category.name} support campaigns`}
        </p>
        
        {/* View More Link */}
        <div className="flex items-center text-primary-600 dark:text-primary-400 font-medium text-sm group-hover:gap-2 transition-all duration-300">
          <span>{t('viewAll')}</span>
          <svg 
            className="w-4 h-4 ml-1 group-hover:translate-x-1 transition-transform duration-300" 
            fill="none" 
            stroke="currentColor" 
            viewBox="0 0 24 24"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
          </svg>
        </div>
      </div>

      {/* Hover Effect Border */}
      <div className="absolute inset-0 border-2 border-primary-500/0 group-hover:border-primary-500/30 rounded transition-all duration-500 pointer-events-none"></div>
    </Link>
  )
}

export default CategoryCard

