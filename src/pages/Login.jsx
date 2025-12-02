import { Link } from 'react-router-dom'
import { useLanguage } from '../context/LanguageContext'
import { Mail, Lock } from 'lucide-react'

const Login = () => {
  const { t } = useLanguage()

  return (
    <div className="max-w-md mx-auto px-4">
      <div className="text-center mb-6 sm:mb-8">
        <h1 className="text-2xl sm:text-3xl font-bold mb-2">{t('login')}</h1>
        <p className="text-sm sm:text-base text-gray-600 dark:text-gray-400">
          {t('loginDescription')}
        </p>
      </div>

      <div className="card">
        <form className="space-y-6">
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

          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2">
            <label className="flex items-center">
              <input type="checkbox" className="w-4 h-4 text-primary-600 rounded" />
              <span className="ml-2 text-sm sm:text-base text-gray-600 dark:text-gray-400">{t('rememberMe')}</span>
            </label>
            <a href="/forgot-password" className="text-sm sm:text-base text-primary-600 dark:text-primary-400 hover:underline">
              {t('forgotPassword')}
            </a>
          </div>

          <button type="submit" className="btn-primary w-full">
            {t('login')}
          </button>
        </form>

        <div className="mt-6 pt-6 border-t border-gray-200 dark:border-gray-700">
          <p className="text-center text-gray-600 dark:text-gray-400">
            {t('noAccount')}{' '}
            <Link to="/register" className="text-primary-600 dark:text-primary-400 hover:underline font-medium">
              {t('registerHere')}
            </Link>
          </p>
        </div>
      </div>
    </div>
  )
}

export default Login

