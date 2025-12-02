import { useState } from 'react'
import { useDonation } from '../context/DonationContext'
import { useLanguage } from '../context/LanguageContext'
import {
  Users, DollarSign, TrendingUp, AlertTriangle,
  CheckCircle, XCircle, MoreVertical, Download,
  Filter, Search, BarChart, Eye
} from 'lucide-react'

const Admin = () => {
  const { donations, campaigns } = useDonation()
  const { t } = useLanguage()
  
  const [activeTab, setActiveTab] = useState('overview')
  const [applications, setApplications] = useState([
    { id: 1, name: 'Rahim Ahmed', category: 'Education', amount: 50000, status: 'pending', date: '2024-01-15' },
    { id: 2, name: 'Fatima Begum', category: 'Healthcare', amount: 75000, status: 'approved', date: '2024-01-14' },
    { id: 3, name: 'Karim Uddin', category: 'Emergency', amount: 100000, status: 'rejected', date: '2024-01-13' },
    { id: 4, name: 'Sadia Islam', category: 'Food', amount: 30000, status: 'pending', date: '2024-01-12' },
  ])

  const totalRevenue = donations.reduce((sum, d) => sum + d.amount, 0)
  const pendingApplications = applications.filter(a => a.status === 'pending').length
  const activeCampaigns = campaigns.length

  const stats = [
    { icon: <DollarSign />, value: `৳${totalRevenue.toLocaleString()}`, label: t('totalRevenue'), change: '+15%' },
    { icon: <Users />, value: donations.length, label: t('totalDonors'), change: '+8%' },
    { icon: <AlertTriangle />, value: pendingApplications, label: t('pendingApplications'), change: '+3' },
    { icon: <TrendingUp />, value: activeCampaigns, label: t('activeCampaigns'), change: '+2' },
  ]

  const handleApplicationAction = (id, action) => {
    setApplications(prev => prev.map(app =>
      app.id === id ? { ...app, status: action } : app
    ))
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold">{t('adminPanel')}</h1>
        <p className="text-gray-600 dark:text-gray-400">{t('adminDescription')}</p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, index) => (
          <div key={index} className="card">
            <div className="flex justify-between items-start">
              <div className="p-2 bg-primary-100 dark:bg-primary-900/30 rounded-lg">
                {stat.icon}
              </div>
              <span className="text-green-600 dark:text-green-400 text-sm font-medium">
                {stat.change}
              </span>
            </div>
            <div className="mt-4">
              <div className="text-2xl font-bold">{stat.value}</div>
              <div className="text-gray-600 dark:text-gray-400">{stat.label}</div>
            </div>
          </div>
        ))}
      </div>

      {/* Tabs */}
      <div className="border-b border-gray-200 dark:border-gray-700">
        <div className="flex space-x-8">
          {['overview', 'applications', 'donations', 'campaigns', 'users'].map(tab => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`py-3 px-1 border-b-2 font-medium transition-all ${
                activeTab === tab
                  ? 'border-primary-500 text-primary-600 dark:text-primary-400'
                  : 'border-transparent text-gray-500 hover:text-gray-700 dark:hover:text-gray-300'
              }`}
            >
              {t(tab)}
            </button>
          ))}
        </div>
      </div>

      {/* Tab Content */}
      {activeTab === 'overview' && (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Recent Donations */}
          <div className="lg:col-span-2 card">
            <h2 className="text-xl font-semibold mb-4">{t('recentDonations')}</h2>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-gray-200 dark:border-gray-700">
                    <th className="text-left py-3 px-4">{t('donor')}</th>
                    <th className="text-left py-3 px-4">{t('amount')}</th>
                    <th className="text-left py-3 px-4">{t('category')}</th>
                    <th className="text-left py-3 px-4">{t('date')}</th>
                  </tr>
                </thead>
                <tbody>
                  {donations.slice(-5).reverse().map(donation => (
                    <tr key={donation.id} className="border-b border-gray-100 dark:border-gray-800">
                      <td className="py-3 px-4">
                        {donation.name || t('anonymous')}
                      </td>
                      <td className="py-3 px-4 font-medium">
                        ৳{donation.amount.toLocaleString()}
                      </td>
                      <td className="py-3 px-4">
                        {donation.category || t('general')}
                      </td>
                      <td className="py-3 px-4">
                        {new Date(donation.date).toLocaleDateString()}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* Quick Actions */}
          <div className="card">
            <h2 className="text-xl font-semibold mb-4">{t('quickActions')}</h2>
            <div className="space-y-3">
              <button className="btn-primary w-full">
                {t('createCampaign')}
              </button>
              <button className="btn-outline w-full">
                {t('viewReports')}
              </button>
              <button className="btn-outline w-full">
                {t('sendNewsletter')}
              </button>
              <button className="btn-outline w-full">
                <Download size={18} className="mr-2 inline" />
                {t('exportData')}
              </button>
            </div>
          </div>
        </div>
      )}

      {activeTab === 'applications' && (
        <div className="card">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-xl font-semibold">{t('applications')}</h2>
            <div className="flex space-x-3">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
                <input
                  type="text"
                  placeholder={t('searchApplications')}
                  className="input-field pl-10"
                />
              </div>
              <select className="input-field">
                <option value="all">{t('allStatus')}</option>
                <option value="pending">{t('pending')}</option>
                <option value="approved">{t('approved')}</option>
                <option value="rejected">{t('rejected')}</option>
              </select>
            </div>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-gray-200 dark:border-gray-700">
                  <th className="text-left py-3 px-4">{t('applicant')}</th>
                  <th className="text-left py-3 px-4">{t('category')}</th>
                  <th className="text-left py-3 px-4">{t('amount')}</th>
                  <th className="text-left py-3 px-4">{t('date')}</th>
                  <th className="text-left py-3 px-4">{t('status')}</th>
                  <th className="text-left py-3 px-4">{t('actions')}</th>
                </tr>
              </thead>
              <tbody>
                {applications.map(app => (
                  <tr key={app.id} className="border-b border-gray-100 dark:border-gray-800 hover:bg-gray-50 dark:hover:bg-gray-800">
                    <td className="py-3 px-4">
                      <div className="font-medium">{app.name}</div>
                      <div className="text-sm text-gray-600 dark:text-gray-400">
                        ID: {app.id}
                      </div>
                    </td>
                    <td className="py-3 px-4">{app.category}</td>
                    <td className="py-3 px-4 font-medium">
                      ৳{app.amount.toLocaleString()}
                    </td>
                    <td className="py-3 px-4">{app.date}</td>
                    <td className="py-3 px-4">
                      <span className={`px-2 py-1 rounded-full text-xs ${
                        app.status === 'pending'
                          ? 'bg-yellow-100 dark:bg-yellow-900/30 text-yellow-600 dark:text-yellow-400'
                          : app.status === 'approved'
                          ? 'bg-green-100 dark:bg-green-900/30 text-green-600 dark:text-green-400'
                          : 'bg-red-100 dark:bg-red-900/30 text-red-600 dark:text-red-400'
                      }`}>
                        {t(app.status)}
                      </span>
                    </td>
                    <td className="py-3 px-4">
                      <div className="flex space-x-2">
                        <button
                          onClick={() => handleApplicationAction(app.id, 'approved')}
                          className="p-1 text-green-600 hover:bg-green-50 dark:hover:bg-green-900/20 rounded"
                          title={t('approve')}
                        >
                          <CheckCircle size={18} />
                        </button>
                        <button
                          onClick={() => handleApplicationAction(app.id, 'rejected')}
                          className="p-1 text-red-600 hover:bg-red-50 dark:hover:bg-red-900/20 rounded"
                          title={t('reject')}
                        >
                          <XCircle size={18} />
                        </button>
                        <button
                          className="p-1 text-gray-600 hover:bg-gray-100 dark:hover:bg-gray-700 rounded"
                          title={t('view')}
                        >
                          <Eye size={18} />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {activeTab === 'donations' && (
        <div className="card">
          <h2 className="text-xl font-semibold mb-6">{t('donationManagement')}</h2>
          <div className="space-y-4">
            {donations.map(donation => (
              <div key={donation.id} className="flex items-center justify-between p-4 border border-gray-200 dark:border-gray-700 rounded-lg">
                <div>
                  <div className="font-medium">
                    {donation.name || t('anonymous')}
                  </div>
                  <div className="text-sm text-gray-600 dark:text-gray-400">
                    {new Date(donation.date).toLocaleDateString()} • {donation.category || t('general')}
                  </div>
                </div>
                <div className="text-right">
                  <div className="font-bold text-lg">৳{donation.amount.toLocaleString()}</div>
                  <div className="text-sm text-gray-600 dark:text-gray-400">
                    {donation.type} • {t('completed')}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {activeTab === 'campaigns' && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {campaigns.map(campaign => (
            <div key={campaign.id} className="card">
              <div className="flex justify-between items-start mb-4">
                <h3 className="font-semibold text-lg">{campaign.title}</h3>
                <button className="p-1 hover:bg-gray-100 dark:hover:bg-gray-700 rounded">
                  <MoreVertical size={20} />
                </button>
              </div>
              <div className="mb-4">
                <div className="flex justify-between text-sm mb-1">
                  <span>{t('raised')}: ৳{campaign.raised.toLocaleString()}</span>
                  <span>{Math.round((campaign.raised / campaign.target) * 100)}%</span>
                </div>
                <div className="progress-bar">
                  <div 
                    className="progress-fill" 
                    style={{ width: `${(campaign.raised / campaign.target) * 100}%` }}
                  />
                </div>
              </div>
              <div className="text-sm text-gray-600 dark:text-gray-400">
                {campaign.description.slice(0, 100)}...
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}

export default Admin

