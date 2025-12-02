import { Link } from 'react-router-dom'
import { useLanguage } from '../context/LanguageContext'
import { Mail, Lock, User, Phone } from 'lucide-react'

const Register = () => {
  const { t } = useLanguage()

  return (
    <div className="max-w-md mx-auto px-4">
      <div className="text-center mb-6 sm:mb-8">
        <h1 className="text-2xl sm:text-3xl font-bold mb-2">{t('createAccount')}</h1>
        <p className="text-sm sm:text-base text-gray-600 dark:text-gray-400">
          {t('registerDescription')}
        </p>
      </div>

      <div className="card">
        <form className="space-y-6">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block mb-2 font-medium">{t('firstName')}</label>
              <div className="relative">
                <User className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
                <input
                  type="text"
                  className="input-field pl-10"
                  placeholder={t('firstNamePlaceholder')}
                />
              </div>
            </div>
            <div>
              <label className="block mb-2 font-medium">{t('lastName')}</label>
              <input
                type="text"
                className="input-field"
                placeholder={t('lastNamePlaceholder')}
              />
            </div>
          </div>

          <div>
            <label className="block mb-2 font-medium">{t('email')}</label>
            <div className="relative">
              <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
              <input
                type="email"
                className="input-field pl-10"
                placeholder={t('emailPlaceholder')}
              />
            </div>
          </div>

          <div>
            <label className="block mb-2 font-medium">{t('phoneNumber')}</label>
            <div className="relative">
              <Phone className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
              <input
                type="tel"
                className="input-field pl-10"
                placeholder={t('phonePlaceholder')}
              />
            </div>
          </div>

          <div>
            <label className="block mb-2 font-medium">{t('password')}</label>
            <div className="relative">
              <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
              <input
                type="password"
                className="input-field pl-10"
                placeholder="••••••••"
              />
            </div>
          </div>

          <div>
            <label className="block mb-2 font-medium">{t('confirmPassword')}</label>
            <div className="relative">
              <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
              <input
                type="password"
                className="input-field pl-10"
                placeholder="••••••••"
              />
            </div>
          </div>

          <label className="flex items-start">
            <input type="checkbox" className="w-4 h-4 text-primary-600 rounded mt-1" />
            <span className="ml-2 text-gray-600 dark:text-gray-400 text-sm">
              {t('agreeTermsRegister')}{' '}
              <a href="/terms" className="text-primary-600 dark:text-primary-400 hover:underline">
                {t('termsConditions')}
              </a>
            </span>
          </label>

          <button type="submit" className="btn-primary w-full">
            {t('createAccount')}
          </button>
        </form>

        <div className="mt-6 pt-6 border-t border-gray-200 dark:border-gray-700">
          <p className="text-center text-gray-600 dark:text-gray-400">
            {t('alreadyHaveAccount')}{' '}
            <Link to="/login" className="text-primary-600 dark:text-primary-400 hover:underline font-medium">
              {t('loginHere')}
            </Link>
          </p>
        </div>
      </div>
    </div>
  )
}

export default Register

