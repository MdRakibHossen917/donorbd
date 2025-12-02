import { Link } from 'react-router-dom'
import { useLanguage } from '../context/LanguageContext'
import { iconMap } from '../data/mockData'

const CategoryCard = ({ category }) => {
  const { t } = useLanguage()
  const IconComponent = iconMap[category.iconName]

  return (
    <Link
      to={`/campaigns?category=${category.id}`}
      className="group card hover:shadow-xl transition-all duration-300 hover:-translate-y-1 cursor-pointer"
    >
      <div className="text-center">
        <div className="w-16 h-16 mx-auto mb-4 bg-gradient-to-br from-primary-500 to-secondary-500 rounded-2xl flex items-center justify-center text-white text-3xl group-hover:scale-110 transition-transform duration-300">
          {IconComponent && <IconComponent size={32} />}
        </div>
        <h3 className="text-xl font-semibold mb-2">{category.name}</h3>
        <p className="text-gray-600 dark:text-gray-400 text-sm">
          {t(category.id + 'Description')}
        </p>
        <div className="mt-4 text-primary-600 dark:text-primary-400 font-medium">
          {category.count} {t('campaigns')}
        </div>
      </div>
    </Link>
  )
}

export default CategoryCard

