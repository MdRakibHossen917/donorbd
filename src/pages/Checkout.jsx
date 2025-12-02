import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useDonation } from '../context/DonationContext'
import { useLanguage } from '../context/LanguageContext'
import { CreditCard, AlertCircle, CheckCircle, ArrowLeft, Trash2 } from 'lucide-react'
import { iconMap } from '../data/mockData'
import toast from 'react-hot-toast'

const Checkout = () => {
  const navigate = useNavigate()
  const { cart, categories, processMultipleDonations, removeFromCart } = useDonation()
  const { t } = useLanguage()
  
  const [paymentMethod, setPaymentMethod] = useState('bkash')
  const [paymentData, setPaymentData] = useState({
    name: '',
    email: '',
    phone: '',
    transactionId: ''
  })
  const [isProcessing, setIsProcessing] = useState(false)

  const totalAmount = cart.reduce((sum, item) => sum + item.amount, 0)

  const handleInputChange = (e) => {
    const { name, value } = e.target
    setPaymentData(prev => ({
      ...prev,
      [name]: value
    }))
  }

  const handleRemoveItem = (id) => {
    removeFromCart(id)
    toast.success(t('itemRemovedFromCart') || 'Item removed from cart')
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    
    if (cart.length === 0) {
      toast.error(t('cartEmpty') || 'Your cart is empty')
      return
    }

    if (!paymentData.name || !paymentData.email || !paymentData.phone) {
      toast.error(t('fillAllFields') || 'Please fill all required fields')
      return
    }

    setIsProcessing(true)

    try {
      // Prepare all donations with payment information
      const donationsToProcess = cart.map((item) => ({
        ...item,
        paymentMethod,
        transactionId: paymentData.transactionId,
        donorName: paymentData.name,
        donorEmail: paymentData.email,
        donorPhone: paymentData.phone
      }))

      // Process all donations at once
      processMultipleDonations(donationsToProcess)
      
      toast.success(t('paymentSuccessful') || 'Payment successful! Thank you for your donation.')
      
      // Navigate to home after a short delay
      setTimeout(() => {
        navigate('/')
      }, 2000)
    } catch (error) {
      toast.error(t('paymentFailed') || 'Payment failed. Please try again.')
      setIsProcessing(false)
    }
  }

  if (cart.length === 0) {
    return (
      <div className="max-w-4xl mx-auto text-center py-12">
        <div className="card">
          <AlertCircle className="mx-auto mb-4 text-gray-400" size={48} />
          <h2 className="text-2xl font-bold mb-4">{t('cartEmpty') || 'Your cart is empty'}</h2>
          <p className="text-gray-600 dark:text-gray-400 mb-6">
            {t('addItemsToCart') || 'Add items to your cart to proceed with checkout'}
          </p>
          <button
            onClick={() => navigate('/donate')}
            className="btn-primary"
          >
            {t('browseDonations') || 'Browse Donations'}
          </button>
        </div>
      </div>
    )
  }

  return (
    <div className="max-w-4xl mx-auto">
      <div className="mb-6">
        <button
          onClick={() => navigate('/donate')}
          className="flex items-center text-primary-600 dark:text-primary-400 hover:underline mb-4"
        >
          <ArrowLeft size={18} className="mr-2" />
          {t('backToDonate') || 'Back to Donate'}
        </button>
        <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-2">{t('checkout') || 'Checkout'}</h1>
        <p className="text-gray-600 dark:text-gray-300">
          {t('reviewAndComplete') || 'Review your donations and complete your payment'}
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Order Summary */}
        <div className="lg:col-span-2 space-y-6">
          <div className="card">
            <h2 className="text-xl font-semibold mb-4">{t('orderSummary') || 'Order Summary'}</h2>
            <div className="space-y-4">
              {cart.map((item) => {
                const category = categories.find(c => c.id === item.category)
                const IconComponent = category ? iconMap[category.iconName] : null
                return (
                  <div key={item.id} className="flex items-start justify-between p-4 bg-gray-50 dark:bg-gray-800 rounded-lg">
                    <div className="flex items-start flex-1">
                      {IconComponent && (
                        <div className="text-2xl mr-3 mt-1">
                          <IconComponent size={24} />
                        </div>
                      )}
                      <div className="flex-1">
                        <div className="font-semibold">{category?.name || t('donation')}</div>
                        <div className="text-sm text-gray-600 dark:text-gray-400 mt-1">
                          {item.type === 'one-time' ? t('oneTime') : t('monthly')}
                          {item.message && (
                            <div className="mt-1 italic">"{item.message}"</div>
                          )}
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center gap-4">
                      <div className="text-right">
                        <div className="font-bold text-primary-600 dark:text-primary-400">
                          ৳{item.amount.toLocaleString()}
                        </div>
                      </div>
                      <button
                        onClick={() => handleRemoveItem(item.id)}
                        className="text-red-500 hover:text-red-700 p-1"
                        title={t('remove') || 'Remove'}
                      >
                        <Trash2 size={18} />
                      </button>
                    </div>
                  </div>
                )
              })}
            </div>
          </div>

          {/* Payment Information */}
          <div className="card">
            <h2 className="text-xl font-semibold mb-4">{t('paymentInformation') || 'Payment Information'}</h2>
            
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

            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Payment Method */}
              <div>
                <label className="block mb-3 font-medium">{t('paymentMethod')}</label>
                <div className="space-y-3">
                  {['bkash', 'nagad', 'rocket', 'card'].map((method) => (
                    <label key={method} className="flex items-center p-4 border rounded-lg cursor-pointer hover:border-primary-500">
                      <input
                        type="radio"
                        name="paymentMethod"
                        value={method}
                        checked={paymentMethod === method}
                        onChange={(e) => setPaymentMethod(e.target.value)}
                        className="w-4 h-4 text-primary-600"
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
              </div>

              {/* Donor Information */}
              <div>
                <h3 className="font-semibold mb-4">{t('donorInformation') || 'Donor Information'}</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block mb-2 font-medium">{t('fullName')} *</label>
                    <input
                      type="text"
                      name="name"
                      value={paymentData.name}
                      onChange={handleInputChange}
                      placeholder={t('namePlaceholder')}
                      className="input-field"
                      required
                    />
                  </div>
                  
                  <div>
                    <label className="block mb-2 font-medium">{t('email')} *</label>
                    <input
                      type="email"
                      name="email"
                      value={paymentData.email}
                      onChange={handleInputChange}
                      placeholder={t('emailPlaceholder')}
                      className="input-field"
                      required
                    />
                  </div>
                  
                  <div>
                    <label className="block mb-2 font-medium">{t('phoneNumber')} *</label>
                    <input
                      type="tel"
                      name="phone"
                      value={paymentData.phone}
                      onChange={handleInputChange}
                      placeholder={t('phonePlaceholder')}
                      className="input-field"
                      required
                    />
                  </div>
                  
                  <div>
                    <label className="block mb-2 font-medium">{t('transactionId') || 'Transaction ID'}</label>
                    <input
                      type="text"
                      name="transactionId"
                      value={paymentData.transactionId}
                      onChange={handleInputChange}
                      placeholder={t('transactionIdPlaceholder') || 'Enter transaction ID (optional)'}
                      className="input-field"
                    />
                  </div>
                </div>
              </div>

              <button
                type="submit"
                disabled={isProcessing}
                className="btn-primary w-full"
              >
                {isProcessing ? (
                  <span className="flex items-center justify-center">
                    <span className="animate-spin mr-2">⏳</span>
                    {t('processing') || 'Processing...'}
                  </span>
                ) : (
                  t('completePayment') || 'Complete Payment'
                )}
              </button>
            </form>
          </div>
        </div>

        {/* Order Total */}
        <div className="lg:col-span-1">
          <div className="card sticky top-24">
            <h2 className="text-xl font-semibold mb-4">{t('orderTotal') || 'Order Total'}</h2>
            <div className="space-y-3 mb-6">
              <div className="flex justify-between">
                <span>{t('subtotal') || 'Subtotal'}:</span>
                <span className="font-medium">৳{totalAmount.toLocaleString()}</span>
              </div>
              <div className="flex justify-between">
                <span>{t('processingFee')}:</span>
                <span className="font-medium">৳0</span>
              </div>
              <div className="border-t pt-3 mt-3">
                <div className="flex justify-between text-lg font-bold">
                  <span>{t('total')}:</span>
                  <span className="text-primary-600 dark:text-primary-400">
                    ৳{totalAmount.toLocaleString()}
                  </span>
                </div>
              </div>
            </div>

            <div className="bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 rounded-lg p-4">
              <div className="flex items-start">
                <CheckCircle className="text-green-600 dark:text-green-400 mr-2 flex-shrink-0 mt-0.5" size={18} />
                <div className="text-sm text-green-800 dark:text-green-300">
                  <p className="font-medium mb-1">{t('securePayment') || 'Secure Payment'}</p>
                  <p className="text-green-700 dark:text-green-400">
                    {t('securePaymentDesc') || 'Your payment information is secure and encrypted'}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Checkout

