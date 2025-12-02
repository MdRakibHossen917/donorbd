import { useState } from 'react'
import { useDonation } from '../context/DonationContext'
import { useLanguage } from '../context/LanguageContext'
import { 
  Heart, Download, Calendar, DollarSign, 
  BarChart, User, Settings, Bell, 
  TrendingUp, Target, Clock, CheckCircle 
} from 'lucide-react'

const Dashboard = () => {
  const { donations, campaigns } = useDonation()
  const { t } = useLanguage()
  
  const [activeTab, setActiveTab] = useState('overview')
  
  const totalDonated = donations.reduce((sum, d) => sum + d.amount, 0)
  const monthlyDonations = donations.filter(d => d.type === 'monthly')
  const recentDonations = donations.slice(-5).reverse()

  const stats = [
    { 
      icon: <DollarSign />, 
      value: `৳${totalDonated.toLocaleString()}`, 
      label: t('totalDonated'),
      change: '+12%'
    },
    { 
      icon: <Heart />, 
      value: donations.length, 
      label: t('totalDonations'),
      change: '+5%'
    },
    { 
      icon: <Calendar />, 
      value: monthlyDonations.length, 
      label: t('monthlyDonations'),
      change: '+8%'
    },
    { 
      icon: <Target />, 
      value: '4', 
      label: t('campaignsSupported'),
      change: '+2'
    },
  ]

  const tabs = [
    { id: 'overview', label: t('overview'), icon: <BarChart size={18} /> },
    { id: 'donations', label: t('donations'), icon: <Heart size={18} /> },
    { id: 'profile', label: t('profile'), icon: <User size={18} /> },
    { id: 'settings', label: t('settings'), icon: <Settings size={18} /> },
  ]

  return (
    <div className="space-y-4 sm:space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3 sm:gap-0">
        <h1 className="text-2xl sm:text-3xl font-bold">{t('dashboard')}</h1>
        <button className="btn-outline text-sm sm:text-base w-full sm:w-auto">
          <Bell size={16} className="mr-2 sm:w-[18px] sm:h-[18px]" />
          {t('notifications')}
        </button>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
        {stats.map((stat, index) => (
          <div key={index} className="card">
            <div className="flex justify-between items-start">
              <div className="p-2 bg-primary-100 dark:bg-primary-900/30 rounded-lg">
                {stat.icon}
              </div>
              <span className="text-green-600 dark:text-green-400 text-sm font-medium">
                {stat.change} <TrendingUp size={14} className="inline" />
              </span>
            </div>
            <div className="mt-4">
              <div className="text-2xl font-bold">{stat.value}</div>
              <div className="text-gray-600 dark:text-gray-400">{stat.label}</div>
            </div>
          </div>
        ))}
      </div>

      {/* Main Content */}
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-4 sm:gap-6">
        {/* Sidebar */}
        <div className="lg:col-span-1 order-2 lg:order-1">
          <div className="card space-y-2">
            {tabs.map(tab => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`w-full flex items-center space-x-3 px-4 py-3 rounded-lg transition-all ${
                  activeTab === tab.id
                    ? 'bg-primary-50 dark:bg-primary-900/30 text-primary-600 dark:text-primary-400'
                    : 'text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700'
                }`}
              >
                {tab.icon}
                <span>{tab.label}</span>
              </button>
            ))}
          </div>

          {/* Quick Stats */}
          <div className="card mt-6">
            <h3 className="font-semibold mb-4">{t('quickStats')}</h3>
            <div className="space-y-4">
              <div>
                <div className="flex justify-between text-sm mb-1">
                  <span>{t('thisMonth')}</span>
                  <span className="font-medium">৳12,500</span>
                </div>
                <div className="progress-bar">
                  <div className="progress-fill" style={{ width: '75%' }} />
                </div>
              </div>
              <div>
                <div className="flex justify-between text-sm mb-1">
                  <span>{t('lastMonth')}</span>
                  <span className="font-medium">৳15,000</span>
                </div>
                <div className="progress-bar">
                  <div className="progress-fill" style={{ width: '90%' }} />
                </div>
              </div>
              <div>
                <div className="flex justify-between text-sm mb-1">
                  <span>{t('yearToDate')}</span>
                  <span className="font-medium">৳1,25,000</span>
                </div>
                <div className="progress-bar">
                  <div className="progress-fill" style={{ width: '60%' }} />
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Main Content Area */}
        <div className="lg:col-span-3 order-1 lg:order-2">
          {/* Overview Tab */}
          {activeTab === 'overview' && (
            <div className="space-y-6">
              <div className="card">
                <h2 className="text-xl font-semibold mb-6">{t('recentDonations')}</h2>
                <div className="space-y-4">
                  {recentDonations.length > 0 ? (
                    recentDonations.map(donation => (
                      <div key={donation.id} className="flex items-center justify-between p-4 border border-gray-100 dark:border-gray-700 rounded-lg">
                        <div className="flex items-center space-x-4">
                          <div className="p-2 bg-primary-100 dark:bg-primary-900/30 rounded-lg">
                            <Heart size={20} />
                          </div>
                          <div>
                            <div className="font-medium">
                              {donation.category || t('generalDonation')}
                            </div>
                            <div className="text-sm text-gray-600 dark:text-gray-400">
                              {new Date(donation.date).toLocaleDateString()} • {donation.type}
                            </div>
                          </div>
                        </div>
                        <div className="text-right">
                          <div className="font-bold text-lg">৳{donation.amount.toLocaleString()}</div>
                          <div className="text-sm text-gray-600 dark:text-gray-400 flex items-center">
                            <CheckCircle size={14} className="mr-1" /> {t('completed')}
                          </div>
                        </div>
                      </div>
                    ))
                  ) : (
                    <div className="text-center py-8">
                      <Heart className="mx-auto text-gray-400 mb-3" size={48} />
                      <p className="text-gray-600 dark:text-gray-400">{t('noDonationsYet')}</p>
                      <a href="/donate" className="btn-primary inline-block mt-4">
                        {t('makeFirstDonation')}
                      </a>
                    </div>
                  )}
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Upcoming Payments */}
                <div className="card">
                  <h2 className="text-xl font-semibold mb-6">{t('upcomingPayments')}</h2>
                  <div className="space-y-3">
                    {monthlyDonations.map((donation, index) => (
                      <div key={index} className="flex items-center justify-between p-3 bg-gray-50 dark:bg-gray-800 rounded-lg">
                        <div>
                          <div className="font-medium">{donation.category || t('generalDonation')}</div>
                          <div className="text-sm text-gray-600 dark:text-gray-400">
                            <Clock size={12} className="inline mr-1" />
                            {t('nextPayment')}: 15th
                          </div>
                        </div>
                        <div className="font-bold">৳{donation.amount.toLocaleString()}</div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Impact Summary */}
                <div className="card">
                  <h2 className="text-xl font-semibold mb-6">{t('yourImpact')}</h2>
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center">
                        <div className="w-8 h-8 bg-green-100 dark:bg-green-900/30 rounded-lg flex items-center justify-center mr-3">
                          <Target size={16} className="text-green-600 dark:text-green-400" />
                        </div>
                        <div>
                          <div className="font-medium">{t('livesImpacted')}</div>
                          <div className="text-sm text-gray-600 dark:text-gray-400">
                            {Math.floor(totalDonated / 5000)} {t('people')}
                          </div>
                        </div>
                      </div>
                      <div className="text-2xl font-bold text-green-600 dark:text-green-400">
                        {Math.floor(totalDonated / 5000)}
                      </div>
                    </div>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center">
                        <div className="w-8 h-8 bg-blue-100 dark:bg-blue-900/30 rounded-lg flex items-center justify-center mr-3">
                          <Calendar size={16} className="text-blue-600 dark:text-blue-400" />
                        </div>
                        <div>
                          <div className="font-medium">{t('donationStreak')}</div>
                          <div className="text-sm text-gray-600 dark:text-gray-400">
                            {t('currentStreak')}
                          </div>
                        </div>
                      </div>
                      <div className="text-2xl font-bold text-blue-600 dark:text-blue-400">
                        45 {t('days')}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Donations Tab */}
          {activeTab === 'donations' && (
            <div className="card">
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-xl font-semibold">{t('donationHistory')}</h2>
                <button className="btn-outline">
                  <Download size={18} className="mr-2" />
                  {t('export')}
                </button>
              </div>
              
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b border-gray-200 dark:border-gray-700">
                      <th className="text-left py-3 px-4">{t('date')}</th>
                      <th className="text-left py-3 px-4">{t('category')}</th>
                      <th className="text-left py-3 px-4">{t('amount')}</th>
                      <th className="text-left py-3 px-4">{t('type')}</th>
                      <th className="text-left py-3 px-4">{t('status')}</th>
                      <th className="text-left py-3 px-4">{t('receipt')}</th>
                    </tr>
                  </thead>
                  <tbody>
                    {donations.map(donation => (
                      <tr key={donation.id} className="border-b border-gray-100 dark:border-gray-800 hover:bg-gray-50 dark:hover:bg-gray-800">
                        <td className="py-3 px-4">
                          {new Date(donation.date).toLocaleDateString()}
                        </td>
                        <td className="py-3 px-4">
                          {donation.category || t('general')}
                        </td>
                        <td className="py-3 px-4 font-medium">
                          ৳{donation.amount.toLocaleString()}
                        </td>
                        <td className="py-3 px-4">
                          <span className={`px-2 py-1 rounded-full text-xs ${
                            donation.type === 'one-time'
                              ? 'bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400'
                              : 'bg-green-100 dark:bg-green-900/30 text-green-600 dark:text-green-400'
                          }`}>
                            {donation.type === 'one-time' ? t('oneTime') : t('monthly')}
                          </span>
                        </td>
                        <td className="py-3 px-4">
                          <span className="px-2 py-1 bg-green-100 dark:bg-green-900/30 text-green-600 dark:text-green-400 rounded-full text-xs">
                            {t('completed')}
                          </span>
                        </td>
                        <td className="py-3 px-4">
                          <button className="text-primary-600 dark:text-primary-400 hover:underline text-sm">
                            {t('download')}
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {/* Profile Tab */}
          {activeTab === 'profile' && (
            <div className="card">
              <h2 className="text-xl font-semibold mb-6">{t('profileSettings')}</h2>
              <div className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block mb-2 font-medium">{t('fullName')}</label>
                    <input
                      type="text"
                      defaultValue="Rahim Ahmed"
                      className="input-field"
                    />
                  </div>
                  <div>
                    <label className="block mb-2 font-medium">{t('email')}</label>
                    <input
                      type="email"
                      defaultValue="rahim@example.com"
                      className="input-field"
                    />
                  </div>
                  <div>
                    <label className="block mb-2 font-medium">{t('phoneNumber')}</label>
                    <input
                      type="tel"
                      defaultValue="+8801712345678"
                      className="input-field"
                    />
                  </div>
                  <div>
                    <label className="block mb-2 font-medium">{t('address')}</label>
                    <input
                      type="text"
                      defaultValue="123/A, Dhanmondi, Dhaka"
                      className="input-field"
                    />
                  </div>
                </div>
                <div>
                  <label className="block mb-2 font-medium">{t('bio')}</label>
                  <textarea
                    className="input-field h-32"
                    defaultValue="Regular donor passionate about education and healthcare initiatives in Bangladesh."
                    rows="4"
                  />
                </div>
                <button className="btn-primary">
                  {t('updateProfile')}
                </button>
              </div>
            </div>
          )}

          {/* Settings Tab */}
          {activeTab === 'settings' && (
            <div className="card space-y-6">
              <div>
                <h2 className="text-xl font-semibold mb-4">{t('notificationSettings')}</h2>
                <div className="space-y-3">
                  {['donationReceipts', 'campaignUpdates', 'monthlyReports', 'promotionalEmails'].map((setting) => (
                    <div key={setting} className="flex items-center justify-between">
                      <div>
                        <div className="font-medium">{t(setting)}</div>
                        <div className="text-sm text-gray-600 dark:text-gray-400">
                          {t(`${setting}Desc`)}
                        </div>
                      </div>
                      <label className="relative inline-flex items-center cursor-pointer">
                        <input type="checkbox" className="sr-only peer" defaultChecked />
                        <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary-600"></div>
                      </label>
                    </div>
                  ))}
                </div>
              </div>

              <div>
                <h2 className="text-xl font-semibold mb-4">{t('paymentMethods')}</h2>
                <div className="space-y-3">
                  <div className="flex items-center justify-between p-4 border border-gray-200 dark:border-gray-700 rounded-lg">
                    <div className="flex items-center">
                      <div className="w-10 h-10 bg-gray-100 dark:bg-gray-700 rounded-lg flex items-center justify-center mr-3">
                        <DollarSign size={20} />
                      </div>
                      <div>
                        <div className="font-medium">bKash</div>
                        <div className="text-sm text-gray-600 dark:text-gray-400">
                          **** **** 1234
                        </div>
                      </div>
                    </div>
                    <div className="text-sm text-gray-600 dark:text-gray-400">
                      {t('primary')}
                    </div>
                  </div>
                  <button className="btn-outline w-full">
                    {t('addPaymentMethod')}
                  </button>
                </div>
              </div>

              <div>
                <h2 className="text-xl font-semibold mb-4 text-red-600 dark:text-red-400">
                  {t('dangerZone')}
                </h2>
                <button className="w-full p-4 border border-red-300 dark:border-red-700 text-red-600 dark:text-red-400 rounded-lg hover:bg-red-50 dark:hover:bg-red-900/20 transition-all">
                  {t('deleteAccount')}
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export default Dashboard

