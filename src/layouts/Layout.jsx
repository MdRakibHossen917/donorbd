import { useState } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { useTheme } from '../context/ThemeContext'
import { useLanguage } from '../context/LanguageContext'
import { useDonation } from '../context/DonationContext'
import { 
  Home, Heart, Globe, Moon, Sun, Menu, X, 
  User, Bell, Search, LogOut, Shield
} from 'lucide-react'
import toast from 'react-hot-toast'

const Layout = ({ children }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const { isDark, toggleTheme } = useTheme()
  const { language, toggleLanguage, t } = useLanguage()
  const { cart } = useDonation()
  const location = useLocation()

  const navLinks = [
    { path: '/', label: t('home'), icon: <Home size={18} /> },
    { path: '/donate', label: t('donate'), icon: <Heart size={18} /> },
    { path: '/campaigns', label: t('campaigns'), icon: <Globe size={18} /> },
    { path: '/apply', label: t('applyForHelp'), icon: <Shield size={18} /> },
    { path: '/about', label: t('about'), icon: <User size={18} /> },
    { path: '/contact', label: t('contact'), icon: <Bell size={18} /> },
  ]

  const isActive = (path) => location.pathname === path

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      {/* Navigation */}
      <nav className="bg-white dark:bg-gray-800 shadow-lg sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16">
            <div className="flex items-center">
              <Link to="/" className="flex items-center space-x-2">
                <div className="w-8 h-8 sm:w-10 sm:h-10 bg-gradient-to-r from-primary-500 to-secondary-500 rounded-lg flex items-center justify-center">
                  <Heart className="text-white" size={20} />
                </div>
                <div className="hidden sm:block">
                  <h1 className="text-xl sm:text-2xl font-bold text-primary-600 dark:text-primary-400">
                    Donor<span className="text-secondary-500">BD</span>
                  </h1>
                  <p className="text-xs text-gray-500 dark:text-gray-400 -mt-1">
                    {t('tagline')}
                  </p>
                </div>
                <div className="sm:hidden">
                  <h1 className="text-lg font-bold text-primary-600 dark:text-primary-400">
                    Donor<span className="text-secondary-500">BD</span>
                  </h1>
                </div>
              </Link>
            </div>

            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center space-x-8">
              {navLinks.map((link) => (
                <Link
                  key={link.path}
                  to={link.path}
                  className={`flex items-center space-x-1 px-3 py-2 rounded-lg transition-all ${
                    isActive(link.path)
                      ? 'bg-primary-50 dark:bg-primary-900/30 text-primary-600 dark:text-primary-400'
                      : 'text-gray-600 dark:text-gray-300 hover:text-primary-600 dark:hover:text-primary-400'
                  }`}
                >
                  {link.icon}
                  <span>{link.label}</span>
                </Link>
              ))}
            </div>

            <div className="flex items-center space-x-2 sm:space-x-4">
              {/* Cart Badge */}
              <Link
                to="/donate"
                className="relative p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg"
                title={t('donate')}
              >
                <Heart size={18} className="sm:w-5 sm:h-5" />
                {cart.length > 0 && (
                  <span className="absolute -top-1 -right-1 bg-secondary-500 text-white text-xs w-4 h-4 sm:w-5 sm:h-5 rounded-full flex items-center justify-center text-[10px] sm:text-xs">
                    {cart.length}
                  </span>
                )}
              </Link>

              {/* Language Toggle */}
              <button
                onClick={toggleLanguage}
                className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg text-sm sm:text-base"
                title={language === 'en' ? 'Switch to Bangla' : 'ইংরেজিতে পরিবর্তন করুন'}
              >
                <span className="font-bold text-xs sm:text-sm">{language === 'en' ? 'বাংলা' : 'EN'}</span>
              </button>

              {/* Theme Toggle */}
              <button
                onClick={toggleTheme}
                className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg"
                title={isDark ? 'Light Mode' : 'Dark Mode'}
              >
                {isDark ? <Sun size={18} className="sm:w-5 sm:h-5" /> : <Moon size={18} className="sm:w-5 sm:h-5" />}
              </button>

              {/* User Menu */}
              <div className="relative hidden sm:block">
                <Link
                  to="/dashboard"
                  className="flex items-center space-x-2 p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg"
                >
                  <User size={18} className="sm:w-5 sm:h-5" />
                  <span className="hidden md:inline text-sm">{t('dashboard')}</span>
                </Link>
              </div>

              {/* Mobile Menu Button */}
              <button
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                className="sm:hidden p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg"
                aria-label="Menu"
              >
                {isMenuOpen ? <X size={20} /> : <Menu size={20} />}
              </button>
            </div>
          </div>

          {/* Mobile Menu */}
          {isMenuOpen && (
            <div className="md:hidden py-4 border-t border-gray-200 dark:border-gray-700">
              <div className="flex flex-col space-y-2">
                {navLinks.map((link) => (
                  <Link
                    key={link.path}
                    to={link.path}
                    onClick={() => setIsMenuOpen(false)}
                    className={`flex items-center space-x-2 px-4 py-3 rounded-lg ${
                      isActive(link.path)
                        ? 'bg-primary-50 dark:bg-primary-900/30 text-primary-600 dark:text-primary-400'
                        : 'text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700'
                    }`}
                  >
                    {link.icon}
                    <span>{link.label}</span>
                  </Link>
                ))}
              </div>
            </div>
          )}
        </div>
      </nav>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {children}
      </main>

      {/* Footer */}
      <footer className="bg-white dark:bg-gray-800 border-t border-gray-200 dark:border-gray-700 mt-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8">
            <div>
              <div className="flex items-center space-x-2 mb-4">
                <div className="w-8 h-8 bg-gradient-to-r from-primary-500 to-secondary-500 rounded-lg flex items-center justify-center">
                  <Heart className="text-white" size={18} />
                </div>
                <h2 className="text-xl font-bold text-primary-600 dark:text-primary-400">
                  Donor<span className="text-secondary-500">BD</span>
                </h2>
              </div>
              <p className="text-gray-600 dark:text-gray-400">
                {t('footerDescription')}
              </p>
            </div>

            <div>
              <h3 className="font-semibold text-lg mb-4">{t('quickLinks')}</h3>
              <ul className="space-y-2">
                {navLinks.map((link) => (
                  <li key={link.path}>
                    <Link
                      to={link.path}
                      className="text-gray-600 dark:text-gray-400 hover:text-primary-600 dark:hover:text-primary-400"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <h3 className="font-semibold text-lg mb-4">{t('contactUs')}</h3>
              <ul className="space-y-2 text-gray-600 dark:text-gray-400">
                <li>Email: mdrakibhossencse@gmail.com</li>
                <li>Phone: 01300981501</li>
                <li>Address: Dhaka, Bangladesh</li>
              </ul>
            </div>

            <div className="sm:col-span-2 lg:col-span-1">
              <h3 className="font-semibold text-lg mb-4">{t('newsletter')}</h3>
              <div className="space-y-3">
                <p className="text-gray-600 dark:text-gray-400 text-sm sm:text-base">
                  {t('newsletterDesc')}
                </p>
                <div className="flex flex-col sm:flex-row gap-2">
                  <input
                    type="email"
                    placeholder={t('emailPlaceholder')}
                    className="input-field sm:rounded-r-none flex-1"
                  />
                  <button className="btn-primary sm:rounded-l-none whitespace-nowrap">
                    {t('subscribe')}
                  </button>
                </div>
              </div>
            </div>
          </div>

          <div className="border-t border-gray-200 dark:border-gray-700 mt-6 sm:mt-8 pt-6 sm:pt-8 text-center text-gray-600 dark:text-gray-400">
            <p className="text-sm sm:text-base">© {new Date().getFullYear()} DonorBD. {t('allRightsReserved')}</p>
            <p className="mt-2 text-xs sm:text-sm break-words px-4">
              Registration No: S-12345 | NID: 123-456-789
            </p>
          </div>
        </div>
      </footer>
    </div>
  )
}

export default Layout

