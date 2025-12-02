import { useState } from 'react'
import { useDonation } from '../context/DonationContext'
import { useLanguage } from '../context/LanguageContext'
import { Heart, CreditCard, Building2, Users, AlertCircle } from 'lucide-react'
import { iconMap } from '../data/mockData'
import toast from 'react-hot-toast'

const Donate = () => {
  const { categories, addToCart, cart } = useDonation()
  const { t } = useLanguage()
  
  const [step, setStep] = useState(1)
  const [formData, setFormData] = useState({
    type: 'one-time',
    category: '',
    amount: '',
    customAmount: '',
    frequency: 'monthly',
    name: '',
    email: '',
    phone: '',
    message: '',
    anonymous: false
  })

  const presetAmounts = [500, 1000, 2000, 5000, 10000]

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }))
  }

  const handleCategorySelect = (categoryId) => {
    setFormData(prev => ({ ...prev, category: categoryId }))
  }

  const handleAmountSelect = (amount) => {
    setFormData(prev => ({ 
      ...prev, 
      amount: amount.toString(),
      customAmount: ''
    }))
  }

  const handleNext = () => {
    if (step === 1 && !formData.category) {
      toast.error(t('selectCategoryError'))
      return
    }
    if (step === 1 && !formData.amount && !formData.customAmount) {
      toast.error(t('selectAmountError'))
      return
    }
    setStep(step + 1)
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    
    const donationItem = {
      id: Date.now(),
      ...formData,
      amount: parseFloat(formData.customAmount || formData.amount),
      date: new Date().toISOString()
    }

    addToCart(donationItem)
    toast.success(t('donationAddedToCart'))
    
    // Reset form for next donation
    setFormData({
      type: 'one-time',
      category: '',
      amount: '',
      customAmount: '',
      frequency: 'monthly',
      name: '',
      email: '',
      phone: '',
      message: '',
      anonymous: false
    })
    setStep(1)
  }

  const selectedCategory = categories.find(c => c.id === formData.category)

  return (
    <div className="max-w-4xl mx-auto">
      <div className="text-center mb-8 sm:mb-12 px-4">
        <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-3 sm:mb-4">{t('makeDonation')}</h1>
        <p className="text-gray-600 dark:text-gray-300 text-sm sm:text-base md:text-lg">
          {t('donationDescription')}
        </p>
      </div>

      {/* Progress Steps */}
      <div className="flex items-center justify-between mb-8 sm:mb-12 px-4 overflow-x-auto">
        {[1, 2, 3].map((stepNum) => (
          <div key={stepNum} className="flex items-center">
            <div className={`w-10 h-10 rounded-full flex items-center justify-center ${
              step === stepNum 
                ? 'bg-primary-500 text-white' 
                : step > stepNum 
                  ? 'bg-green-500 text-white' 
                  : 'bg-gray-200 dark:bg-gray-700 text-gray-500'
            }`}>
              {stepNum}
            </div>
            <div className={`ml-2 ${stepNum === 3 ? 'hidden sm:block' : ''}`}>
              <div className="text-sm font-medium">
                {stepNum === 1 ? t('selectDonation') : 
                 stepNum === 2 ? t('yourDetails') : t('payment')}
              </div>
            </div>
            {stepNum < 3 && (
              <div className={`h-1 w-16 mx-4 ${
                step > stepNum ? 'bg-green-500' : 'bg-gray-200 dark:bg-gray-700'
              }`} />
            )}
          </div>
        ))}
      </div>

      <div className="card">
        <form onSubmit={handleSubmit}>
          {/* Step 1: Select Donation */}
          {step === 1 && (
            <div className="space-y-8">
              <div>
                <h3 className="text-xl font-semibold mb-4">{t('donationType')}</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <button
                    type="button"
                    onClick={() => setFormData(prev => ({ ...prev, type: 'one-time' }))}
                    className={`p-6 border-2 rounded-xl text-left transition-all ${
                      formData.type === 'one-time'
                        ? 'border-primary-500 bg-primary-50 dark:bg-primary-900/20'
                        : 'border-gray-200 dark:border-gray-700 hover:border-primary-300'
                    }`}
                  >
                    <CreditCard className="mb-3" size={32} />
                    <div className="font-semibold">{t('oneTimeDonation')}</div>
                    <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
                      {t('oneTimeDescription')}
                    </p>
                  </button>
                  
                  <button
                    type="button"
                    onClick={() => setFormData(prev => ({ ...prev, type: 'monthly' }))}
                    className={`p-6 border-2 rounded-xl text-left transition-all ${
                      formData.type === 'monthly'
                        ? 'border-primary-500 bg-primary-50 dark:bg-primary-900/20'
                        : 'border-gray-200 dark:border-gray-700 hover:border-primary-300'
                    }`}
                  >
                    <Building2 className="mb-3" size={32} />
                    <div className="font-semibold">{t('monthlyDonation')}</div>
                    <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
                      {t('monthlyDescription')}
                    </p>
                  </button>
                </div>
              </div>

              <div>
                <h3 className="text-lg sm:text-xl font-semibold mb-3 sm:mb-4">{t('selectCategory')}</h3>
                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3 sm:gap-4">
                  {categories.map((category) => {
                    const IconComponent = iconMap[category.iconName]
                    return (
                      <button
                        key={category.id}
                        type="button"
                        onClick={() => handleCategorySelect(category.id)}
                        className={`p-4 border rounded-lg text-center transition-all ${
                          formData.category === category.id
                            ? 'border-primary-500 bg-primary-50 dark:bg-primary-900/20'
                            : 'border-gray-200 dark:border-gray-700 hover:border-primary-300'
                        }`}
                      >
                        <div className="text-2xl mb-2 flex justify-center">
                          {IconComponent && <IconComponent size={24} />}
                        </div>
                        <div className="font-medium">{category.name}</div>
                      </button>
                    )
                  })}
                </div>
              </div>

              <div>
                <h3 className="text-lg sm:text-xl font-semibold mb-3 sm:mb-4">{t('selectAmount')}</h3>
                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-2 sm:gap-3 mb-4 sm:mb-6">
                  {presetAmounts.map((amount) => (
                    <button
                      key={amount}
                      type="button"
                      onClick={() => handleAmountSelect(amount)}
                      className={`py-3 border rounded-lg font-medium ${
                        formData.amount === amount.toString()
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
                    name="customAmount"
                    value={formData.customAmount}
                    onChange={handleInputChange}
                    placeholder={t('customAmountPlaceholder')}
                    className="input-field pl-10"
                    min="100"
                  />
                </div>
              </div>

              {formData.type === 'monthly' && (
                <div>
                  <h3 className="text-xl font-semibold mb-4">{t('donationFrequency')}</h3>
                  <select
                    name="frequency"
                    value={formData.frequency}
                    onChange={handleInputChange}
                    className="input-field"
                  >
                    <option value="monthly">{t('monthly')}</option>
                    <option value="quarterly">{t('quarterly')}</option>
                    <option value="yearly">{t('yearly')}</option>
                  </select>
                </div>
              )}

              <button
                type="button"
                onClick={handleNext}
                className="btn-primary w-full"
              >
                {t('continueToDetails')}
              </button>
            </div>
          )}

          {/* Step 2: Your Details */}
          {step === 2 && (
            <div className="space-y-6">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-xl font-semibold">{t('donationSummary')}</h3>
                <button
                  type="button"
                  onClick={() => setStep(1)}
                  className="text-primary-600 dark:text-primary-400 hover:underline"
                >
                  {t('edit')}
                </button>
              </div>

              {selectedCategory && (() => {
                const IconComponent = iconMap[selectedCategory.iconName]
                return (
                  <div className="bg-gray-50 dark:bg-gray-800 p-4 rounded-lg mb-6">
                    <div className="flex items-center">
                      <div className="text-2xl mr-3">
                        {IconComponent && <IconComponent size={24} />}
                      </div>
                      <div>
                        <div className="font-semibold">{selectedCategory.name}</div>
                        <div className="text-gray-600 dark:text-gray-400 text-sm">
                          {formData.type === 'one-time' ? t('oneTimeDonation') : t('monthlyDonation')}: 
                          ৳{(formData.customAmount || formData.amount).toLocaleString()}
                          {formData.type === 'monthly' && ` ${t('per')} ${formData.frequency}`}
                        </div>
                      </div>
                    </div>
                  </div>
                )
              })()}

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block mb-2 font-medium">{t('fullName')}</label>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    placeholder={t('namePlaceholder')}
                    className="input-field"
                    required
                  />
                </div>
                
                <div>
                  <label className="block mb-2 font-medium">{t('email')}</label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    placeholder={t('emailPlaceholder')}
                    className="input-field"
                    required
                  />
                </div>
                
                <div>
                  <label className="block mb-2 font-medium">{t('phoneNumber')}</label>
                  <input
                    type="tel"
                    name="phone"
                    value={formData.phone}
                    onChange={handleInputChange}
                    placeholder={t('phonePlaceholder')}
                    className="input-field"
                    required
                  />
                </div>
                
                <div className="md:col-span-2">
                  <label className="block mb-2 font-medium">{t('messageOptional')}</label>
                  <textarea
                    name="message"
                    value={formData.message}
                    onChange={handleInputChange}
                    placeholder={t('messagePlaceholder')}
                    className="input-field h-32"
                    rows="4"
                  />
                </div>
              </div>

              <div className="flex items-center">
                <input
                  type="checkbox"
                  id="anonymous"
                  name="anonymous"
                  checked={formData.anonymous}
                  onChange={handleInputChange}
                  className="w-4 h-4 text-primary-600 rounded focus:ring-primary-500"
                />
                <label htmlFor="anonymous" className="ml-2 text-gray-600 dark:text-gray-400">
                  {t('donateAnonymously')}
                </label>
              </div>

              <div className="flex gap-4">
                <button
                  type="button"
                  onClick={() => setStep(1)}
                  className="btn-outline flex-1"
                >
                  {t('back')}
                </button>
                <button
                  type="button"
                  onClick={handleNext}
                  className="btn-primary flex-1"
                >
                  {t('continueToPayment')}
                </button>
              </div>
            </div>
          )}

          {/* Step 3: Payment */}
          {step === 3 && (
            <div className="space-y-6">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-xl font-semibold">{t('paymentMethod')}</h3>
                <button
                  type="button"
                  onClick={() => setStep(2)}
                  className="text-primary-600 dark:text-primary-400 hover:underline"
                >
                  {t('editDetails')}
                </button>
              </div>

              <div className="bg-yellow-50 dark:bg-yellow-900/20 border border-yellow-200 dark:border-yellow-800 rounded-lg p-4 mb-6">
                <div className="flex">
                  <AlertCircle className="text-yellow-600 dark:text-yellow-400 mr-3 flex-shrink-0" />
                  <div className="text-sm">
                    <p className="font-medium text-yellow-800 dark:text-yellow-300 mb-1">
                      {t('demoNotice')}
                    </p>
                    <p className="text-yellow-700 dark:text-yellow-400">
                      {t('demoDescription')}
                    </p>
                  </div>
                </div>
              </div>

              <div className="space-y-4">
                {['bkash', 'nagad', 'rocket', 'card'].map((method) => (
                  <label key={method} className="flex items-center p-4 border rounded-lg cursor-pointer hover:border-primary-500">
                    <input
                      type="radio"
                      name="paymentMethod"
                      value={method}
                      onChange={handleInputChange}
                      className="w-4 h-4 text-primary-600"
                      defaultChecked={method === 'bkash'}
                    />
                    <div className="ml-3 flex items-center">
                      <div className="w-8 h-8 bg-gray-100 dark:bg-gray-700 rounded flex items-center justify-center mr-3">
                        <CreditCard size={18} />
                      </div>
                      <div>
                        <div className="font-medium capitalize">{method}</div>
                        <div className="text-sm text-gray-600 dark:text-gray-400">
                          {t(`${method}Description`)}
                        </div>
                      </div>
                    </div>
                  </label>
                ))}
              </div>

              <div className="bg-gray-50 dark:bg-gray-800 p-6 rounded-lg">
                <h4 className="font-semibold mb-4">{t('donationSummary')}</h4>
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span>{t('donationAmount')}:</span>
                    <span className="font-medium">
                      ৳{(formData.customAmount || formData.amount).toLocaleString()}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span>{t('processingFee')}:</span>
                    <span className="font-medium">৳0</span>
                  </div>
                  <div className="border-t pt-2 mt-2">
                    <div className="flex justify-between text-lg font-bold">
                      <span>{t('total')}:</span>
                      <span className="text-primary-600 dark:text-primary-400">
                        ৳{(formData.customAmount || formData.amount).toLocaleString()}
                      </span>
                    </div>
                  </div>
                </div>
              </div>

              <div className="flex gap-4">
                <button
                  type="button"
                  onClick={() => setStep(2)}
                  className="btn-outline flex-1"
                >
                  {t('back')}
                </button>
                <button
                  type="submit"
                  className="btn-primary flex-1"
                >
                  {t('completeDonation')}
                </button>
              </div>
            </div>
          )}
        </form>
      </div>

      {/* Cart Summary */}
      {cart.length > 0 && (
        <div className="mt-8 card">
          <h3 className="text-xl font-semibold mb-4">{t('donationCart')}</h3>
          <div className="space-y-3">
            {cart.map((item) => (
              <div key={item.id} className="flex items-center justify-between p-3 bg-gray-50 dark:bg-gray-800 rounded-lg">
                <div>
                  <div className="font-medium">
                    {categories.find(c => c.id === item.category)?.name}
                  </div>
                  <div className="text-sm text-gray-600 dark:text-gray-400">
                    ৳{item.amount.toLocaleString()} • {item.type === 'one-time' ? t('oneTime') : t('monthly')}
                  </div>
                </div>
                <div className="text-primary-600 dark:text-primary-400 font-medium">
                  ৳{item.amount.toLocaleString()}
                </div>
              </div>
            ))}
          </div>
          <div className="mt-6 pt-6 border-t border-gray-200 dark:border-gray-700">
            <div className="flex justify-between items-center">
              <div className="text-lg font-bold">{t('cartTotal')}:</div>
              <div className="text-2xl font-bold text-primary-600 dark:text-primary-400">
                ৳{cart.reduce((sum, item) => sum + item.amount, 0).toLocaleString()}
              </div>
            </div>
            <button className="btn-secondary w-full mt-4">
              {t('checkoutNow')}
            </button>
          </div>
        </div>
      )}
    </div>
  )
}

export default Donate

